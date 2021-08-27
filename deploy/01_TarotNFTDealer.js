const { decks } = require('../assets');

const nftDeployFn = async (hre) => {
    const {deployments, getNamedAccounts, ethers} = hre; 
    const {parseEther} = ethers.utils;
    const {deploy, catchUnknownSigner} = deployments; 
    const accounts = await getNamedAccounts();
    console.log(`Accounts: ${JSON.stringify(accounts, null, 2)}`);
    const {deployer} = accounts;

    const makeDeck = async (key) => {
        const { jsonCID, title } = decks[key];
        const baseURI = `ipfs://${jsonCID}/`;

        return await catchUnknownSigner(
            deploy(`Deck-${key}`, {
                contract: 'TarotNFTDeck',
                from: deployer,
                log: true,
                gasLimit: 4000000,
                args: [
                    baseURI, 
                    parseEther("1.0"),
                    title,
                    key.toUpperCase()
                    ]
                })
        );
    }

    if (!deployer) {
        console.log('Cannot find deployer in named accounts');
    } else {
        await makeDeck('rws');
        await makeDeck('tdb');
    }
  };

nftDeployFn.tags = ['decks'];
module.exports = nftDeployFn;