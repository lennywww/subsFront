var Web3 = require("web3");
let web3 = new Web3("https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
let PledgeJson = require('../abi/Pledge.json');
let IERC20Json = require('../abi/IERC20.json');
let PRIVATE_KEY = ""
let pledgeContractAddress = "0x46ADe9618AE122EF44293C9d1bb0e371Fe97BFe6";
let erc20ContractAddress = "0x8f5c43a1d14264b40aee85c470aa14b7b9e14528";
var ledgeContract = new web3.eth.Contract(PledgeJson.abi,pledgeContractAddress);
const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY)
web3.eth.accounts.wallet.add('0x' + PRIVATE_KEY);
web3.eth.defaultAccount = account.address;
var erc20Contract = new web3.eth.Contract(IERC20Json.abi,erc20ContractAddress);
//transactionHash 输入 转账hash
async function main() {
    //授权
    // erc20Contract.methods.approve(pledgeContractAddress,10000000000).send({
    //     from: web3.eth.defaultAccount, gas: 1e6
    // }).then(result=>{
    //     console.log(result)
    // });
    // 质押 提示等待上面授权上线结束后才能执行质押
    // ledgeContract.methods.pledgeToken("100000000").send({
    //     from: web3.eth.defaultAccount, gas: 1e6
    // }).then(result=>{
    //     console.log(result)
    // });
    // 查看用户质押信息
    // ledgeContract.methods.getUserOrderList(web3.eth.defaultAccount).call()
    // .then(orderList => {
    //     for (let i = 0; i < orderList.length; i++) {
    //         // 当前订单信息
    //         ledgeContract.methods.orders(orderList[i]).call()
    //         .then(order => {
    //             console.log(order,"order");
    //         });
    //         // 订单释放金额
    //         ledgeContract.methods.releaseBalance(orderList[i]).call()
    //         .then(releaseBalance => {
    //             console.log(releaseBalance,"releaseBalance");
    //         });
    //     }
    // });
    //质押释放领取
    // ledgeContract.methods.receiveAward("1").send({
    //     from: web3.eth.defaultAccount, gas: 1e6
    // }).then(result=>{
    //         console.log(result)
    // });
    //获取用户信息
    ledgeContract.methods.users( web3.eth.defaultAccount).call()
      .then(user => {
          console.log(user,"user");
      });
}
main();
