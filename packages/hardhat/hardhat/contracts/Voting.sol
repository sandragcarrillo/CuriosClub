// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Voting {
    event VoteCasted(
        uint256 indexed proposalId,
        address indexed from,
        uint256 vote
    );

    // stores the votes of the users for a submission. This variable is internal
    mapping(uint256 => mapping(address => uint256)) internal votes; // 0: didn't vote, 1: voted for no, 2: voted for yes
    // Id of the current submission. Initial value is 0. This variable can be accessed externally
    uint256 public proposalId;
    // amount of votes for 'yes' for the current submission. This variable can be accessed externally
    uint256 public votesForRecomendable;
    // amount of votes for 'no' for the current submission. This variable can be accessed externally
    uint256 public votesForNoRecomendable;
    // fee required to perform the vote. This variable can be accessed externally
    //uint256 public constant VOTE_FEE = 0.01 ether; // 10000000000000000 in wei

    /**
     * @dev Performs a vote for the current proposal.
     * @param _vote integer representation of the vote
     */
    function vote(uint256 _vote) external payable {
        require(
            _vote == 1 || _vote == 2,
            "Solo puedes votar por Recomendable o No recomendable"
        );
        //require(votes[proposalId][msg.sender] == 0, "Address already voted");


        votes[proposalId][msg.sender] = _vote;

        if (_vote == 1) {
            votesForRecomendable++;
        } else {
            votesForNoRecomendable++;
        }

        emit VoteCasted(proposalId, msg.sender, _vote);
    }

    /**
     * @dev Returns the vote of the user for the current proposal.
     * @param _user address of the user
     * @return integer representation of the vote
     */
    function getVote(address _user) external view returns (uint256) {
        return votes[proposalId][_user];
    }

    /**
     * @dev Clean the current vote state and creates a new proposal.
     * This method is useful for developers to start a new proposal for testing purposes.
     */
    function clean() external {
        proposalId++;
        votesForRecomendable = 0;
        votesForNoRecomendable = 0;
    }
}
