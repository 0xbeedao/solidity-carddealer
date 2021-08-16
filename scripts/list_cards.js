const hre = require("hardhat");
const { getTarot } = require("./instances");

async function main(args) {
  const address = args[0] || '0x0000000000000000000000000000000000000000';
  const tarot = await getTarot();
  let err = false;
  const cards=[];
  let ix=0;
  let card;
  while(true) {
    try {
      card = await tarot.getCard(address, ix);
      cards.push(card[1]);
      ix++;
    } catch (err) {
      break;
    }
  } 
  console.log(`${ix > 0 ? ix : 'No'} Cards for: ${address}: ${JSON.stringify(cards)}`);
}

main(process.argv.slice(2))
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
