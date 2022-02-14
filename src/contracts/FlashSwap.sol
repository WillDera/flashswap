// SPDX-License-Identifier: MIT

pragma solidity ^0.5.0;

import "./Token.sol";

contract FlashSwap {
    string public name = "FlashSwap";
    Token public token;
    uint256 public rate = 100;

    event TokenPurchase(
        address _account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        /*  Redemption rate = No. of tokens received per 1 Eth
            Amount of Eth * Redemption rate 

            tokenAmount = number of tokens to be sent per Eth received    
        */
        uint256 tokenAmount = msg.value * rate;

        // make sure the DEX has more than the buyer is requesting
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // emit an event
        emit TokenPurchase(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amount) public {
        // Calculate amount of Eth to redeem
        uint256 etherAmount = _amount / rate;

        // Perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(etherAmount);
    }
}
