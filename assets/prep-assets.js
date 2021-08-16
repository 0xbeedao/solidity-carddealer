const fs = require('fs');
const cards = require('./tarot.js');

function getCID(key) {
  const rawCid = fs.readFileSync(`./tarot_${key}_address.txt`);
  return rawCid.toString().replace('\n', '');
}

const decks = {
  rws: { title: 'Rider Waite Smith OG', suffix: '.png', cid: getCID('rws') },
  tdb: {title: 'Tarot di Besançon', suffix: '.jpg', cid: getCID('tdb') }
};

function writeJSON(key, card, ix) {
  const fname = `json/${key}/${ix}`;
  const deck = decks[key];
  
  fs.writeFileSync(fname, JSON.stringify({
    title: card.title,
    series: deck.title,
    creator: "DevBruce",
    image: `ipfs://${deck.cid}/${card.image}${deck.suffix}`,
    timestamp: new Date().toISOString()
  }));
}

Object
  .keys(decks)
  .forEach((key) => {
    cards.forEach((card, ix) => writeJSON(key, card, ix));
  });
