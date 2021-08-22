pragma solidity ^0.5.0;

import "./Counters.sol";
import "./IERC20.sol";

contract PledgeStoageV1{
    address  owner;
    
    address unconfirmedOnwer;
    
    uint256 airDropAcmount;
    
    IERC20 qua;
    
    Counters.Counter  _tokenIdTracker;
    
    uint256  public three_months = 90 days;
    
    
    struct Order {
        address user;
        uint256 balance;
        uint256 createTime;
        uint256 threeMonthsAfter;
        uint256 hundredth;
        uint256 expirationTime;
        uint256 confirmAmount;
    }
    
    mapping(uint256 => Order) public orders;
    
    mapping(address => OrderList )  userOrders;
    
    struct OrderList{
        uint256 [] orderList;
    }
    
    struct User{
        uint256 totalBalnaces;
        uint256 totalConfirmAmount; 
        uint256 totalReleaseBalance;
    }
    
    mapping(address => User ) public users;
    
    address public pledgeImplementation;
    

}
