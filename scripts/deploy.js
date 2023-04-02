const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const FileStore = await hre.ethers.getContractFactory("FileStorage");
  const fileStore = await FileStore.deploy();

  await fileStore.deployed();

  console.log("deployed to:", fileStore.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// ##################################################
// Deploying contracts with the account: 0xcf773c1f3Eb64E4021BDaF7386F67F12DCcA3032
// Account balance: 1200000000000000000
// deployed to: 0x213611949d9011E6d33a0fA07e5fa2720F44E698
// ##########################################################
