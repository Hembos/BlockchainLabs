Moralis.initialize("Yh8rluxMC8wp6zXCQhJ3g2RXF4aNGHVuKrqJcMXZ");
Moralis.serverURL = "https://glko4xadf7mq.usemoralis.com:2053/server";

const serverUrl = "https://glko4xadf7mq.usemoralis.com:2053/server";
const appId = "Yh8rluxMC8wp6zXCQhJ3g2RXF4aNGHVuKrqJcMXZ";
const contract_addr = "0x76D77142730caf1Eddf5910e08e19AA0b55F1cD6";

Moralis.start({ serverUrl, appId });
let web3;

async function init() {
    let currentUser = Moralis.User.current();
    if (!currentUser) {
        window.location.pathname = "/index.html";
    }

    const web3Provider = await Moralis.enableWeb3();
    web3 = new Web3(Moralis.provider);
    let accounts = await web3.eth.getAccounts();

    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");

    document.getElementById("token_id_input").value = nftId;
    document.getElementById("address_input").value = accounts[0];
}

async function mint() {
    let tokenId = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);
    let accounts = await ethereum.request({ method: 'eth_accounts' });

    const contract = new web3.eth.Contract(contractABI, contract_addr);

    contract.methods.mint(address, tokenId, amount).send({ from: accounts[0], value: 0 })
        .on("receipt", function (receipt) {
            alert("Mint done");
        })
}

document.getElementById("submit_mint").onclick = mint;

init();