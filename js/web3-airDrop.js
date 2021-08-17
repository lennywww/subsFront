var Web3 = require("web3");
var Tx     = require('ethereumjs-tx').Transaction;
let web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");//metamask infura 节点
let abijson = require('../abi/AirDrop.json');
let userJson = require('./user.json');
let PRIVATE_KEY = ""
let contractAddress = "0x81445502bf0321BB9243d9Db0771e1Ed8A1F8ee7";
var contract = new web3.eth.Contract(abijson.abi,contractAddress);
const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY)
web3.eth.accounts.wallet.add('0x' + PRIVATE_KEY);
web3.eth.defaultAccount = account.address
//transactionHash 输入 转账hash
async function main() {
    //使用metamask infura
    contract.methods.multiUserReceiveAward(["0x12D144ef18162972DdcEc190E435d06acD21c7eC","0xA2E46C4A53ac663394300EA24304cd04886099C6"],["100000","100000"]).send({
     from: web3.eth.defaultAccount, gas: 1e6
    }).then(result=>{
        console.log(result)
    })
    //使用自己 infura
    // let transactionCount = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    // let encodeABI = contract.methods.multiUserReceiveAward(["0x12D144ef18162972DdcEc190E435d06acD21c7eC","0xA2E46C4A53ac663394300EA24304cd04886099C6"],["10000000000000","10000000000000"]).encodeABI();
    // const txObject = {
    //     from: web3.eth.defaultAccount,
    //     nonce:    web3.utils.toHex(transactionCount+1),
    //     to:       contractAddress,
    //     contractAddress:contractAddress,
    //     gasLimit: web3.utils.toHex(8000000),
    //     gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    //     data:encodeABI
    // }
    try {
        // const privateKey = Buffer.from(PRIVATE_KEY,'hex')
        // const tx = new Tx(txObject, { 'chain' : 'ropsten' ,hardfork:'petersburg'})
        // tx.sign(privateKey)
        // const serializedTx = tx.serialize()
        // const raw = '0x' + serializedTx.toString('hex')
        // const hash  =  await  web3.eth.sendSignedTransaction(raw);
        // console.log(hash)
    }catch (e) {
        console.log(e.toString());
    }
}
main();