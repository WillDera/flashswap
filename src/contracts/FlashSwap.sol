// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "./Token.sol";

contract FlashSwap {
    string public name = "FlashSwap";
    Token public token;
    uint256 public rate = 100;

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        /*  Redemption rate = No. of tokens received per 1 Eth
            Amount of Eth * Redemption rate 

            tokenAmount = number of tokens to be sent per Eth received    
        */
        uint256 tokenAmount = msg.value * rate;

        token.transfer(msg.sender, tokenAmount);
    }
}
