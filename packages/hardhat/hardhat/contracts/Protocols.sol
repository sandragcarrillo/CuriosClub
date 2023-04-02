// SPDX-License-Identifier: MIT


pragma solidity ^0.8.7;
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Protocols {

    using Counters for Counters.Counter;
   Counters.Counter private _creatorIds;
   uint public creatorCounter;
  
   struct ProtocolsInfo {
      uint id;
      string username;
      string ipfsHash;
      address payable walletAddress;
      string userbio;
      uint bountyApplications;
   }

   event bountyRequest (
      uint id,
      string username,
      string ipfsHash,
      address payable walletAddress,
      string userbio,
      uint bountyApplicants
   );

   // Event to emit when a SupporterEvent is created.
   event bountyApplications(
       address indexed from,
       uint256 timestamp,
       string message
   );

   mapping(address => bool) isAddressExist;
   mapping(string => bool) isUsernameExist;
   ProtocolsInfo[] ProtocolsList;

    // function to create new protocol account
   function  setProtocolDetail(
       string memory _username,
       string memory _ipfsHash,
       string memory _userbio,
       string memory _bountyRequest) public view {

       // Validation
       require(bytes(_username).length > 0);
       require(bytes(_ipfsHash).length > 0);
       require(bytes(_userbio).length > 0);
        require(bytes(_bountyRequest).length > 0);

       /**
       *@dev require statement to block multiple entry
       */
       require(isAddressExist[msg.sender] == false, "Address already exist");
       require(isUsernameExist[_username] == false, "Username already exist");

   }

     // Return the entire list of protocols
   function getProtocolsList() public view returns (ProtocolsInfo[] memory) {
       return ProtocolsList;
   }

}