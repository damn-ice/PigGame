  
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let scores, activePlayer, roundScore, isActive, prevDice;
init();


// dice = Math.floor(Math.random() * 6) + 1;
// document.getElementById("current-1").innerHTML = '<em>'+dice + '</em>'

// console.log(Object.getOwnPropertyDescriptor(document));
document.querySelector(".btn-roll").addEventListener("click", () =>{
    if (isActive) {
        let diceImage = document.querySelector(".dice");
        let dice = Math.floor(Math.random() * 6) + 1;
        diceImage.src = 'dice-' + dice + '.png';
        diceImage.style.display = "block";
        console.log(prevDice, dice);

        if (dice !== 1 ) {
            if (prevDice === 6 && dice === 6) {
                scores[activePlayer] = 0;
                document.querySelector("#score-"+ activePlayer).textContent = scores[activePlayer];
                nextPlayer();
                console.log('Both 6 --> Lose Entire Score --> Next Player');
            }else {
                roundScore += dice;
                document.querySelector('#current-'+ activePlayer).textContent = roundScore; 
                console.log('Keep Going! --> You\'re the Best!')
                prevDice = dice; 
            }
        } else {
            nextPlayer();
            console.log('Dice is 1 --> Next Player');
        }
        
    }
})

document.querySelector(".btn-hold").addEventListener("click", () => {
    if (isActive) {
        scores[activePlayer] += roundScore;
        document.querySelector("#score-"+ activePlayer).textContent = scores[activePlayer];
        let thresh = document.getElementById('limit').value
        if (thresh < 1) {
            thresh = 100;
        }
        if (scores[activePlayer] >= thresh){
            isActive = false;
            document.querySelector("#name-"+ activePlayer).textContent = "Winner!";
            setTimeout(() => {
                document.querySelector('.dice').style.display = 'none';
            }, 500)
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
        }else {
            nextPlayer(); 
        }
    }
})

// document.querySelector(".btn-hold").addEventListener("click", () => {
//     let score;
//     activePlayer ? score = document.getElementById("score-1") : score = document.getElementById("score-0");
//     score.textContent = Number(score.textContent) + Number(document.querySelector('#current-'+ activePlayer).textContent);
//     nextPlayer();
    
// })

function nextPlayer () {
    roundScore = 0;
    prevDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    setTimeout(() => {
        document.querySelector('.dice').style.display = 'none';
    }, 500)
}

function init () {
    scores = [0, 0];

    roundScore = 0;
    prevDice = 0;
    activePlayer = 0;
    document.getElementById("score-0").textContent = 0;
    document.getElementById("score-1").textContent = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    document.getElementById('limit').value = 100;
    document.querySelector(".dice").style.display = "none";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    isActive = true;
}

document.querySelector(".btn-new").addEventListener("click", init);