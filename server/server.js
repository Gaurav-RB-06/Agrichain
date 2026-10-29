import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { blockchain, Transaction } from './blockchain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Helper to read data from JSON
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading data.json:', err);
    return { users: [], products: [], groupPools: [], quotations: [], orders: [], shipments: [] };
  }
}

// Helper to write data to JSON
function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing data.json:', err);
  }
}

// ======================== AUTH & USERS ========================
app.get('/api/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const data = readData();
  
  // Find matching user or fallback to standard demo user for the role
  let user = data.users.find(u => (u.email === email || u.mobile === email) && (!role || u.role.toLowerCase() === role.toLowerCase()));
  if (!user && role) {
    user = data.users.find(u => u.role.toLowerCase() === role.toLowerCase());
  }

  if (!user) {
    // If not found, create a session user
    user = {
      id: 'u-' + Date.now(),
      name: email ? email.split('@')[0] : 'Demo User',
      email: email || 'demo@agrichain.com',
      role: role || 'Farmer',
      walletAddress: '0x' + crypto.randomBytes(20).toString('hex'),
      location: 'India'
    };
  }

  res.json({ success: true, user, token: 'jwt-demo-token-' + user.id });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, mobile, role, location, farmSize, businessType } = req.body;
  const data = readData();

  const newUser = {
    id: 'u-' + Date.now(),
    name: name || 'Agricultural Member',
    email: email || `${Date.now()}@agrichain.com`,
    mobile: mobile || '+91 98000 00000',
    role: role || 'Farmer',
    location: location || 'Nashik, Maharashtra, India',
    walletAddress: '0x' + crypto.randomBytes(20).toString('hex'),
    farmSize: farmSize || (role === 'Farmer' ? '15 Acres' : undefined),
    businessType: businessType || (role === 'Buyer' ? 'Import Trader' : undefined),
    createdAt: new Date().toISOString()
  };

  data.users.push(newUser);
  writeData(data);

  res.status(201).json({ success: true, user: newUser });
});

// ======================== PRODUCTS ========================
app.get('/api/products', (req, res) => {
  const data = readData();
  const { category, search, sellingType, country } = req.query;

  let filtered = data.products;

  if (category && category !== 'All Products') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (sellingType) {
    filtered = filtered.filter(p => p.sellingType.toLowerCase() === sellingType.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.origin.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  if (country && country !== 'All Countries') {
    const c = country.toLowerCase();
    filtered = filtered.filter(p => p.origin.toLowerCase().includes(c));
  }

  res.json(filtered);
});

app.post('/api/products', (req, res) => {
  const data = readData();
  const { name, category, quantityTons, pricePerKg, origin, qualityGrade, sellingType, availableDate, image, description } = req.body;

  const newProduct = {
    id: 'prod-' + Date.now(),
    name: name || 'Fresh Agricultural Produce',
    category: category || 'Vegetables',
    farmerId: req.body.farmerId || 'u-farmer-1',
    farmerName: req.body.farmerName || 'Ramesh Patel',
    origin: origin || 'Nashik, Maharashtra, India',
    quantityTons: Number(quantityTons) || 10,
    availableQuantityTons: Number(quantityTons) || 10,
    pricePerKg: Number(pricePerKg) || 30,
    currency: 'INR',
    priceUsdPerKg: Number((Number(pricePerKg) / 83.5).toFixed(2)) || 0.36,
    sellingType: sellingType || 'Direct Selling',
    qualityGrade: qualityGrade || 'Export Grade A',
    availableDate: availableDate || new Date().toISOString().split('T')[0],
    shelfLifeDays: req.body.shelfLifeDays || 30,
    image: image || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80',
    description: description || 'Export quality produce harvested for international export.',
    certifications: req.body.certifications || ['APEDA Export Approved', 'Phytosanitary Clean']
  };

  data.products.unshift(newProduct);
  writeData(data);

  res.status(201).json({ success: true, product: newProduct });
});

// ======================== GROUP SELLING POOLS ========================
app.get('/api/group-pools', (req, res) => {
  const data = readData();
  res.json(data.groupPools);
});

app.post('/api/group-pools', (req, res) => {
  const data = readData();
  const { title, commodity, category, targetQuantityTons, initialFarmerStock, farmerName, pricePerKg, destination, deadline, description } = req.body;

  const target = Number(targetQuantityTons) || 50;
  const initialStock = Number(initialFarmerStock) || 10;

  const newPool = {
    id: 'pool-' + Date.now(),
    title: title || `${target} Ton ${commodity} Export Pool`,
    commodity: commodity || 'Nashik Red Onion',
    category: category || 'Vegetables',
    targetQuantityTons: target,
    currentQuantityTons: initialStock,
    pricePerKg: Number(pricePerKg) || 25,
    destination: destination || 'Jebel Ali Port, Dubai, UAE',
    buyer: 'Open to International Buyers',
    deadline: deadline || '2025-07-30',
    status: `In Progress (${Math.round((initialStock / target) * 100)}%)`,
    members: [
      {
        farmerName: farmerName || 'Ramesh Patel',
        tons: initialStock,
        date: new Date().toISOString().split('T')[0]
      }
    ],
    description: description || 'Pooled stock among regional farmers to secure bulk shipping containers and direct foreign buyer prices.'
  };

  data.groupPools.unshift(newPool);
  writeData(data);

  res.status(201).json({ success: true, pool: newPool });
});

app.post('/api/group-pools/:id/join', (req, res) => {
  const data = readData();
  const pool = data.groupPools.find(p => p.id === req.params.id);

  if (!pool) {
    return res.status(404).json({ error: 'Group pool not found' });
  }

  const { farmerName, tons } = req.body;
  const addTons = Number(tons) || 5;

  pool.currentQuantityTons = Math.min(pool.targetQuantityTons, pool.currentQuantityTons + addTons);
  const percentage = Math.round((pool.currentQuantityTons / pool.targetQuantityTons) * 100);
  
  if (pool.currentQuantityTons >= pool.targetQuantityTons) {
    pool.status = 'Ready for Export (100% Fulfilled)';
  } else {
    pool.status = `In Progress (${percentage}%)`;
  }

  pool.members.push({
    farmerName: farmerName || 'Co-op Farmer',
    tons: addTons,
    date: new Date().toISOString().split('T')[0]
  });

  writeData(data);
  res.json({ success: true, pool });
});

// ======================== QUOTATIONS & TRADE AGREEMENTS ========================
app.get('/api/quotations', (req, res) => {
  const data = readData();
  res.json(data.quotations);
});

app.post('/api/quotations', (req, res) => {
  const data = readData();
  const { productName, quantityTons, buyerName, buyerLocation, origin, destinationPort, targetPricePerKg, paymentTerms } = req.body;

  const tons = Number(quantityTons) || 10;
  const price = Number(targetPricePerKg) || 25;
  const totalInr = tons * 1000 * price;

  const newQuot = {
    id: 'quot-' + Math.floor(1000 + Math.random() * 9000),
    orderReference: '#AGI' + Math.floor(10000 + Math.random() * 90000),
    productName: productName || 'Agricultural Crop',
    quantityTons: tons,
    buyerName: buyerName || 'Global Agro Traders LLC',
    buyerLocation: buyerLocation || 'Dubai, UAE',
    sellerName: req.body.sellerName || 'Ramesh Patel',
    origin: origin || 'Nashik, India',
    destinationPort: destinationPort || 'Jebel Ali Port, Dubai',
    sellerQuotation: {
      pricePerKg: price,
      totalAmount: totalInr,
      currency: 'INR',
      totalAmountUsd: Math.round(totalInr / 83.5),
      deliveryTimeDays: req.body.deliveryTimeDays || 7,
      paymentTerms: paymentTerms || 'LC / T/T (Letter of Credit / Bank Transfer)',
      incoterm: req.body.incoterm || 'CIF (Cost, Insurance and Freight)'
    },
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  data.quotations.unshift(newQuot);
  writeData(data);

  res.status(201).json({ success: true, quotation: newQuot });
});

app.post('/api/quotations/:id/accept', (req, res) => {
  const data = readData();
  const quot = data.quotations.find(q => q.id === req.params.id);

  if (!quot) {
    return res.status(404).json({ error: 'Quotation not found' });
  }

  quot.status = 'Accepted';
  quot.acceptedAt = new Date().toISOString();

  // Create Order and Blockchain Record!
  const orderId = quot.orderReference || ('#AGI' + Math.floor(10000 + Math.random() * 90000));
  const tx = new Transaction('0x3aB9820cDeF8849c', blockchain.contractAddress, 'ORDER_CREATED', {
    orderId,
    commodity: quot.productName,
    quantityTons: quot.quantityTons,
    totalAmount: `₹${quot.sellerQuotation.totalAmount.toLocaleString()} ($${quot.sellerQuotation.totalAmountUsd.toLocaleString()})`,
    paymentTerms: quot.sellerQuotation.paymentTerms
  }, orderId);

  blockchain.addTransactionAndMine(tx);

  const newOrder = {
    orderId,
    productName: quot.productName,
    quantityTons: quot.quantityTons,
    totalAmount: quot.sellerQuotation.totalAmount,
    currency: 'INR',
    totalAmountUsd: quot.sellerQuotation.totalAmountUsd,
    buyerId: 'u-buyer-1',
    buyerName: quot.buyerName,
    sellerId: 'u-farmer-1',
    sellerName: quot.sellerName,
    exporterName: 'OceanGate Logistics & Cargo',
    origin: quot.origin,
    destinationPort: quot.destinationPort,
    status: 'Confirmed & Escrow Funded',
    paymentTerms: quot.sellerQuotation.paymentTerms,
    txHash: tx.txHash,
    contractAddress: blockchain.contractAddress,
    createdAt: new Date().toISOString(),
    escrowStatus: 'Locked on Blockchain',
    trackingId: 'TRK-' + orderId.replace('#', '')
  };

  data.orders.unshift(newOrder);

  // Create Shipment with Milestones
  const newShipment = {
    trackingId: newOrder.trackingId,
    orderId: newOrder.orderId,
    productName: `${quot.productName} (${quot.quantityTons} Tons)`,
    vesselName: 'MSC Mediterranean Horizon (IMO 948291)',
    containerNumber: 'CRXU-' + Math.floor(1000000 + Math.random() * 9000000),
    currentLocation: 'Origin Packhouse - Nashik India',
    originPort: 'JNPT Nhava Sheva Port, Mumbai',
    destinationPort: quot.destinationPort,
    estimatedArrival: 'Estimated 8 Days',
    telemetry: {
      temperature: '5.0 °C',
      humidity: '85 %',
      co2Level: '0.06 %',
      battery: '100 %'
    },
    milestones: [
      {
        step: 1,
        title: 'Order Confirmed',
        description: 'Trade agreement locked on blockchain smart contract',
        date: new Date().toLocaleString(),
        status: 'completed',
        txHash: tx.txHash
      },
      {
        step: 2,
        title: 'Quality Check',
        description: 'Phytosanitary inspection & certification',
        date: '--',
        status: 'pending'
      },
      {
        step: 3,
        title: 'Packaging',
        description: 'Export-grade container packing with IoT telemetry',
        date: '--',
        status: 'pending'
      },
      {
        step: 4,
        title: 'Dispatched',
        description: 'Gate-in at JNPT Mumbai container terminal',
        date: '--',
        status: 'pending'
      },
      {
        step: 5,
        title: 'In Transit',
        description: 'Vessel sailing to destination port',
        date: '--',
        status: 'pending'
      },
      {
        step: 6,
        title: 'Customs Port Clearance',
        description: 'Destination port customs clearance',
        date: '--',
        status: 'pending'
      },
      {
        step: 7,
        title: 'Delivered',
        description: 'Cargo accepted by importer & smart contract escrow released',
        date: '--',
        status: 'pending'
      }
    ]
  };

  data.shipments.unshift(newShipment);
  writeData(data);

  res.json({ success: true, quotation: quot, order: newOrder, shipment: newShipment, txHash: tx.txHash });
});

// ======================== ORDERS & SHIPMENTS ========================
app.get('/api/orders', (req, res) => {
  const data = readData();
  res.json(data.orders);
});

app.get('/api/shipments', (req, res) => {
  const data = readData();
  res.json(data.shipments);
});

app.get('/api/shipments/:orderId', (req, res) => {
  const data = readData();
  const cleanId = req.params.orderId.replace('#', '');
  const shipment = data.shipments.find(s => s.orderId.replace('#', '') === cleanId || s.trackingId.includes(cleanId));
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }
  res.json(shipment);
});

// Advance shipment milestone (Simulate supply chain steps!)
app.post('/api/shipments/:trackingId/advance', (req, res) => {
  const data = readData();
  const shipment = data.shipments.find(s => s.trackingId === req.params.trackingId);

  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }

  // Find first pending milestone
  const nextMilestone = shipment.milestones.find(m => m.status === 'pending');
  if (!nextMilestone) {
    return res.json({ message: 'All milestones completed', shipment });
  }

  // Mark previous active as completed
  const activeMilestone = shipment.milestones.find(m => m.status === 'active');
  if (activeMilestone) {
    activeMilestone.status = 'completed';
  }

  nextMilestone.status = 'completed';
  nextMilestone.date = new Date().toLocaleString();

  // Mine blockchain transaction for milestone
  const tx = new Transaction(
    '0xCargoTrackerSystem',
    blockchain.contractAddress,
    `MILESTONE_${nextMilestone.title.toUpperCase().replace(/\s+/g, '_')}`,
    {
      trackingId: shipment.trackingId,
      orderId: shipment.orderId,
      step: nextMilestone.step,
      milestone: nextMilestone.title
    },
    shipment.orderId
  );
  blockchain.addTransactionAndMine(tx);
  nextMilestone.txHash = tx.txHash;

  // Update order status if delivered
  if (nextMilestone.step === 7) {
    const order = data.orders.find(o => o.orderId === shipment.orderId);
    if (order) {
      order.status = 'Delivered & Funds Released';
      order.escrowStatus = 'Funds Transferred to Farmer/Seller';
    }
    shipment.currentLocation = `${shipment.destinationPort} (Delivered)`;
  } else if (nextMilestone.step === 5) {
    shipment.currentLocation = 'Arabian Sea (Vessel En Route)';
  } else if (nextMilestone.step === 4) {
    shipment.currentLocation = `${shipment.originPort} (Dispatched)`;
  }

  writeData(data);
  res.json({ success: true, shipment, txHash: tx.txHash });
});

// ======================== BLOCKCHAIN LEDGER ========================
app.get('/api/blockchain/ledger', (req, res) => {
  res.json({
    contractAddress: blockchain.contractAddress,
    totalBlocks: blockchain.chain.length,
    latestBlockHash: blockchain.getLatestBlock().hash,
    chain: blockchain.chain
  });
});

// ======================== ROLE DASHBOARD STATS ========================
app.get('/api/dashboard/stats', (req, res) => {
  const role = req.query.role || 'Farmer';
  const data = readData();

  if (role === 'Farmer') {
    res.json({
      role: 'Farmer',
      totalProducts: data.products.filter(p => p.farmerId === 'u-farmer-1').length,
      activeOrdersAmount: '₹1,24,500',
      activeOrdersCount: data.orders.filter(o => o.status !== 'Delivered & Funds Released').length,
      estEarnings: '₹4,90,000',
      activePools: data.groupPools.length,
      rating: '4.9 ★ (Certified APEDA Grower)'
    });
  } else if (role === 'Buyer') {
    res.json({
      role: 'Buyer',
      activeOrders: data.orders.length,
      pendingQuotations: data.quotations.filter(q => q.status === 'Pending').length,
      pendingQuotationsValue: '$12,400',
      totalSpent: '$48,500',
      shipmentsInTransit: data.shipments.filter(s => !s.milestones[6] || s.milestones[6].status !== 'completed').length
    });
  } else if (role === 'Exporter') {
    res.json({
      role: 'Exporter',
      totalListings: data.products.length,
      activeExportOrders: 44,
      shipmentsInTransit: 3,
      customsClearedToday: 18,
      portTerminal: 'JNPT Port Mumbai Nhava Sheva'
    });
  } else {
    // Importer
    res.json({
      role: 'Importer',
      activeOrders: 2,
      pendingQuotations: 6,
      upcomingShipments: 1,
      portOfDischarge: 'Jebel Ali Port / Hamad Port',
      activeLettersOfCredit: 4
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌾 AgriChain Global Backend API running on http://localhost:${PORT}`);
  console.log(`⛓️ Blockchain Escrow Contract: ${blockchain.contractAddress}`);
});
