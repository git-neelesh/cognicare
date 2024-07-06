type GameValues = {
  cur: string;
  solution: string[];
  correct: number;
  incorrect: number;
  total: number;
};

type DomElements = {
  gameArea?: HTMLElement | null;
  score?: HTMLElement | null;
  btn?: HTMLElement | null;
  hiddenWord?: HTMLElement | null;
  letters?: HTMLElement | null;
};

export const Hangman = (function () {
  const gameValues: GameValues = { cur: '', solution: [], correct: 0, incorrect: 0, total: 0 };
  const domEle: any = {};
  const myWords: string[] = ['learn javascript', 'learn html', 'learn css'];

  function init(): void {
    //select the DOM objects
    domEle.gameArea = document.querySelector('.hangman');
    if (domEle.gameArea) {
      domEle.score = createElements('div', domEle.gameArea, 'score');
      domEle.btn = createElements('button', domEle.gameArea, 'Start Game');
      domEle.hiddenWord = createElements('div', domEle.gameArea, 'secret words');
      domEle.letters = createElements('div', domEle.gameArea, 'letters');
      domEle.btn.classList.add('hangman')
      domEle.letters.classList.add('letters-flex')
      domEle.hiddenWord.classList.add('letters-flex')
      domEle.score.classList.add('score')
      if (domEle.score && domEle.letters && domEle.hiddenWord && domEle.btn) {
        domEle.score.style.display = 'none';
        domEle.letters.style.display = 'none';
        domEle.hiddenWord.textContent = 'Click the button to start the hangman game';
        // domEle.btn.addEventListener('click', startGame);
        startGame()
      }
    }
  }

  function startGame(): void {
    if (domEle.btn) {
      domEle.btn.style.display = 'none';
    }
    if (myWords.length > 0) {
      myWords.sort(() => 0.5 - Math.random());
      gameValues.total = 0;
      gameValues.correct = 0;
      gameValues.incorrect = 0;
      gameValues.cur = myWords.shift() || '';
      gameValues.solution = gameValues.cur.split('');

      if (domEle.score && domEle.letters) {
        domEle.score.style.display = 'block';
        domEle.letters.style.display = 'block';
      }
      buildBoard();
      scoreBoard();
    }
  }

  function scoreBoard(): void {
    let output = `${gameValues.total} letters Found(${gameValues.correct})  missed(${gameValues.incorrect})`;
    if (domEle.score) {
      domEle.score.innerHTML = output;
    }

    if (gameValues.total === gameValues.correct) {
      gameOver();
    }
  }

  function gameOver(): void {
    if (domEle.letters && domEle.btn) {
      if (myWords.length > 0) {
        domEle.letters.style.display = 'none';
        domEle.btn.style.display = 'inline-block';
        domEle.btn.textContent = 'Next Round';
      } else {
        domEle.letters.innerHTML = 'You solved all the words<br>GAME OVER!!';
      }
    }

    let output = `You found all ${gameValues.total} letters with ${gameValues.incorrect} missed`;
    if (domEle.score) {
      domEle.score.innerHTML = output;
    }
  }

  function checkLetters(val: string): void {
    const solLetters = document.querySelectorAll('.boxE');
    let foundChecker = 0;
    solLetters.forEach((el) => {
      const letter = (el as any).dataset.letter;
      if (letter && val === letter.toUpperCase()) {
        el.textContent = letter.toUpperCase();
        foundChecker++;
      }
    });

    if (foundChecker !== 0) {
      gameValues.correct += foundChecker;
    } else {
      gameValues.incorrect++;
    }
    scoreBoard();
  }

  function buildBoard(): void {
    if (domEle.letters && domEle.hiddenWord) {
      domEle.letters.innerHTML = '';
      domEle.hiddenWord.innerHTML = '';
      gameValues.solution.forEach((lett, i) => {
        let div = createElements('div', domEle.hiddenWord!, i%2 === 0 ? lett: '-');
        div.classList.add('boxE');
        (div as any).dataset.letter = lett;
        if (lett === ' ') {
          div.style.borderColor = 'white';
          div.textContent = '-';
        } else {
          gameValues.total++;
        }
      });

      for (let i = 0; i < 26; i++) {
        let temp = String.fromCharCode(65 + i);
        let div = createElements('div', domEle.letters!, temp);
        div.style.cursor = 'grab';
        div.classList.add('box');
        const checker = function (e: MouseEvent): void {
          checkLetters(temp);
          div.style.backgroundColor = '#ddd';
          div.style.cursor = 'default';
          div.classList.remove('box');
          div.classList.add('boxD');
          div.removeEventListener('click', checker);
        };
        div.addEventListener('click', checker);
      }
    }
  }

  function createElements(val: string, parentEle: HTMLElement, output: string): HTMLElement {
    let temp = document.createElement(val);
    parentEle.append(temp);
    temp.textContent = output;
    return temp;
  }

  return {
    init: init
  };
})();

