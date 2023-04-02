// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Creators list for Protocols

contract Creators {

    using Counters for Counters.Counter;
   Counters.Counter private _creatorIds;
   uint public creatorCounter;
  
   struct CreatorInfo {
      uint id;
      string username;
      string ipfsHash;
      address payable walletAddress;
      string userbio;
      uint bountiesReceived;
      uint supporters;
   }

   event CreatorSubmission (
      uint id,
      string username,
      address payable walletAddress,
      string ipfsHash,
      string userbio,
      uint bountiesReceived,
      uint supporters
   );

   // Event to emit when a SupporterEvent is created.
   event SupporterSubmission(
       address indexed from,
       uint256 timestamp,
       string message
   );

   // payable address can receive ether
   address payable public owner;

   // payable constructor can receive ether. Assigning the contract deployer as the owner
   constructor() payable {
       owner = payable(msg.sender);
   }

   mapping(address => bool) isAddressExist;
   mapping(string => bool) isUsernameExist;
   CreatorInfo[] creatorList;

    // function to create new creator account
   function setCreatorDetail(
       string memory _username,
       string memory _ipfsHash,
       string memory _userbio,
       string memory _userSubmission) public {

       // Validation
       require(bytes(_username).length > 0);
       require(bytes(_ipfsHash).length > 0);
       require(bytes(_userbio).length > 0);
        require(bytes(_userSubmission).length > 0);

       uint _bountiesReceived;
       uint _supporters;
       /**
       *@dev require statement to block multiple entry
       */
       require(isAddressExist[msg.sender] == false, "Address already exist");
       require(isUsernameExist[_username] == false, "Username already exist");

        /* Increment the counter */
       // _creatorIds.increment();

       creatorList.push(CreatorInfo(_creatorIds.current(),_username, _ipfsHash, payable(msg.sender), _userbio, _bountiesReceived, _supporters));
       isAddressExist[msg.sender] = true;
       isUsernameExist[_username] = true;

       // emit a Creator event
       emit CreatorSubmission (
       _creatorIds.current(),
       _username,
       payable(msg.sender),
       _ipfsHash,
       _userbio,
      _bountiesReceived,
      _supporters
   );
       _creatorIds.increment();
   }

     // Return the entire list of creators
   function getCreatorList() public view returns (CreatorInfo[] memory) {
       return creatorList;
   }

   /**
    * @dev send tip to a creator (sends an CELO tip)
    * @param _message a nice message from the supporter
    */
   function sendTip(string memory _message, uint _index) public payable {
       creatorList[_index].bountiesReceived += msg.value;
       creatorList[_index].supporters +=1;
      
       // Must accept more than 0 ETH for a bounty.
       require(msg.value > 0, "Insufficient balance!");

       // Emit a Supporter submissions with details.
       emit SupporterSubmission(
           msg.sender,
           block.timestamp,
           _message
       );
   }

   // Creator withdraw function. This function can be called by the creator
   function creatorWithdrawTip(uint index, uint amount) public returns (address payable _creatorAddress){
       CreatorInfo storage creatorDetail  =  creatorList[index];
       uint creatorBal = creatorDetail.bountiesReceived;   
       address payable creatorAddress = creatorDetail.walletAddress;
       creatorList[index].bountiesReceived -= amount;
       // check to ensure the amount to be withdrawn is not more than the creator balance
       require(amount <= creatorBal, "Insufficient bal");

       // Check to ensure the caller of the function is the creator
       require(msg.sender == creatorAddress, "You are not the creator");

       // // send input ether amount to creator
       // Note that "recipient" is declared as payable
       (bool success, ) = creatorAddress.call{value: amount}("");
       require(success, "Failed to send Ether"); 
       return creatorAddress;
   }


}