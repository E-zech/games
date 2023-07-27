const height = 35;
const width = 35;

const snake = [5, 4, 3, 2, 1, 0];
let head = snake[0];

let isGameOver = false;
let direction = 'left';
let interval;
let intervalDelay = 400;
let random;

const rightBoundaries = [];
const leftBoundaries = [];
const divGameOver = document.querySelector(".gameOver");
const gameOverTxt = document.querySelector(".gameOverTxt");
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
let score = document.getElementById("score");
let record = document.getElementById("record");
let saveRecord;


score.innerHTML = 0;
record.innerHTML = 0;

if (localStorage.getItem("record")) {
    saveRecord = JSON.parse(localStorage.getItem("record"));
    record.innerHTML = saveRecord;
} // בודק בזיכרון המקומי אם יש מפתח בשם רקורד , אם הוא נמצא הוא מעדכן את הנתונים שלו

// גבולות ימין
for (let i = 0; i < height; i++) {
    rightBoundaries.push(i * width - 1);
}

// גבולות שמאל
for (let i = 1; i <= height; i++) {
    leftBoundaries.push(i * width);
}

const board = document.querySelector('.board');
board.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

function createBoard() {
    for (let i = 0; i < width * height; i++) {
        const div = document.createElement("div");
        board.appendChild(div);
    }

    color();
    setRandom();
}

function color() {
    const divs = board.querySelectorAll("div");

    divs.forEach(el => el.classList.remove('snake', 'head', 'up', 'right', 'down', 'left'));

    snake.forEach(num => divs[num].classList.add('snake'));

    divs[head].classList.add('head', direction);
}

window.addEventListener("keydown", ev => {
    ev.preventDefault();

    switch (ev.key) {
        case 'ArrowUp': move('up'); break;
        case 'ArrowRight': move('right'); break;
        case 'ArrowDown': move('down'); break;
        case 'ArrowLeft': move('left'); break;
        case 'Escape': clearInterval(interval); break;
    }
});

function move(dir) {
    if (isGameOver) {
        return;
    }

    const divs = board.querySelectorAll("div");

    if (dir == 'up') {
        if (direction == 'down') {
            return;
        }

        head -= width;

        if (!divs[head]) {
            gameOver();
            return;
        }
    } else if (dir == 'right') {
        if (direction == 'left') {
            return;
        }

        head--;

        if (rightBoundaries.includes(head)) {
            gameOver();
            return;
        }
    } else if (dir == 'down') {
        if (direction == 'up') {
            return;
        }

        head += width;

        if (!divs[head]) {
            gameOver();
            return;
        }
    } else if (dir == 'left') {
        if (direction == 'right') {
            return;
        }

        head++;

        if (leftBoundaries.includes(head)) {
            gameOver();
            return;
        }
    }

    if (snake.includes(head)) {
        gameOver();
        return;
    }

    direction = dir;
    snake.unshift(head);

    if (random == head) {
        const audio = document.createElement('audio');
        audio.src = "./audio/lesson5_Pebble.ogg";
        audio.volume = 0.2;
        audio.play();
        score.innerHTML = parseInt(score.innerHTML) + 10; //בכל אכילה של העבר מתווסף 10 נקודות


        setRandom();
    } else {
        snake.pop();
    }

    color();
    startAuto();
}

function easy() {
    intervalDelay = 200;
    startAuto();
    hideBtn();
}

function medium() {
    intervalDelay = 120;
    startAuto();
    hideBtn();
}

function hard() {
    intervalDelay = 75;
    startAuto();
    hideBtn();
}
function startAuto() {
    clearInterval(interval);
    interval = setInterval(() => move(direction), intervalDelay);
}

function setRandom() {
    random = Math.floor(Math.random() * (width * height));

    if (snake.includes(random)) {
        setRandom();
    } else {
        const divs = board.querySelectorAll("div");

        divs.forEach(el => el.classList.remove('blueberry'));
        divs[random].classList.add('blueberry');
    }
}

function gameOver() {
    isGameOver = true;
    clearInterval(interval);

    const audio = document.createElement('audio');
    audio.src = "./audio/lesson5_Country_Blues.ogg";
    audio.volume = 0.1;
    audio.play();

    const currentScore = parseInt(score.innerHTML);
    saveRecord = localStorage.getItem("record");

    if (!saveRecord) {
        localStorage.setItem("record", currentScore);
    } else {
        saveRecord = parseInt(saveRecord);
        if (currentScore > saveRecord) {
            localStorage.setItem("record", currentScore);
            updateRecord(currentScore);
        }
    } //אם הסכום העכשווי גדול או שווה לסכום השיא , אז סכום השיא יהיה שווה לסכום העכשווי

    divGameOver.style.display = "block";


}

function restart() {
    window.location.reload();
}

function iAgree() {
    document.querySelector(".gameStart").style.display = "none";
}

function clearLocalS() {
    localStorage.clear();
    window.location.reload();
}

function hideBtn() {
    btn1.style.visibility = "hidden";
    btn2.style.visibility = "hidden";
    btn3.style.visibility = "hidden";
}

function updateRecord(newRecord) {
    record.innerHTML = newRecord;
}