var ethers = require('ethers');
let abijson = require('../abi/AirDrop.json');
let userJson = require('./user.json');
let privateKey = "";
let provider = ethers.getDefaultProvider("https://ropsten.infura.io/v3/4fd622f05b27458c9cfc92f6b9e6e3ea");
let wallet  = new ethers.Wallet(privateKey, provider);
let contractAddress = "0x8F5c43A1d14264b40Aee85C470aa14B7B9e14528";
async function main() {

    let contractWithSigner = new ethers.Contract(contractAddress, abijson.abi, wallet);
    try {
        let tx = await contractWithSigner.multiUserReceiveAward(["0x12D144ef18162972DdcEc190E435d06acD21c7eC","0xA2E46C4A53ac663394300EA24304cd04886099C6"],[10000000000000,10000000000000]
            ,{
                gasLimit: 1000000000,
                gasPrice: ethers.utils.parseUnits("2", "gwei")
            }
        );
        await tx.awit();
    }catch (e) {
        console.log(e.toString());
    }
}
main();