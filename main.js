let score = (JSON.parse(localStorage.getItem('point')) || {wins:0,
    losses:0, 
    tie: 0
  }); 
  
  
  
  updateScore();
 
let intervalId;


   function autoPlay() {
   intervalId = setInterval(function () {
   const autoMove = pickComputerMove();
   playerGame(autoMove)
    },1000)
  
   }
   
   function changeText() {
     
     let buttonElem = document.querySelector('.js-auto-play-btn');
     let value = buttonElem.innerHTML;
     
     if(value === 'Auto Play') {
       autoPlay();
       setTimeout(function () {
         
         buttonElem.innerHTML= 'Stop Play';
       },1000);
       
     }else if(value === 'Stop Play') {
       clearInterval(intervalId);
       buttonElem.innerHTML= 'Auto Play';
     }
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
   document.querySelector('.js-result') .innerHTML = result.charAt(0).toUpperCase() + result.slice(1);
   
 }
 
 function resetScore() {
   
   score.wins= 0;
   score.losses = 0;
   score.tie = 0;
   
   updateScore();
   updateResult(' ');
   document.querySelector('.js-my-move').innerHTML = ' ';
   localStorage.removeItem('point') ;
   
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
  
  
