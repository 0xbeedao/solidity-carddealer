const hre = require("hardhat");

const TarotAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

async function getTarot() {
  const TarotTitledDeck = await hre.ethers.getContractFactory('TarotTitledDeck');
  return await TarotTitledDeck.attach(TarotAddress);
}

module.exports = { getTarot };

