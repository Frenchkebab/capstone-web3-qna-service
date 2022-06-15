const fs = require('fs');
const { ethers } = require('hardhat');
const hre = require('hardhat');

async function main() {
  // Signing with admin
  const [admin] = await ethers.provider.listAccounts();
  console.log('Deploying with admin address: ', admin);

  // Deploy token contract
  const KNOToken = await ethers.getContractFactory('KNOToken'); // TODO: contract name
  const knoToken = await KNOToken.deploy(10000);
  console.log(`Token deployed to: ${knoToken.address}`);

  // Deploy KNO service contract
  const KNOService = await hre.ethers.getContractFactory('KNOService'); // TODO: contract name
  const knoService = await KNOService.deploy(knoToken.address);
  console.log(`KNOService deployed to: ${knoService.address}`);

  // Mint initial supply

  // Write contract address to a file to read from the frontdent
  const data = {
    KNOTokenAddress: knoToken.address,
    KNOServiceAddress: knoService.address,
  };

  fs.writeFile(
    './frontend/src/artifacts/contracts//address.json',
    JSON.stringify(data),
    function (err) {
      if (err) throw err;
      console.log('Contract addresses saved successfully');
    }
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
