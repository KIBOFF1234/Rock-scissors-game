

let score = (JSON.parse(localStorage.getItem('point')) || {wins:0,
  losses:0, 
  tie: 0
}); 


document.body.addEventListener('keydown', (event) => {

if(event.key === 'r'){
  playerGame('rock')
}else if(event.key === 'p') {
  playerGame('paper');
}else if(event.key === 's') {
  playerGame('scissors');
}else if(event.key === 'a') {
  autoPlay();
}else if(event.key === 'Backspace'){
  confirmResetScore();
}
});


document.querySelector('.js-rock-btn').addEventListener('click', () => {
  playerGame('rock');
});

document.querySelector('.js-paper-btn').addEventListener('click', ()=> {
  playerGame('paper');
});

document.querySelector('.js-scissors-btn').addEventListener('click', () => {
  playerGame('scissors');
});

document.querySelector('.js-reset-btn').addEventListener('click', confirmResetScore);

document.querySelector('.js-auto-play-btn').addEventListener('click', autoPlay);



updateScore();


let isAutoPlaying = false;
let intervalId ;

const autoPlayElem = document.querySelector('.js-auto-play-btn');

  function autoPlay() {

  if (!isAutoPlaying) {
    intervalId = setInterval( () =>  {
      const playerMove= pickComputerMove();
      playerGame(playerMove);
      autoPlayElem.innerHTML = 'Stop Play';
    },1000);
    isAutoPlaying = true;
    
  
  }else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoPlayElem.innerHTML = 'Auto Play';
  }

};


function confirmResetScore() {

  if(isAutoPlaying){
    clearInterval(intervalId);
    autoPlayElem.innerHTML = 'Auto Play';
    isAutoPlaying = false;
    flag = 1;
  }
  document.querySelector('.js-confirm-reset')
  .innerHTML = 
  `are you sure you want to reset score
  <button class="js-yes-btn yes-btn">yes</button>
  <button class="js-no-btn no-btn">no</button>`

document.querySelector('.js-yes-btn')
 .addEventListener('click', () => {
   resetScore();
   document.querySelector('.js-confirm-reset')
     .innerHTML = '';
 });
 document.querySelector('.js-no-btn')
  .addEventListener('click' , () => {
   if(flag === 1) {
     autoPlay();
   }
    document.querySelector('.js-confirm-reset')
    .innerHTML = '';
  });
 };


 let flag = 0;
function resetScore() {
  score.wins= 0;
   score.losses = 0;
   score.tie = 0;
   
   updateScore();
   updateResult(' ');
   document.querySelector('.js-my-move').innerHTML = ' ';
   localStorage.removeItem('point') ;
   
  }
 
 
 
  function playerGame(playerMove){
  
const computerMove = pickComputerMove();

let result = '';
let playerElement;
    
  if(playerMove === 'rock') {
  
  playerElement = document.querySelector('.js-rock-btn');
 
  
  
    if(computerMove === 'rock') {
      result = 'tie';
      
    } else if (computerMove === 'paper') {
      result = 'you lose';
      
    } else {
      result = 'you win';
    }
  
    
  }else if(playerMove === 'paper')  {
    
    
    playerElement = document.querySelector('.js-paper-btn');
    
    if(computerMove === 'rock') {
      result = 'you win';
      
    } else if (computerMove === 'paper') {
      result = 'tie';
      
    } else {
      result = 'you lose';
    }
   
  }else if(playerMove === 'scissors') {
    
    playerElement = document.querySelector('.js-scissors-btn');
    
    if(computerMove === 'rock') {
      result = 'you lose';
      
    } else if (computerMove === 'paper') {
      result = 'you win';
      
    } else {
      result = 'tie';
    }
  }
  
  if(result === 'you win') {
    score.wins++;
    
  } else if(result === 'you lose') {
    score.losses++;
    
  } else if(result === 'tie') {
    
    score.tie++;
  }
  
localStorage.setItem('point',JSON.stringify(score));

  updateResult(result);
  
  
  
  
  
document.querySelector('.js-my-move').innerHTML =  `you
<img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
<img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
computer`;


  updateScore();

}



function updateScore() {
 document.querySelector('.js-score') .innerHTML = ` wins: ${score.wins} losses: ${score.losses} ties: ${score.tie}`;
  
}

function updateResult(result) {
 document.querySelector('.js-result').innerHTML = result.charAt(0).toUpperCase() + result.slice(1);
 
}

function pickComputerMove() {
  
  const randomNumber = Math.random();
  let computerMove = '';
  
  
if(randomNumber >= 0 && randomNumber <1/3) {
 computerMove = 'rock';
 
}else if(randomNumber >=1/3 && randomNumber< 2/3) {
 computerMove = 'paper';
 
}else if(randomNumber >= 2/3 &&  randomNumber <1) {
 computerMove = 'scissors';
 
}
  
  return computerMove;
}

