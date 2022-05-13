const fs = require('fs');
const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Signing with admin
  const [admin] = await ethers.provider.listAccounts();
  console.log('Deploying with admin address: ', admin);

  // Deploy token contract
  const KNOToken = await ethers.getContractFactory(''); // TODO: contract name
  const knoToken = await KNOToken.deploy();
  console.log(`Token deployed to: ${knoToken.address}`);

  // Deploy KNO service contract
  const KNOService = await hre.ethers.getContractFactory(''); // TODO: contract name
  const knoService = await KNOService.deploy();
  console.log(`KNOService deployed to: ${knoService.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
