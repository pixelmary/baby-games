'use strict';

/* Globals */
const pairs = ['pairA', 'pairB', 'pairC', 'pairD', 'pairA', 'pairB', 'pairC', 'pairD'];
let playedCards = [];
let activeCards = [];
const timer = 1000;
const maxCards = 8;

/* Set fullscreen functionality*/
const toggleFullScreen = () => {
	const doc = window.document;
	const docEl = doc.documentElement;
	const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
	const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
	if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
};

toggleFullScreen();

const startGame = evt => {
	const cardDesign = evt.currentTarget.id;
	hideStartLayer();
	createCards(cardDesign);
	shuffleCards();
};

const cardsButtons = document.querySelectorAll('.button');
const addListeners = () => cardsButtons.forEach(button => button.addEventListener('click', startGame));
addListeners();

const startLayer = document.querySelector('#start');
const hideStartLayer = () => startLayer.classList.add('hide');

const shuffleArray = arr => {
	const randomnizeArr = arr;
	for (let i = randomnizeArr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * randomnizeArr.length);
		const temp = randomnizeArr[i];
		randomnizeArr[i] = arr[j];
		randomnizeArr[j] = temp;
	}
	return randomnizeArr;
};

const getRotatedCards = () => document.querySelectorAll('.rotate');

const cardUl = document.querySelector('.cards');

const createCards = design => {
	for (let i = 0; i < maxCards; i++) {
		const li = document.createElement('li');
		const divInner = document.createElement('div');
		const divFront = document.createElement('div');
		const divBack = document.createElement('div');

		li.id = `card-${i}`;
		li.setAttribute('class', 'flip-card');
		divInner.setAttribute('class', 'flip-card-inner');
		divFront.setAttribute('class', 'flip-card-front');
		divBack.setAttribute('class', 'flip-card-back');

		divInner.appendChild(divFront);
		divInner.appendChild(divBack);
		li.appendChild(divInner);
		cardUl.appendChild(li);
		cardUl.classList.add(design);

		li.addEventListener('click', flipCard);
	}
};

const shuffleCards = () => {
	const cardsShuffled = shuffleArray(pairs);
	const cardElems = document.querySelectorAll('.flip-card');
	cardElems.forEach((cardItem, index) => cardItem.classList.add(cardsShuffled[index]));
};

const flipCard = evt => {
	const cardTarget = evt.currentTarget;
	const compareLength = activeCards.length;
	if (compareLength >= 0 && compareLength < 2) {
		const pairClass = cardTarget.classList[1];
		activeCards.push(pairClass);
		cardTarget.classList.add('rotate');
	}
	if (compareLength === 1) {
		checkCards();
	}
};


const getSelectedCards = () => {
	const rotatedCards = getRotatedCards();
	return rotatedCards[0].classList[1] === rotatedCards[1].classList[1];
};

const checkCards = () => {
	const isPairing = getSelectedCards();
	if (isPairing) {
		setTimeout(isCorrect, timer);
	} else {
		setTimeout(isIncorrect, timer);
	}
};

const isCorrect = () => {
	const rotatedCards = getRotatedCards();
	rotatedCards.forEach(cardItem => {
		cardItem.classList.remove('rotate');
		cardItem.classList.add('correct');
		playedCards.push(cardItem.id);
		activeCards = [];
	});
	if (playedCards.length === pairs.length) {
		console.log('Has ganado');
	}
};

const isIncorrect = () => {
	const rotatedCards = getRotatedCards();
	rotatedCards.forEach(cardItem => {
		cardItem.classList.remove('rotate');
		activeCards = [];
	});
};
