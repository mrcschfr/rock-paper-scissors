"use strict";

// ---------------------
// FUNCTION DECLARATIONS
// ---------------------

function getPlayerMove() {
    return prompt("Please enter your move [rock/ paper/ scissors]");
}

function getComputerMove() {
    // Returns a value between 0 and 2
    let choice = Math.floor(Math.random() * 3); 
    
    if (choice === 0) {
        return "rock";
    } else if (choice === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function checkWinner(moveComputer, movePlayer) {
    let winner;
    
    // Make sure the arguments are all lowercase
    moveComputer = moveComputer.toLowerCase();
    movePlayer = movePlayer.toLowerCase();

    switch(moveComputer) {
        case "rock":
            switch(movePlayer) {
                case "rock":
                    winner = "draw";
                    break;
                case "paper":
                    winner = "player";
                    break;
                case "scissors":
                    winner = "computer";
                    break;
            }
            break;
        case "paper":
            switch(movePlayer) {
                case "rock":
                    winner = "computer";
                    break;
                case "paper":
                    winner = "draw";
                    break;
                case "scissors":
                    winner = "player";
                    break;
            }
            break;
        case "scissors":
            switch(movePlayer) {
                case "rock":
                    winner = "player";
                    break;
                case "paper":
                    winner = "computer";
                    break;
                case "scissors":
                    winner = "draw";
                    break;
            }
            break;
        default:
            console.error("This statement should not be reached");
            break;
    }

    return winner;
}

function game(iterations) {
    let scorePlayer = 0;
    let scoreComputer = 0;
    let playerMove;
    let computerMove;
    let winner;

    for (let i = 0; i < iterations; i++) {
        playerMove = getPlayerMove();
        computerMove = getComputerMove();
        winner = checkWinner(computerMove, playerMove);

        console.log(`You chose ${playerMove}, the computer chose ${computerMove}`);

        if (winner === "computer") {
            console.log("The computer won this round.")
            scoreComputer++;
        } 
        
        if (winner === "player") {
            console.log("You won this round!")
            scorePlayer++;
        }

        console.log(`SCORE --- You: ${scorePlayer} --- Computer: ${scoreComputer}`);
    }

    console.log("%cGame over", "font-weight: bold");

    if (scorePlayer > scoreComputer) {
        console.log("%cYou won! Way to go!", "color: green");
    } else if (scorePlayer < scoreComputer) {
        console.log("%cThe computer won. Too bad.", "color: red");
    } else {
        console.log("Looks like a draw. You should try again!");
    }
}

// ---------
// MAIN LOOP
// ---------

document.getElementById("startGame").onclick = () => game(3);