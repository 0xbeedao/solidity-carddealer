const hre = require("hardhat");
const { getTarot } = require("./instances");

async function main() {
  const tarot = await getTarot();
  /* tarot.on('Card', (owner, title, index, draw) => {
   *   console.log(`CARD EVENT:\n${JSON.stringify({owner, title, index, draw})}\n----`);
   * });
   *  */
  const tx = await tarot.dealCard();
  const rv = await tx.wait();
  console.log(rv.events[0].args.title);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
