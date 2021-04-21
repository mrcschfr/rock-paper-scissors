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

function updatePlayerSelection(selection) {
    // Update the global variable
    playerMove = selection;

    // Update the UI
    switch(selection) {
        case "rock":
            document.getElementById("playerSelection").innerText = "✊🏻";
            break;
        case "paper":
            document.getElementById("playerSelection").innerText = "🤚🏻";
            break;
        case "scissors":
            document.getElementById("playerSelection").innerText = "✌🏻";
            break;
    }
}

function updateComputerSelection(selection) {
    // Update the global variable
    computerMove = selection;

    // Update the UI
    switch(selection) {
        case "rock":
            document.getElementById("computerSelection").innerText = "✊🏻";
            break;
        case "paper":
            document.getElementById("computerSelection").innerText = "🤚🏻";
            break;
        case "scissors":
            document.getElementById("computerSelection").innerText = "✌🏻";
            break;
    }
}

function updatePlayerScore() {
    document.getElementById("playerScore").innerText = scorePlayer;
}

function updateComputerScore() {
    document.getElementById("computerScore").innerText = scoreComputer;
}

function updateStatusMessage(message) {
    document.getElementById("statusMessage").innerText = message;
}

function makeComputerMove() {
    let elem = document.getElementById("computerSelection");

    // Add class 'thinking' to trigger the animation
    elem.innerText = '🤖'
    elem.classList.add("thinking");

   // Afterwards, no further action is necessary, since we have an event handler that automatically triggers when the animation is finished.
}

// ---------
// GLOBAL VARIABLES
// ---------

let scorePlayer = 0;
let scoreComputer = 0;
let playerMove = null;
let computerMove = null;
let isGameOver = false;

// ---------
// EVENTS
// ---------

document.getElementById("selection-rock").addEventListener('click', () => {
    if (!isGameOver) {
        updateStatusMessage("<calculating>");
        updatePlayerSelection("rock");
        makeComputerMove();
    } else {
        updateStatusMessage("To go on, start a new game.");
    }
});

document.getElementById("selection-paper").addEventListener('click', () => {
    if (!isGameOver) {
        updateStatusMessage("<calculating>");
        updatePlayerSelection("paper");
        makeComputerMove();
    } else {
        updateStatusMessage("To go on, start a new game.");
    }
});

document.getElementById("selection-scissors").addEventListener('click', () => {
    if (!isGameOver) {
        updateStatusMessage("<calculating>");
        updatePlayerSelection("scissors");
        makeComputerMove();
    } else {
        updateStatusMessage("To go on, start a new game.");
    }
});

document.getElementById("restartButton").addEventListener('click', () => {
    scorePlayer = 0;
    scoreComputer = 0;
    isGameOver = false;
    updateComputerScore();
    updatePlayerScore();
    updateStatusMessage("It's your turn. Choose wisely!");
});

// This event listener will trigger as soon as the animation/ the 'thinking process' is over
document.getElementById("computerSelection").addEventListener('animationend', () => {
    // Let's remove class 'thinking'
    document.getElementById("computerSelection").classList.remove("thinking");
    
    // Now we can calculate the computer's move and display it
    updateComputerSelection(getComputerMove());  

    // Let's see who won
    let winner = checkWinner(computerMove, playerMove);

    if (winner === "computer") {
        scoreComputer++;
        updateComputerScore();
        if (scoreComputer == 5) {
            isGameOver = true;
            updateStatusMessage("Too bad, the computer won this game.");
        } else {
            updateStatusMessage("Dang! Computer scored.");
        }
    } else if (winner === "player") {
        scorePlayer++;
        updatePlayerScore();
        if (scorePlayer == 5) {
            isGameOver = true;
            updateStatusMessage("You won! Way to go!")
        } else {
            updateStatusMessage("Good choice, go on!");
        }
    } else {
        updateStatusMessage("Draw! Choose again.")
    }
});

let menus = document.getElementsByClassName("menu");

for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener('click', (event) => {
        let overlay = document.getElementById("overlay");

        if(overlay.classList.contains("show")) {
            overlay.classList.remove("show");
            overlay.classList.add("hide");
            document.getElementsByClassName("section-mid")[0].style.overflowY = "auto";
            document.getElementsByClassName("menu")[0].style.color = "#000000";
            document.getElementsByClassName("menu")[1].style.color = "#000000";
        } else {
            overlay.classList.remove("hide");
            overlay.classList.add("show");
            document.getElementsByClassName("menu");
            document.getElementsByClassName("section-mid")[0].style.overflowY = "hidden";
            document.getElementsByClassName("menu")[0].style.color = "#ffffff";
            document.getElementsByClassName("menu")[1].style.color = "#ffffff";
        }
    });
}