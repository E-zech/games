let amount = 15;    // the size of the board
let numbers = [];   // the numbers on the board
let counter = 1; // the number of unsuccessfull tries
let timer = 0;   // timer
let currentPlayer = 1;  // the current player 
const optional = document.querySelector("#optional");
const players = document.querySelector("#container");
const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const buttonSmall = document.querySelector(".small");
const buttonMedium = document.querySelector(".medium");
const buttonLarge = document.querySelector(".large");
const boardChoose = document.querySelector(".toggle");
const board = document.querySelector(".board");
const divWhoWon = document.getElementById("winningDiv");
const audio = document.createElement('audio');
const audioWin = document.createElement('audio');
audio.src = "./audio/flip.wav";
audioWin.src = "./audio/win.wav";
audio.volume = 0.5;
audioWin.volume = 0.6;

let p1counter = 0;
let p2counter = 0;



board.style.gridTemplateColumns = `repeat(6, 1fr)`;   // the grid template for the board
player1.classList.add("myTurn");   // show the player turn by using class "myTurn"
players.style.display = "none";    //at first hide the 2 players divs

optional.style.display = "none";  // at last hide the timer and the number of tries


let timerInterval = setInterval(() => {
    timer++;

    const date = new Date(timer * 1000);
    const m = date.getMinutes();
    const s = date.getSeconds();
    document.querySelector(".timer").innerHTML = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`;
}, 1000);


function sizeSmall() {
    amount = 9;
    reset();
}

function sizeMedium() {
    amount = 12;
    reset();
}

function sizeLarge() {
    amount = 15;
    reset();
}

function reset() {
    board.innerHTML = '';
    createBoard();
    timer = 0;
    counter = 1;
    buttonSmall.style.display = "none";
    buttonMedium.style.display = "none";
    buttonLarge.style.display = "none";

}

function createBoard() {
    board.classList.add("activeBoard");
    for (let i = 1; i <= amount; i++) {
        numbers.push(i, i);
    }

    for (let i = 1; i <= amount * 2; i++) {
        const rand = Math.floor(Math.random() * numbers.length);
        const div = document.createElement("div");
        div.innerHTML = `<span class="hide">${numbers[rand]}</span>`;
        board.appendChild(div);
        numbers.splice(rand, 1);

        div.addEventListener("click", ev => {
            audio.play();
            const cards = board.querySelectorAll(".showing");

            if (ev.target.classList.contains('hidden')) {
                return;
            }

            if (cards.length == 2) {
                return;
            }

            ev.target.classList.add("showing");
            board.querySelectorAll("cheat").forEach(elem => elem.classList.remove("cheat"));
            const elements = board.querySelectorAll("div:not(.showing)")

            for (const elem of elements) {
                if (elem.textContent == ev.target.textContent) {
                    elem.classList.add("cheat");
                    break;
                }
            }

            check();
        });
    }

}

function check() {
    const cards = board.querySelectorAll(".showing");

    if (cards.length == 2) {
        const first = cards[0];
        const last = cards[1];


        if (first.textContent == last.textContent) {
            setTimeout(() => {
                first.classList.remove("showing");
                last.classList.remove("showing");

                first.classList.add("hidden");
                last.classList.add("hidden");

                checkIsComplete();
            }, 1000);

        } else {
            document.querySelector(".counter").innerHTML = counter;
            counter++;

            setTimeout(() => {
                first.classList.remove("showing");
                last.classList.remove("showing");
                if (currentPlayer == 1) {
                    player1.classList.remove("myTurn");
                    player2.classList.add("myTurn");
                    currentPlayer = 2;
                } else if (currentPlayer == 2) {
                    player2.classList.remove("myTurn");
                    player1.classList.add("myTurn");
                    currentPlayer = 1;
                }

            }, 1500)
        }
    }
}

function checkIsComplete() {
    const cards = board.querySelectorAll("div:not(.hidden)");

    if (!cards.length) {
        clearInterval(timerInterval);
        divWhoWon.style.display = "flex";
        if (currentPlayer == 1) {
            divWhoWon.innerHTML = `${player1.innerHTML} WON !`;
        } else {
            divWhoWon.innerHTML = `${player2.innerHTML} WON !`;
        }
        audioWin.play();
        confetti({
            particleCount: 100,
            spread: 70,
            decay: 0.9,
            origin: { y: 0.6 }
        });

        setInterval(() => {
            window.location.reload();
        }, 2500);

    }
}

function showOptional() {
    optional.style.display = '';
}

function twoPlayers() {
    const player1Input = prompt("player 1 enter your name please");
    const player2Input = prompt("player 2 enter your name please");

    player1.innerHTML = player1Input;
    player2.innerHTML = player2Input;

    players.style.display = '';
    reset();

}


function chooseSize() {

    buttonSmall.style.display = "inline-block";
    buttonMedium.style.display = "inline-block";
    buttonLarge.style.display = "inline-block";
}






