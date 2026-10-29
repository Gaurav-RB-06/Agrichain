const hre = require("hardhat");

async function main() {
  console.log("Deploying AgriChainEscrow smart contract...");

  const AgriChainEscrow = await hre.ethers.getContractFactory("AgriChainEscrow");
  const escrow = await AgriChainEscrow.deploy();

  await escrow.waitForDeployment();

  const address = await escrow.getAddress();
  console.log(`AgriChainEscrow deployed successfully to: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
