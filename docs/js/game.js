'use strict';

let maxCards = 8;
const pairs = ['pairA','pairB','pairC','pairD','pairA','pairB','pairC','pairD']
let correctCards = [];
let compareCards = {}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

toggleFullScreen()

const randomnizeList = (arr) => {
  const randomnizeArr = arr;
  for(let i = randomnizeArr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * randomnizeArr.length)
    const temp = randomnizeArr[i]
    randomnizeArr[i] = arr[j]
    randomnizeArr[j] = temp
  }
  return randomnizeArr;
}

const cardUl = document.querySelector('.cards');

const createCard = () => {
  for (let i = 0; i < maxCards; i++){
    const li = document.createElement('li');
    const divInner = document.createElement('div');
    const divFront = document.createElement('div');
    const divBack = document.createElement('div');
    const fooFrontContent = document.createTextNode("front");
    const fooBackContent = document.createTextNode("back"); 
    
    li.id = `card-${i}`
    li.setAttribute('class','flip-card');
    divInner.setAttribute('class','flip-card-inner');
    divFront.setAttribute('class','flip-card-front');
    divBack.setAttribute('class','flip-card-back');

    divFront.appendChild(fooFrontContent);
    divBack.appendChild(fooBackContent);

    divInner.appendChild(divFront);
    divInner.appendChild(divBack);
    li.appendChild(divInner);
    cardUl.appendChild(li);
    li.addEventListener('click',flipCard)
  }
}

const shuffleCards = () => {
  const cardsShuffled = randomnizeList(pairs);
  const cardLi = document.querySelectorAll('.flip-card');
  for(let i = 0; i < cardLi.length; i++){
    cardLi[i].classList.add(cardsShuffled[i])
  }  
}

const flipCard = (evt) => {
  const objectCardLength = Object.keys(compareCards).length;
  const cardTarget = evt.currentTarget;
  if(objectCardLength >= 0 && objectCardLength < 2) {
    const pairClass = cardTarget.classList[1];
    compareCards[cardTarget.id] = pairClass;
    cardTarget.classList.add('rotate');
  }
  if(objectCardLength === 1){
    checkCards();
  }
}

const checkCards = () => {
  const cardClasses = Object.values(compareCards);
  if(cardClasses[0] === cardClasses[1]){
    setTimeout(checkCorrect,1000)
  } else {
    setTimeout(checkIncorrect,1000)
  }
}

const checkCorrect = () => {
  console.log('iguales');
  const cardLis = document.querySelectorAll('.flip-card');
  for(let cardItem of cardLis){
    if(cardItem.classList.contains('rotate')){
      cardItem.classList.remove('rotate');
      cardItem.classList.add('correct');
      compareCards = {};
      correctCards = [...correctCards, cardItem.id]
    }
  }
  if(correctCards.length === pairs.length){
    alert('Has ganado');
  }
  console.log(correctCards)
}

const checkIncorrect = () => {
  console.log('no iguales');
  const cardLis = document.querySelectorAll('.flip-card');
  for(let cardItem of cardLis){
    if(cardItem.classList.contains('rotate')){
      cardItem.classList.remove('rotate');
      compareCards = {}
    }
  }
}

createCard();
shuffleCards();



