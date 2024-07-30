let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let Level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

document.querySelector("body").addEventListener("keypress", function () {
    if (!started) {
        started = true;
        h2.innerText = `Level ${Level}`;
        levelup();
    }
});

function levelup() {
    userSeq = [];
    Level++;
    h2.innerText = `Level ${Level}`;
    let randindx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[randindx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function checkans(indx) {
    if (userSeq[indx] === gameSeq[indx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        if (Level > highestScore) {
            highestScore = Level;
            localStorage.setItem("highestScore", highestScore);
            h2.innerHTML = `Congrats!! You got the highest score! Your score was <b>${Level}</b>,<br>Press any key to start again`;
            triggerExplosionEffect();
        } else {
            h2.innerHTML = `GAME OVER! Your score was <b>${Level}</b>, Highest Score is <b>${highestScore}</b>,<br>Press any key to start`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () { document.querySelector("body").style.backgroundColor = "white" }, 150);
        showGameOverEffect();
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);
    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    Level = 0;
}

function showGameOverEffect() {
    document.querySelector(".content").classList.add("blur");
    document.getElementById("overlay").style.display = "block";
    setTimeout(function () {
        document.querySelector(".content").classList.remove("blur");
        document.getElementById("overlay").style.display = "none";
    }, 2000);
    document.getElementById("gameOverSound").play();
}
function triggerExplosionEffect() {
    let explosion = document.getElementById("explosion");
    let explosionSound = document.getElementById("explosionSound");
    explosion.style.display = "block";
    explosionSound.play().catch(error => console.log('Audio play error:', error));
    setTimeout(function () {
        explosion.style.display = "none";
    }, 1000);
}