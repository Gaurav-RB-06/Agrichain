import crypto from 'crypto';

class Transaction {
  constructor(from, to, type, data, orderId) {
    this.txHash = '0x' + crypto.createHash('sha256').update(Date.now() + Math.random().toString() + JSON.stringify(data)).digest('hex');
    this.from = from || '0x0000000000000000000000000000000000000000';
    this.to = to || '0x71C849203649E7c28dF29A44eB5B6E94191698B2'; // AgriChainEscrow Contract
    this.type = type; // e.g. 'CREATE_ORDER', 'ESCROW_DEPOSIT', 'QUALITY_CHECK', 'DISPATCH', 'DELIVERED_PAYOUT'
    this.data = data;
    this.orderId = orderId;
    this.timestamp = new Date().toISOString();
  }
}

class Block {
  constructor(index, previousHash, transactions, timestamp = null) {
    this.index = index;
    this.timestamp = timestamp || new Date().toISOString();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = Math.floor(Math.random() * 100000);
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return '0x' + crypto.createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
      .digest('hex');
  }
}

class AgriBlockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.contractAddress = '0x71C849203649E7c28dF29A44eB5B6E94191698B2';
    this.seedInitialBlocks();
  }

  createGenesisBlock() {
    return new Block(0, '0x0000000000000000000000000000000000000000000000000000000000000000', [
      {
        txHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        type: 'GENESIS',
        data: { message: 'AgriChain Global Genesis Block - Empowering Farmers Worldwide' },
        timestamp: '2025-06-01T00:00:00.000Z'
      }
    ], '2025-06-01T00:00:00.000Z');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransactionAndMine(tx) {
    const newBlock = new Block(
      this.chain.length,
      this.getLatestBlock().hash,
      [tx],
      new Date().toISOString()
    );
    this.chain.push(newBlock);
    return { block: newBlock, transaction: tx };
  }

  seedInitialBlocks() {
    // Seed initial historical transactions matching poster Order #AGI12345
    const t1 = new Transaction('0x3aB9820cDeF8849c', this.contractAddress, 'ORDER_CREATED', {
      orderId: '#AGI12345',
      commodity: 'Export Grade Onion',
      quantityTons: 20,
      totalAmount: '₹4,90,000',
      note: 'Trade Agreement locked in smart contract'
    }, '#AGI12345');
    t1.txHash = '0x3f4a9b2184c7de689104fa2837bcde817482937e9c';
    t1.timestamp = '2025-06-15T10:24:32.000Z';

    const b1 = new Block(1, this.chain[0].hash, [t1], '2025-06-15T10:24:32.000Z');
    b1.hash = '0x9d4e21b7482931a7c0f1839201bcde8849204817293a';
    this.chain.push(b1);

    const t2 = new Transaction('0x3aB9820cDeF8849c', this.contractAddress, 'ESCROW_DEPOSIT', {
      orderId: '#AGI12345',
      amount: '₹4,90,000 ($5,880)',
      paymentTerms: 'Letter of Credit (LC) Verified'
    }, '#AGI12345');
    t2.timestamp = '2025-06-15T11:10:00.000Z';
    const b2 = new Block(2, b1.hash, [t2], '2025-06-15T11:10:00.000Z');
    this.chain.push(b2);

    const t3 = new Transaction('0xInspectorAPEDA882', this.contractAddress, 'QUALITY_INSPECTED', {
      orderId: '#AGI12345',
      inspector: 'APEDA India Export Authority',
      phytosanitaryCertHash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      result: 'Export Grade A+ Passed (Moisture < 12%)'
    }, '#AGI12345');
    t3.timestamp = '2025-06-16T14:30:00.000Z';
    const b3 = new Block(3, b2.hash, [t3], '2025-06-16T14:30:00.000Z');
    this.chain.push(b3);

    const t4 = new Transaction('0xCarrierJNPTMumbai', this.contractAddress, 'DISPATCH_CONFIRMED', {
      orderId: '#AGI12345',
      port: 'JNPT Nhava Sheva Mumbai',
      vessel: 'MSC Sandra - Voyage #DXB-981',
      containerId: 'MEDU7382910'
    }, '#AGI12345');
    t4.timestamp = '2025-06-18T09:00:00.000Z';
    const b4 = new Block(4, b3.hash, [t4], '2025-06-18T09:00:00.000Z');
    this.chain.push(b4);
  }
}

export const blockchain = new AgriBlockchain();
export { Transaction };
