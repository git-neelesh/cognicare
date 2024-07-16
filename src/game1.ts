import { randAnimalType, randHex } from "@ngneat/falso";

export default function initializeGame(): void {
    const gameArea = document?.querySelector(".gameArea") as HTMLElement;
    const btn = document.createElement("button");
    const output = document.createElement("div");
    const inWord = document.createElement("input");
    const scoreBoard = document.createElement("div");

    scoreBoard.style.color = "white";
    scoreBoard.style.backgroundColor = randHex() //"rgba(103, 146, 255)";
    scoreBoard.style.padding = "25px";

    inWord.setAttribute("type", "text");
    inWord.classList.add("myInput");
    btn.classList.add("nextBtn");

    output.style.textAlign = "center";

    btn.textContent = "START GAME!";
    output.textContent = "Click that button ";
    output.style.letterSpacing = "0";

    // Add to HTML page
    gameArea.append(output);
    gameArea.append(inWord);
    gameArea.prepend(scoreBoard);
    gameArea.append(btn);

    // Hide non-needed elements
    scoreBoard.style.display = "none";
    inWord.style.display = "none";

    console.log(btn);

    // Game start values
    const name = randAnimalType({length:5})
    console.log(name)
    const myWords: string[] = ["hi", "bird", "dog", "cat", "cow"]; // name
    interface Game {
        sel: string;
        scramble: string;
        score: number;
        incorrect: number;
        wordsLeft: number;
        played: number;
    }

    let game: Game = {
        sel: "",
        scramble: "",
        score: 0,
        incorrect: 0,
        wordsLeft: 0,
        played: myWords.length,
    };
 if (myWords.length <= 0) {
            console.log("game over");
            gameArea.innerHTML = `<div>GAME OVER</div>`;
            gameArea.innerHTML += `<div>You Got ${game.score} correct vs ${game.incorrect} incorrect out of ${game.played} words total</div>`;
        } else {
            inWord.disabled = false;
            inWord.value = "";
            inWord.style.borderWidth = "1px";
            inWord.style.borderColor = "#eee";
            scoreBoard.style.display = "block";
            inWord.style.display = "inline";
            btn.style.display = "none";
            myWords.sort(() => 0.5 - Math.random());
            game.sel = myWords.shift()!;
            game.wordsLeft = myWords.length;
            console.log(game);
            game.scramble = sorter(game.sel);

            addScore();
            output.style.fontSize = "3em";
            output.style.letterSpacing = "0.5em";
            inWord.setAttribute("maxlength", game.sel.length.toString());
            inWord.focus();
            output.textContent = `${game.scramble}`;
            console.log(game.sel, game.scramble);
        }
    // Event listener for button
    btn.addEventListener("click", (e: Event) => {
        if (myWords.length <= 0) {
            console.log("game over");
            gameArea.innerHTML = `<div>GAME OVER</div>`;
            gameArea.innerHTML += `<div>You Got ${game.score} correct vs ${game.incorrect} incorrect out of ${game.played} words total</div>`;
        } else {
            inWord.disabled = false;
            inWord.value = "";
            inWord.style.borderWidth = "1px";
            inWord.style.borderColor = "#eee";
            scoreBoard.style.display = "block";
            inWord.style.display = "inline";
            btn.style.display = "none";
            myWords.sort(() => 0.5 - Math.random());
            game.sel = myWords.shift()!;
            game.wordsLeft = myWords.length;
            console.log(game);
            game.scramble = sorter(game.sel);

            addScore();
            output.style.fontSize = "3em";
            output.style.letterSpacing = "0.5em";
            inWord.setAttribute("maxlength", game.sel.length.toString());
            inWord.focus();
            output.textContent = `${game.scramble}`;
            console.log(game.sel, game.scramble);
        }
    });

    // Event listener for input word
    inWord.addEventListener("keyup", (e: KeyboardEvent) => {
        console.log(e);
        inWord.style.borderColor = "#eee";
        inWord.style.borderWidth = "1px";
        if (inWord.value.length === game.sel.length || e.code === "Enter") {
            winChecker();
        }
    });

    function addScore(): void {
        const tempOutput = `Score : <b>${game.score}</b> vs incorrect <i>(${game.incorrect})</i> <small>${game.wordsLeft} words left</small>`;
        scoreBoard.innerHTML = tempOutput;
    }

    function winChecker(): void {
        inWord.style.borderWidth = "5px";
        if (inWord.value === game.sel) {
            console.log("correct");
            inWord.style.borderColor = "green";
            game.score++;
            inWord.disabled = true;
            btn.style.display = "block";
            btn.textContent = "Click for Next Word";
        } else {
            inWord.style.borderColor = "red";
            console.log("incorrect");
            inWord.value = "";
            inWord.focus();
            game.incorrect++;
        }
        addScore();
    }

    function sorter(val: string): string {
        let temp:any = val.split("");
        temp.sort(() => 0.5 - Math.random());
        temp = temp.join("");
        console.log(temp);
        if (val === temp) {
            console.log(val, temp);
            return sorter(val);
        }
        return temp;
    }
}
