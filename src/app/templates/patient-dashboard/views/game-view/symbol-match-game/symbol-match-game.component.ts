import { Component, OnInit } from '@angular/core';
interface Card {
  symbol: string;
  flipped: boolean;
  matched: boolean;
  wrong: boolean;
}

@Component({
  selector: 'app-symbol-match-game',
  templateUrl: './symbol-match-game.component.html',
  styleUrls: ['./symbol-match-game.component.scss'],
})
export class SymbolMatchGameComponent  implements OnInit {
symbols: string[] = ['heart', 'star', 'home', 'planet', 'pizza', 'paw', 'car', 'bicycle'];
  cards: Card[] = [];
  firstCard: Card | null = null;
  secondCard: Card | null = null;
  preventClick: boolean = false;
  gameOver: boolean = false;


  constructor() {}

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.cards = [];
    this.gameOver = false;
    this.symbols.forEach((symbol) => {
      this.cards.push({ symbol, flipped: false, matched: false, wrong: false });
      this.cards.push({ symbol, flipped: false, matched: false, wrong: false });
    });
    this.shuffleArray(this.cards);
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(card: Card) {
    if (this.preventClick || card.flipped || card.matched) return;

    card.flipped = true;
    if (!this.firstCard) {
      this.firstCard = card;
    } else if (!this.secondCard) {
      this.secondCard = card;
      this.preventClick = true;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    if (this.firstCard && this.secondCard) {
      if (this.firstCard.symbol === this.secondCard.symbol) {
        this.firstCard.matched = true;
        this.secondCard.matched = true;
        this.resetCards();
        this.checkGameOver();
      } else {
        this.firstCard.wrong = true;
        this.secondCard.wrong = true;
        setTimeout(() => {
          if (this.firstCard) {
            this.firstCard.flipped = false;
            this.firstCard.wrong = false;
          }
          if (this.secondCard) {
            this.secondCard.flipped = false;
            this.secondCard.wrong = false;
          }
          this.resetCards();
        }, 1000);
      }
    }
  }

  resetCards() {
    this.firstCard = null;
    this.secondCard = null;
    this.preventClick = false;
  }

  checkGameOver() {
    this.gameOver = this.cards.every(card => card.matched);
  }
}
