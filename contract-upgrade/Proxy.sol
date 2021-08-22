pragma solidity ^0.5.14;

import "./PledgeStoage.sol";

contract Proxy is PledgeStoageV1  {


    constructor(address quaAddress)  public{
        qua =IERC20(quaAddress);
        owner = msg.sender;
    }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
     function upgradeTo(address newImplementation) external {
         require(admin() ==msg.sender,"no permission");
         require(isContract(newImplementation),"Not smart contracts");
         pledgeImplementation = newImplementation;
        
    }
  

    function admin() public view returns(address){
        return owner;
    }
    
    function unconfirmedAdmin() public view returns(address){
        return unconfirmedOnwer;
    }

    function updateAdmin(address newAdmin)external {
        require(admin() == msg.sender,"No permission ");
        unconfirmedOnwer = newAdmin;
    }

    function confirmAdmin() external {
        require(unconfirmedAdmin() == msg.sender,"No permission ");
        owner = unconfirmedOnwer;
        unconfirmedOnwer = address(0);
    }
    

    function () payable external {
        (bool success, ) = pledgeImplementation.delegatecall(msg.data);

        assembly {
              let free_mem_ptr := mload(0x40)
              returndatacopy(free_mem_ptr, 0, returndatasize)

              switch success
              case 0 { revert(free_mem_ptr, returndatasize) }
              default { return(free_mem_ptr, returndatasize) }
        }
    }
}
