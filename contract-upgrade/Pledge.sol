pragma solidity ^0.5.14;

import "./IERC20.sol";
import "./SafeMath.sol";
import "./PledgeStoage.sol";



contract Pledge is PledgeStoageV1{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    
    function releaseBalance(uint256 orderId) public view returns(uint256){
        Order memory order = orders[orderId];
        if(order.user==address(0)){
            return 0;
        }
        if(block.timestamp<order.threeMonthsAfter){
            return 0;
        }
        if(block.timestamp>order.expirationTime){
            return order.balance;
        }
        if(block.timestamp>order.threeMonthsAfter){
            return ((block.timestamp.sub(order.threeMonthsAfter)).mul(order.hundredth)).add(order.balance.div(2));
        }
    }
    
     
    
    function getUserOrderList(address account) public view returns(uint256  [] memory){
        return userOrders[account].orderList;
    }
    
 
    
    function pledgeToken(uint256 pledgeBalance) external {
        require(qua.transferFrom(msg.sender ,address(this),pledgeBalance));
        _tokenIdTracker.increment();
        uint256 orderId = _tokenIdTracker.current();
        uint256 timestamps  = block.timestamp;
        orders[orderId].threeMonthsAfter = timestamps.add(three_months);
        orders[orderId].expirationTime = timestamps.add(three_months).add( 100 minutes);
        orders[orderId].hundredth = pledgeBalance.div(2).div(100 minutes); 
        orders[orderId].user= msg.sender;
        orders[orderId].balance = pledgeBalance;
        orders[orderId].createTime = timestamps;
        userOrders[msg.sender].orderList.push(orderId);
        users[msg.sender].totalBalnaces = users[msg.sender].totalBalnaces.add(pledgeBalance);
        users[msg.sender].totalReleaseBalance = users[msg.sender].totalBalnaces.sub(users[msg.sender].totalConfirmAmount);
    } 
   function receiveAward(uint256 orderId,uint256 balanceReceive) public{
      Order storage order  = orders[orderId];
      uint256 orderReceiveAward = releaseBalance(orderId);
      if(orderReceiveAward==0){
          return ;
      }
      
      require(order.confirmAmount<order.balance);
      uint256 balance = orderReceiveAward.sub(order.confirmAmount);
       if(balanceReceive>balance){
          return ;
      }
      require(qua.transfer(order.user,balance));
      order.confirmAmount = orderReceiveAward;
      users[ order.user].totalConfirmAmount = users[ order.user].totalConfirmAmount.add(orderReceiveAward);
      users[ order.user].totalReleaseBalance = users[ order.user].totalReleaseBalance.sub(orderReceiveAward);
   }
   

   
}