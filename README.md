# 🌾 AgriChain Global
### *Blockchain-Based International Agricultural Import-Export Marketplace*
> **"From Farm to World — Empowering Farmers · Connecting Global Markets · Building a Transparent Future"**

[![React](https://img.shields.io/badge/Frontend-React_18_%2B_Vite-61dafb.svg?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js_%2B_Express-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Solidity](https://img.shields.io/badge/Smart_Contract-Solidity_0.8.20-363636.svg?logo=solidity&logoColor=white)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Development-Hardhat_EVM-fff100.svg)](https://hardhat.org/)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📌 1. Project Overview & Motivation
Traditional agricultural supply chains are plagued by:
1. **Middlemen Exploitation:** Small farmers receive only a fraction of the final wholesale export price.
2. **Bulk Volume Barriers:** Smallholder farmers individually lack the 20–50 metric ton harvest required to book international high-cube refrigerated shipping containers.
3. **Payment Default & Delays:** Cross-border trade relies on slow Letters of Credit (LC) taking 15 to 30 days, leaving farmers vulnerable to fraud.
4. **Counterfeiting & Non-Compliance:** Lack of provenance tracking for organic, APEDA, and phytosanitary certifications.

**AgriChain Global** solves this through a decentralized, transparent Web3 agricultural marketplace with autonomous **Smart Contract Escrows**, **Group Selling Aggregation Pools**, and **Real-Time Cold-Chain Shipment Tracking**.

---

## 🚀 2. Key Modules (1:1 Match with Project Blueprint)

### 1️⃣ User Registration & Role-Based Authentication
* Supports 4 distinct ecosystem personas:
  * **🌾 Farmer:** Lists crops, joins group selling pools, manages farm telemetry.
  * **🏢 Buyer (Global Importer):** Searches commodities, submits quotation requests, locks escrow funds.
  * **🚢 Exporter (Logistics Partner):** Validates phytosanitary certificates, books container slots at JNPT port.
  * **🌍 Importer:** Monitors ship arrival at destination port (Dubai, Rotterdam, Singapore), confirms delivery.
* *Interactive Feature:* 1-Click Demo Persona Switcher directly in the navbar for immediate evaluation.

### 2️⃣ Farmer Product Listing
* Farmers input product details: Name, Category (*Vegetables, Fruits, Grains, Spices*), Quantity (Tons), Bulk Price (₹/kg and $ USD/kg), Farm Origin (e.g. Nashik, Maharashtra), Quality Grade (*Export Grade A+, GI Tagged*), and harvest date.
* Choice of Selling Mode:
  * **Direct Selling:** Direct sale to overseas buyers.
  * **Group Selling:** Allocate stock to a cooperative pool.

### 3️⃣ International Agricultural Marketplace
* Real-time search by commodity, category, and origin country.
* Direct vs Group Selling filtering.
* Currency conversion preview (INR ₹ and USD $).
* Export certificate badge verification (APEDA, GlobalGAP, US-FDA hot-water dip, ISO 22000).

### 4️⃣ Group Selling Workflow (Consortium Aggregation)
* **The Problem:** A foreign buyer in Dubai requires a bulk order of 50 Metric Tons of Nashik Red Onions in a single shipment. An individual smallholder farmer only produces 10 Tons.
* **The Solution:** The Group Selling module aggregates multiple farmers:
  $$\text{Farmer A (10T)} + \text{Farmer B (10T)} + \text{Farmer C (10T)} + \text{Farmer D (10T)} + \text{Farmer E (10T)} \longrightarrow \mathbf{50\text{ Tons Bulk Order}}$$
* *Interactive Feature:* Live progress bar (e.g., 60% fulfilled) with a "Contribute Stock to Pool" modal.

### 5️⃣ Quotation & Trade Agreement (Import-Export Negotiation)
* Importer submits quotation requests with custom Incoterms (*CIF, FOB, EXW*) and payment terms (*Letter of Credit vs Smart Contract Escrow*).
* Seller provides formal quotation with unit price, delivery timeline, and total order value.
* Actionable workflow: **Reject** or **Accept & Create Order** (which automatically deploys an on-chain trade agreement).

### 6️⃣ Smart Contract Escrow & Local Blockchain
* Autonomous contract (`AgriChainEscrow.sol`) locks buyer funds upon order confirmation.
* Cryptographically tracks states: `Created` ➔ `EscrowFunded` ➔ `QualityInspected` ➔ `Dispatched` ➔ `InTransit` ➔ `Delivered` ➔ `FundsReleased`.
* Includes a **Built-in Blockchain Explorer** displaying block height, previous hash, transaction hash, nonces, and SHA-256 state transitions.
* Supports both simulated provider and real **MetaMask / Hardhat** Web3 wallets.

### 7️⃣ Cold-Chain Shipment Tracking
* Interactive 7-milestone progress timeline:
  1. **Order Confirmed** (Signed on blockchain)
  2. **Quality Check** (APEDA inspection & Phytosanitary hash)
  3. **Packaging** (Export-grade ventilated mesh with QR)
  4. **Dispatched** (Gate-in at JNPT Nhava Sheva Port Mumbai)
  5. **In Transit** (Vessel MSC Sandra sailing Arabian Sea corridor)
  6. **Destination Customs Clearance** (Jebel Ali Port, Dubai)
  7. **Delivered & Funds Released** (Smart contract unlocks payment to farmer)
* Interactive simulated Reefer Container IoT Telemetry: Temperature (4.2°C), Humidity (88%), and Battery status.
* Live **"Advance Next Milestone (Demo)"** button to simulate supply-chain progression live during demonstrations.

### 8️⃣ Role-Specific Dashboards
* Dedicated operational dashboards for each user type:
  * **Farmer Dashboard:** Total Products Listed, Active Orders Value (₹1,24,500), Est. Total Earnings (₹4,90,000), Active Group Pools.
  * **Buyer Dashboard:** Active Orders (3), Pending Quotations ($12,400), Total Capital Spent ($48,500).
  * **Exporter Dashboard:** Total Listings Managed (8), Active Export Orders (44), Shipments in Transit (3).
  * **Importer Dashboard:** Active Port Orders (2), Pending Quotations (6), Upcoming Shipments (1).

### 9️⃣ Final Output & Presentation Utilities
* Printable **International Agricultural Trade Agreement Invoice** with contract references, wallet addresses, and terms.
* Comprehensive **College Project Viva Q&A Guide** built directly into the UI.

---

## 🏛️ 3. System Architecture Diagram

```text
               +-------------------------------------------------------+
               |                    CLIENT LAYER                       |
               |  React 18 + Vite + Tailwind CSS + Lucide Icons        |
               +---------------------------+---------------------------+
                                           | HTTP REST / WebSockets
                                           v
               +-------------------------------------------------------+
               |                   BACKEND LAYER                       |
               |  Node.js + Express REST API Server (Port 5000)        |
               |  - Auth & Role-Based Access Control                   |
               |  - Quotations & Incoterms Engine                      |
               |  - Group Selling Aggregation Service                  |
               |  - IoT Cold-Chain Telemetry Simulator                 |
               +-------------+---------------------------+-------------+
                             |                           |
                             v                           v
              +----------------------------+  +----------------------------+
              |     PERSISTENCE LAYER      |  |      BLOCKCHAIN LAYER      |
              |  JSON Store / MongoDB      |  |  AgriChainEscrow.sol       |
              |  (Products, Orders, Users) |  |  Local EVM / Hardhat       |
              |                            |  |  (SHA-256 Ledger & Escrow) |
              +----------------------------+  +----------------------------+
```

---

## 💻 4. Tech Stack Breakdown
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti.
* **Backend:** Node.js, Express.js, CORS, Crypto (Native SHA-256).
* **Smart Contracts:** Solidity v0.8.20, Hardhat Development Framework, ethers.js.
* **Database:** Structured JSON File Database with MongoDB pluggable support.

---

## ⚡ 5. Quick Start & Execution Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher installed on Windows)
* npm (bundled with Node.js)

### Method 1: One-Click Windows Launch (Recommended)
Simply double-click `start.bat` located in this root directory.

### Method 2: Manual Terminal Commands
1. **Install Root and Sub-dependencies:**
   ```bash
   npm run install-all
   ```

2. **Launch Client and Server concurrently:**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   * **Frontend UI:** `http://localhost:5173`
   * **Backend API:** `http://localhost:5000`

---

## 📝 6. Viva Voice Quick Reference
* **Q: Why does agriculture need blockchain?**
  * *A:* Cross-border trade suffers from counterfeit origin certificates, delayed Letters of Credit, and payment defaults. Smart contracts provide verifiable provenance and automated escrow fund release upon customs confirmation.
* **Q: How does the system handle small farmers who cannot fill a 40-foot container?**
  * *A:* The **Group Selling Workflow** clusters small farmers in the same geographical region (e.g. Nashik Onion cluster), combining small lots into a 50-ton export consignment so they receive wholesale export rates.
* **Q: Where is the escrow contract located?**
  * *A:* The smart contract source is in `contracts/AgriChainEscrow.sol`. It is compiled and simulated via the built-in local blockchain explorer at `http://localhost:5173` under the **Blockchain Ledger** tab.

---
*Created for Academic Project Presentation & Research Demonstration.*
