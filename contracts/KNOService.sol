// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./KNOToken.sol";

contract KNOService {
    address public admin;
    KNOToken private knoToken; // saves KNOToken contract addres
    mapping(address => Account) public Accounts;

    struct Account {
        address walletAddress;
        string nickname;
        uint256 points;
        uint256[] questions;
        uint256[] answers;
    }

    constructor(address _tokenAddress) {
        admin = msg.sender;
        knoToken = KNOToken(_tokenAddress);
    }

    function transfer(address _recipient, uint256 _amount) public {
        require(msg.sender == admin, "Only Admin can transfer"); // revert if msg.sender != admin
        knoToken.transfer(_recipient, _amount);
    }

    function addPoints(address _recipient, uint256 _amount) public {
        require(msg.sender == admin, "Only Admin can add points");
        Accounts[_recipient].points += _amount;
    }

    function showPoints(address _address) public view returns (uint256) {
        return Accounts[_address].points;
    }

    function showQuestions(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return Accounts[_address].questions;
    }

    function showAuestions(address _address)
        public
        view
        returns (uint256[] memory)
    {
        return Accounts[_address].answers;
    }
}
