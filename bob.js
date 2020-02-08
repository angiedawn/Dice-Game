var scores, roundScore, activePlayer, gamePlaying;
inIt();

var lastDice; //this variable gets dropped after we leave the function below

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Get a random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 5) + 1;

    console.log(dice1);
    console.log(dice2);
    //display the result
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice1 !== 1 && dice2 !== 1) {
      roundScore = dice1 + dice2 + roundScore;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; //same as scores[activePlayer] = scores[activePlayer] + roundScore

    //Update user interface UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".final-score").value;
    var winningScore;
    //console.log(input); shows in console when I click hold because I am inside the eventlistener click event for hold!

    //Undefined, 0, null or "" are COERCED to false
    //Anything else is COERCED to true

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    console.log(winningScore);

    //Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.getElementById("dice-1").style.display = "block";
      document.getElementById("dice-2").style.display = "block";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next Player if hold is pressed
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //TERNARY OPERATOR
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";
}

document.querySelector(".btn-new").addEventListener("click", inIt); //inIt(); calls funtion immediatly, inIt calls it only when needed

function inIt() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "block";
  document.getElementById("dice-2").style.display = "block";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
