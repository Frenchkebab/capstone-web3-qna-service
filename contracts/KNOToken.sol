// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// import "../libraries/ERC20.sol";
// import "./ERC20Detailed.sol";
// import "./ERC20Burnable.sol";

contract KNOToken is ERC20 {
    address public admin; // Admin

    constructor(uint256 _initialSupply) ERC20("Knowledge Token", "KNO") {
        admin = msg.sender;
        _mint(admin, _initialSupply); // mints token to msg.sender(admin)
    }

    // Mint Tokens (revert if not admin)
    function mint(address _to, uint256 _amount) public {
        require(admin == msg.sender, "Ownable: caller is not the owner");
        _mint(_to, _amount);
    }
}
