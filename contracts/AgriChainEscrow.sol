// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AgriChainEscrow
 * @dev Autonomous Trade Escrow & Supply-Chain Milestones for AgriChain Global Marketplace.
 * Designed for International Agricultural Import-Export with milestone-based automated fund release.
 */
contract AgriChainEscrow {
    enum OrderState {
        Created,
        EscrowFunded,
        QualityInspected,
        Dispatched,
        InTransit,
        Delivered,
        FundsReleased,
        Disputed,
        Refunded
    }

    struct TradeOrder {
        string orderId;
        address payable seller; // Farmer or Exporter
        address payable buyer;  // Importer or Global Buyer
        string commodity;
        uint256 quantityTons;
        uint256 totalAmountWei;
        string originLocation;
        string destinationPort;
        string qualityGrade;
        OrderState state;
        uint256 createdAt;
        uint256 fundedAt;
        uint256 completedAt;
        bool qualityVerified;
        bool customsCleared;
        string phytosanitaryCertHash;
    }

    address public owner;
    mapping(string => TradeOrder) public orders;
    string[] public orderIds;

    // Events for transparency and UI listening
    event OrderCreated(string indexed orderId, address indexed buyer, address indexed seller, uint256 totalAmountWei);
    event EscrowFunded(string indexed orderId, address indexed buyer, uint256 amount);
    event QualityVerified(string indexed orderId, string certHash, address inspector);
    event OrderDispatched(string indexed orderId, uint256 timestamp);
    event OrderInTransit(string indexed orderId, string vesselPort);
    event OrderDelivered(string indexed orderId, address indexed buyer);
    event FundsReleased(string indexed orderId, address indexed seller, uint256 amount);
    event DisputeRaised(string indexed orderId, address indexed raisedBy, string reason);
    event OrderRefunded(string indexed orderId, address indexed buyer, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only platform contract owner can call");
        _;
    }

    modifier onlyBuyer(string memory _orderId) {
        require(msg.sender == orders[_orderId].buyer, "Only authorized buyer can call");
        _;
    }

    modifier onlySeller(string memory _orderId) {
        require(msg.sender == orders[_orderId].seller, "Only authorized seller can call");
        _;
    }

    modifier orderExists(string memory _orderId) {
        require(orders[_orderId].buyer != address(0), "Order does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Create a new trade agreement order on blockchain
     */
    function createTradeOrder(
        string memory _orderId,
        address payable _seller,
        string memory _commodity,
        uint256 _quantityTons,
        uint256 _totalAmountWei,
        string memory _originLocation,
        string memory _destinationPort,
        string memory _qualityGrade
    ) external returns (bool) {
        require(orders[_orderId].buyer == address(0), "Order ID already exists");
        require(_seller != address(0), "Invalid seller address");
        require(_totalAmountWei > 0, "Amount must be greater than zero");

        orders[_orderId] = TradeOrder({
            orderId: _orderId,
            seller: _seller,
            buyer: payable(msg.sender),
            commodity: _commodity,
            quantityTons: _quantityTons,
            totalAmountWei: _totalAmountWei,
            originLocation: _originLocation,
            destinationPort: _destinationPort,
            qualityGrade: _qualityGrade,
            state: OrderState.Created,
            createdAt: block.timestamp,
            fundedAt: 0,
            completedAt: 0,
            qualityVerified: false,
            customsCleared: false,
            phytosanitaryCertHash: ""
        });

        orderIds.push(_orderId);

        emit OrderCreated(_orderId, msg.sender, _seller, _totalAmountWei);
        return true;
    }

    /**
     * @notice Buyer deposits trade value into smart contract escrow
     */
    function depositEscrow(string memory _orderId) external payable orderExists(_orderId) onlyBuyer(_orderId) {
        TradeOrder storage order = orders[_orderId];
        require(order.state == OrderState.Created, "Order already funded or processed");
        require(msg.value == order.totalAmountWei, "Deposit must match agreed contract total");

        order.state = OrderState.EscrowFunded;
        order.fundedAt = block.timestamp;

        emit EscrowFunded(_orderId, msg.sender, msg.value);
    }

    /**
     * @notice Verify agricultural export quality & phytosanitary inspection
     */
    function recordQualityInspection(
        string memory _orderId,
        string memory _certHash
    ) external orderExists(_orderId) {
        TradeOrder storage order = orders[_orderId];
        require(order.state == OrderState.EscrowFunded, "Escrow must be funded first");

        order.qualityVerified = true;
        order.phytosanitaryCertHash = _certHash;
        order.state = OrderState.QualityInspected;

        emit QualityVerified(_orderId, _certHash, msg.sender);
    }

    /**
     * @notice Mark agricultural consignment as dispatched from farm/port
     */
    function recordDispatch(string memory _orderId) external orderExists(_orderId) {
        TradeOrder storage order = orders[_orderId];
        require(order.state == OrderState.QualityInspected, "Quality must be inspected first");

        order.state = OrderState.Dispatched;
        emit OrderDispatched(_orderId, block.timestamp);
    }

    /**
     * @notice Update transit milestone (e.g. vessel departs origin port)
     */
    function recordTransit(string memory _orderId, string memory _vesselPort) external orderExists(_orderId) {
        TradeOrder storage order = orders[_orderId];
        require(order.state == OrderState.Dispatched, "Must be dispatched first");

        order.state = OrderState.InTransit;
        emit OrderInTransit(_orderId, _vesselPort);
    }

    /**
     * @notice Buyer / Importer confirms safe delivery of agricultural shipment at destination port
     */
    function confirmDeliveryAndReleaseFunds(string memory _orderId) external orderExists(_orderId) onlyBuyer(_orderId) {
        TradeOrder storage order = orders[_orderId];
        require(order.state == OrderState.InTransit || order.state == OrderState.Dispatched, "Invalid state for delivery");

        order.state = OrderState.Delivered;
        order.completedAt = block.timestamp;
        order.state = OrderState.FundsReleased;

        uint256 payout = order.totalAmountWei;
        order.totalAmountWei = 0;

        (bool success, ) = order.seller.call{value: payout}("");
        require(success, "Fund disbursement to seller failed");

        emit OrderDelivered(_orderId, msg.sender);
        emit FundsReleased(_orderId, order.seller, payout);
    }

    /**
     * @notice Fetch total order count
     */
    function getOrderCount() external view returns (uint256) {
        return orderIds.length;
    }

    /**
     * @notice Get order state enum as integer
     */
    function getOrderState(string memory _orderId) external view orderExists(_orderId) returns (OrderState) {
        return orders[_orderId].state;
    }
}
