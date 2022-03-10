Moralis.initialize("Yh8rluxMC8wp6zXCQhJ3g2RXF4aNGHVuKrqJcMXZ");
Moralis.serverURL = "https://glko4xadf7mq.usemoralis.com:2053/server";

const serverUrl = "https://glko4xadf7mq.usemoralis.com:2053/server";
const appId = "Yh8rluxMC8wp6zXCQhJ3g2RXF4aNGHVuKrqJcMXZ";
const contract_addr = "0x76D77142730caf1Eddf5910e08e19AA0b55F1cD6";
Moralis.start({ serverUrl, appId });

async function init() {
    let currentUser = Moralis.User.current();
    if (!currentUser) {
        window.location.pathname = "/index.html";
    }

    await Moralis.enableWeb3();
    const urlParams = new URLSearchParams(window.location.search);
    const nftId = urlParams.get("nftId");

    document.getElementById("token_id_input").value = nftId;
}

async function transfer() {
    let token_id = parseInt(document.getElementById("token_id_input").value);
    let address = document.getElementById("address_input").value;
    let amount = parseInt(document.getElementById("amount_input").value);
    let accounts = await ethereum.request({ method: 'eth_accounts' });

    const options = {
        type: "erc1155",
        receiver: address,
        contractAddress: contract_addr,
        tokenId: token_id.toString(),
        amount: amount
    };

    const transaction = await Moralis.transfer(options);
    const result = await transaction.wait();
}

document.getElementById("submit_transfer").onclick = transfer;

init();