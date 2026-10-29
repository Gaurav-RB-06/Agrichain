import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user and active role
  const [currentUser, setCurrentUser] = useState({
    id: 'u-farmer-1',
    name: 'Ramesh Patel',
    role: 'Farmer',
    location: 'Nashik, Maharashtra, India',
    email: 'farmer@agrichain.com',
    walletAddress: '0x4a18Bc2D73eF41B92E8C581a8bDb5213f0449e7a',
    crops: ['Onions', 'Grapes', 'Pomegranate']
  });

  const [activeTab, setActiveTab] = useState('marketplace'); // marketplace, group-selling, quotations, orders-blockchain, shipment, dashboards, ledger
  const [products, setProducts] = useState([]);
  const [groupPools, setGroupPools] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [blockchainLedger, setBlockchainLedger] = useState({ chain: [], totalBlocks: 0 });
  const [loading, setLoading] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isProjectDocsOpen, setIsProjectDocsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Web3 state (Supports both real MetaMask and Built-in Simulation)
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress, setWalletAddress] = useState('0x4a18...9e7a');
  const [networkName, setNetworkName] = useState('AgriChain Local EVM (ChainID: 31337)');
  const [walletBalance, setWalletBalance] = useState('14.85 ETH');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Switch demo persona
  const switchDemoRole = (roleName) => {
    if (roleName === 'Farmer') {
      setCurrentUser({
        id: 'u-farmer-1',
        name: 'Ramesh Patel',
        role: 'Farmer',
        location: 'Nashik, Maharashtra, India',
        email: 'farmer@agrichain.com',
        walletAddress: '0x4a18Bc2D73eF41B92E8C581a8bDb5213f0449e7a',
        crops: ['Onions', 'Grapes', 'Pomegranate']
      });
      setWalletAddress('0x4a18...9e7a');
    } else if (roleName === 'Buyer') {
      setCurrentUser({
        id: 'u-buyer-1',
        name: 'Global Agro Traders LLC',
        role: 'Buyer',
        location: 'Dubai, UAE',
        email: 'buyer@agrichain.com',
        walletAddress: '0x3aB9820cDeF8849c951042Ba7C69842F512803Ef',
        businessType: 'Wholesale Distributor'
      });
      setWalletAddress('0x3aB9...03Ef');
    } else if (roleName === 'Exporter') {
      setCurrentUser({
        id: 'u-exporter-1',
        name: 'OceanGate Logistics & Cargo',
        role: 'Exporter',
        location: 'Mumbai, India (JNPT)',
        email: 'exporter@agrichain.com',
        walletAddress: '0x7890B2b7F38a8eA52968B42b1029c78D51203AbC',
        iecCode: 'IEC0392817492'
      });
      setWalletAddress('0x7890...3AbC');
    } else if (roleName === 'Importer') {
      setCurrentUser({
        id: 'u-importer-1',
        name: 'GulfFresh Importers & ColdChain',
        role: 'Importer',
        location: 'Doha, Qatar',
        email: 'importer@agrichain.com',
        walletAddress: '0x9812A9cB48De827103819A21b02938Ac591B2e41',
        destinationPort: 'Hamad Port, Doha'
      });
      setWalletAddress('0x9812...2e41');
    }
    showToast(`Switched active persona to ${roleName}`);
  };

  // Connect real MetaMask if available
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0].slice(0, 6) + '...' + accounts[0].slice(-4));
          setWalletConnected(true);
          setNetworkName('Ethereum / Web3 Connected');
          showToast('Connected MetaMask wallet: ' + accounts[0].slice(0, 8) + '...');
        }
      } catch (err) {
        showToast('MetaMask connection rejected', 'error');
      }
    } else {
      // Toggle simulated connection
      setWalletConnected(!walletConnected);
      showToast(walletConnected ? 'Web3 Wallet Disconnected' : 'Connected to AgriChain Simulated Web3 Provider');
    }
  };

  // Fetch all initial data
  const refreshData = async () => {
    try {
      setLoading(true);
      const [resProd, resPools, resQuots, resOrders, resShip, resLedger] = await Promise.all([
        fetch('/api/products').then(r => r.json()),
        fetch('/api/group-pools').then(r => r.json()),
        fetch('/api/quotations').then(r => r.json()),
        fetch('/api/orders').then(r => r.json()),
        fetch('/api/shipments').then(r => r.json()),
        fetch('/api/blockchain/ledger').then(r => r.json())
      ]);

      setProducts(resProd);
      setGroupPools(resPools);
      setQuotations(resQuots);
      setOrders(resOrders);
      setShipments(resShip);
      setBlockchainLedger(resLedger);
    } catch (err) {
      console.warn('API fetch error, using client fallback', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchDemoRole,
        activeTab,
        setActiveTab,
        products,
        setProducts,
        groupPools,
        setGroupPools,
        quotations,
        setQuotations,
        orders,
        setOrders,
        shipments,
        setShipments,
        blockchainLedger,
        refreshData,
        walletConnected,
        walletAddress,
        networkName,
        walletBalance,
        connectMetaMask,
        isAuthOpen,
        setIsAuthOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        isProjectDocsOpen,
        setIsProjectDocsOpen,
        toast,
        showToast,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
