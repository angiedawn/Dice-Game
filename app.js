/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
inIt();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Get a random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //console.log(dice);
    //display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.getElementsByClassName.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    //3. Update the score IF the rolled number was NOT a 1

    if (dice !== 1) {
      //add score
      roundScore += dice; //roundScore = roundScore + dice (roundScore initialized at the top of the page)
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      document.querySelector(".dice").style.display = "block"; //had to add this to display dice when rolling
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

    //Check if player won the game
    if (scores[activePlayer] >= 50) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
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

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");

  document.querySelector(".dice").style.display = "none"; //hides die in between turns
}

document.querySelector(".btn-new").addEventListener("click", inIt); //inIt(); call funtion immediatly, inIt calls it only when needed

function inIt() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector(".dice").getElementsByClassName.display = "none";

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
/*
//dice = Math.floor(Math.random() * 6) + 1; //we used console.log to figure out this formula
//console.log(dice);

//document.querySelector("#current-" + activePlayer).textContent = dice; //setter ********************
/*^^^ changes the current player from 0 to 1. current-' + activeplayer(1) = 'current-1' we are just concating the characters*/
//document.querySelector("#current-" + activePlayer).innerHTML =
// "<em>" + dice + "</em>"; /* We can add html to manipulate the dom. This is italicized

//var x = document.querySelector("#score-0").textContent; //getter *****************
//console.log(x)
