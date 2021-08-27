const fs = require('fs');
const { decks, tarot } = require('./index');

function writeJSON(key, card, ix) {
  const fname = `json/${key}/${ix}`;
  const deck = decks[key];
  
  fs.writeFileSync(fname, JSON.stringify({
    title: card.title,
    series: deck.title,
    creator: "InvisibleCastle",
    image: `ipfs://${deck.cid}/${card.image}${deck.suffix}`,
    timestamp: new Date().toISOString()
  }));
}

Object
  .keys(decks)
  .forEach((key) => {
    tarot.forEach((card, ix) => writeJSON(key, card, ix));
  });
