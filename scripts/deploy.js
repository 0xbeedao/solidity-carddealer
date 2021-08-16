// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require("fs");
const { parseEther } = hre.ethers.utils;

function getCID(key) {
  const rawCid = fs.readFileSync(`./tarot_${key}_address.txt`);
  return rawCid.toString().replace('\n', '');
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  // const CardDeck = await hre.ethers.getContractFactory("CardDeck");
  // const cards = await CardDeck.deploy(10);

  // await cards.deployed();

  // console.log("CardDeck deployed to:", cards.address);

  // const TarotTitledDeck = await hre.ethers.getContractFactory("TarotTitledDeck");
  // const tarot = await TarotTitledDeck.deploy();

  // await tarot.deployed();
  // console.log("TarotTitledDeck deployed to:", tarot.address);
  
  const TarotNFTDeck = await hre.ethers.getContractFactory("TarotNFTDeck");

  ['rws', 'tdb']
    .forEach(async (key) => {
      const cid = getCID(key);
      const baseURI = `ipfs://${cid}/`;
      const nftDeck = await TarotNFTDeck.deploy(baseURI, parseEther("1.0"));
      await nftDeck.deployed();
      console.log(`${key} TarotNFTDeck deployed to: ${nftDeck.address}`);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
