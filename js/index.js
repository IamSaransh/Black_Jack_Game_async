//Object containing all the variables used in  functions
let blackjackGame = {
    'you': { 'scoreSpan':'#your-score', 'div':'#your-box', 'score': 0},
    'bot': { 'scoreSpan':'#bot-score', 'div':'#bot-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardMap' : {'2':2,'3':3,'4':4,'5':5,'6':6, '7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
};

//Adding short reference for frequently used objects
const YOU = blackjackGame['you']
const BOT = blackjackGame['bot']

//Importing Audio FIles
var hitAudio = new Audio('static/sounds/swish.m4a');
var bustAudio = new Audio('static/sounds/aww.mp3');


//Event listenors
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
//global variables




function blackjackHit(){
    let card= randomCard();
    showCard(card, YOU);
    console.log(card);
    updateScore(card, YOU);
    console.log(YOU['score']);
    showScore(YOU);
} 

//card name generated randomly
function randomCard(){
    var randomNumber = Math.floor(Math.random() *13);
    return blackjackGame['cards'][randomNumber];
    
}

//shows card on the screen taking arguments of player as YOU or BOT and a card 
//that is generated randomly
function showCard(card,currentPlayer) {
    if(currentPlayer['score'] <= 21){
        hitAudio.play();
        var cardImage= document.createElement('img');
        cardImage.src = `static/images/${card}.jpg`;
        document.querySelector(currentPlayer['div']).appendChild(cardImage);
    }
   
}

//remove all images after this function
function blackjackDeal(){
    var yourImages = document.querySelector('#your-box').querySelectorAll('img');
    for(let i=0; i< yourImages.length; i++){
        yourImages[i].remove();
    }

    var botImages = document.querySelector('#bot-box').querySelectorAll('img');
    for(let i=0; i< botImages.length; i++){
        botImages[i].remove();
    }
}


// calculates the score

function updateScore(card,currentPlayer){
    if(card=== 'A'){
        if(currentPlayer['score'] <= 10 ){
            currentPlayer['score'] += blackjackGame['cardMap'][card][1];
        }
        else{
            currentPlayer['score'] += blackjackGame['cardMap'][card][0];
        }
    }
    else{
        currentPlayer['score'] += blackjackGame['cardMap'][card];
    }


    
    return currentPlayer['score'];
}
function showScore(currentPlayer){
    if(currentPlayer['score'] <= 21){
        document.querySelector(currentPlayer['scoreSpan']).textContent = currentPlayer['score'];
        
    }
    else{
        document.querySelector(currentPlayer['scoreSpan']).textContent = "It's a Bust!";
        document.querySelector(currentPlayer['scoreSpan']).style.color = "red"  ;
        bustAudio.play();
    }
    
}