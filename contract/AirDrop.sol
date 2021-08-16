pragma solidity ^0.5.0;


interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

}

contract AirDrop{

    //read
    address  owner;

    address unconfirmedOnwer;

    uint256 airDropAcmount;

    IERC20 qua;

    mapping(address => bool) private airDrop;

    constructor(uint256  newAirDropAcmount,address quaAddress) public{
        airDropAcmount = newAirDropAcmount;
        owner = msg.sender;
        qua = IERC20(quaAddress);
    }

    function admin() public view returns(address){
        return owner;
    }

    function unconfirmedAdmin() public view returns(address){
        return unconfirmedOnwer;
    }

    function airDropAcmounts() public view returns(uint256){
        return airDropAcmount;
    }

    function getairDrop(address sender) public view  returns(bool){
        return airDrop[sender];
    }

    //write

    function setAirDropAcmount(uint256 newAirDropAcmount) external {
        require(admin() == msg.sender,"No permission ");
        airDropAcmount = newAirDropAcmount;
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

    function receiveAward() public {
        require(qua.balanceOf(address(this))>=airDropAcmounts(),"Insufficient Balance");
        require(!getairDrop(msg.sender),"You can only get it once");
        require(qua.transfer(msg.sender,airDropAcmounts()));
        airDrop[msg.sender] = true;
    }

    function multiUserReceiveAward(address[] memory _recipients,uint256 [] memory _amounts)  public returns (bool) {
        require(admin() == msg.sender,"No permission ");
        require(qua.balanceOf(address(this))>=airDropAcmounts()*_recipients.length,"Insufficient Balance");
        for(uint j = 0; j < _recipients.length; j++){
            qua.transfer(_recipients[j], _amounts[j]);
        }
        return true;
    }

    function withdraw() public  {
        require(admin() == msg.sender,"No permission ");
        uint balance = qua.balanceOf(address(this));
        require(qua.transfer(admin(),balance));

    }
}