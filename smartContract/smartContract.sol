// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RideSharing {

   struct User {
    string metamaskID;
    string name; 
    string email;
    string number;
    uint fare;
    string location;
    string destination;
    string date;
    string time;

   }

   struct Booked{
    string metamaskID;
    string name; 
    string email;
    string number;
    uint fare;
    string location;
    string destination;
    // string date;
    // string time;
    string RidermetaID;
    bool request;
    bool paid;
   }

//    address public owner;
//    constructor(){
//     owner= msg.sender;
//    }
   
   mapping(address => User) public users;
   address[] public userAddresses;

    mapping(address => Booked) public books;
   address[] public bookingAddresses;

//    modifier onlyOwner() {
//        require(msg.sender == owner, "Not the owner");
//        _;
//    }

   function addUser(string memory _metamaskID, string memory _name, string memory _email, string memory _number, uint _fare, string memory _location, string memory _destination, string memory _date, string memory _time) public  {
        User memory newUser = User(_metamaskID, _name, _email, _number, _fare, _location, _destination, _date, _time);
        users[msg.sender] = newUser;
        userAddresses.push(msg.sender);
   }

   function Booking(string memory _metamaskID, string memory _name, string memory _email, string memory _number, uint _fare, string memory _location, string memory _destination, string memory _rider, bool _requested, bool _paid) public {
    Booked memory newBook= Booked(_metamaskID, _name, _email, _number, _fare, _location, _destination, _rider,_requested,_paid);
    books[msg.sender]= newBook;
    bookingAddresses.push(msg.sender);
   }

   function getAllUsers() external view returns(User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);
        for (uint i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
   }

   

    function getAllbooking() external view returns(Booked[] memory) {
        Booked[] memory allbookings = new Booked[](userAddresses.length);
        for (uint i = 0; i < userAddresses.length; i++) {
            allbookings[i] = books[bookingAddresses[i]];
        }
        return allbookings;
   }

       function getBookingByUser(string memory _metamaskID) public view returns (Booked memory) {
        for (uint i = 0; i < bookingAddresses.length; i++) {
            if (keccak256(bytes(books[bookingAddresses[i]].metamaskID)) == keccak256(bytes(_metamaskID))) {
                return books[bookingAddresses[i]];
            }
        }
        revert("Booking not found");
    }

    function getBookingByRider(string memory _riderMetamaskID) public view returns (Booked memory) {
    for (uint i = 0; i < bookingAddresses.length; i++) {
        if (keccak256(bytes(books[bookingAddresses[i]].RidermetaID)) == keccak256(bytes(_riderMetamaskID))) {
            return books[bookingAddresses[i]];
        }
    }
    revert("Booking not found");
}    

   function deleteBooking(address _bookingAddress) public  {
        delete books[_bookingAddress];
        for (uint i = 0; i < bookingAddresses.length; i++) {
            if (bookingAddresses[i] == _bookingAddress) {
                delete bookingAddresses[i];
                break;
            }
        }
   }

      function deleteUser(address _userAddress) public  {
        delete users[_userAddress];
        for (uint i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == _userAddress) {
                delete userAddresses[i];
                break;
            }
        }
   }

      function requestPayment(address _riderAddress) public {
    require(msg.sender != _riderAddress, "You can't request to yourself");
        require(books[_riderAddress].request == false, "You have already requested");
        books[_riderAddress].request = true;
   }

   function isPaid(address _riderAddress) public view returns(bool) {
    return books[_riderAddress].paid;
        }

    receive() external payable {}
    function payContract() external payable {
        require(msg.value > 0, "Must send some ether");
    }
    
    function transferToRider(address _riderAddress,uint256 amount) public payable {
        require(amount > 0, "Amount must be greater than zero");
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(_riderAddress).transfer(amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

   function sendEthRider(address _rider) public payable{
    require(msg.sender != _rider, "You can't send Ether to yourself");
    payable(_rider).transfer(msg.value);
     }

}

