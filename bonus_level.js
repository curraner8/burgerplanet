let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let request_id;
let myScore;


let weight1 = {
    x : randint(230, 290),
    y : randint(200, 300),
    width : 12,
    height : 12,
}
let obstacle1 = {
    x : 30,
    y : 100,
    width : 15,
    height : 250
}
let obstacle2 = {
    x : 150,
    y : 100,
    width : 15,
    height : 250,
}
let obstacle3 = {
    x : 300,
    y : 100,
    width : 15,
    height : 250,
}
let obstacle4 = {
    x : 450,
    y : 100,
    width : 15,
    height : 250,
}
let o5 = {
    x : 100,
    y : 0,
    width : 15,
    height : 250,
}
let o6 = {
    x : 220,
    y : 0,
    width : 15,
    height : 250
}
let o7 = {
    x : 375,
    y : 0,
    width : 15,
    height : 250,
}
let o8 = {
    x : 0,
    y : 0,
    width : 1,
    height : 400,
}
let o9 = {
    x : 0,
    y : 0,
    width : 600,
    height : 1,
}
let o10 = {
    x : 0,
    y : 319,
    width : 600,
    height : 1,
}
let burgers = [];
let player = {
    x : 3,
    y : 150,
    size : 5,
    xChange : 5,
    yChange : 5,
}

let xhttp;
let score = 0;

let moveLeft = false;
let moveRight = false;
let moveUp = false; 
let moveDown = false;

let weightImage = new Image();

let tilesPerRow = 6;
let tileSize = 16;



document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    draw();
}

function draw() {
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);
    
    if (burgers.length < 10) {
        let b = {
            x : randint(0, canvas.width),
            y : 0,
            size : randint(20, 30),
            xChange : 0,
            yChange : randint(0, 150)
        };
        burgers.push(b);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(weight1.x, weight1.y, weight1.width, weight1.height);
    context.fillStyle = "purple";
    context.fillRect(obstacle1.x, obstacle1.y, obstacle1.width, obstacle1.height);
    context.fillStyle = "purple";
    context.fillRect(obstacle2.x, obstacle2.y, obstacle2.width, obstacle2.height);
    context.fillStyle = "purple";
    context.fillRect(obstacle3.x, obstacle3.y, obstacle3.width, obstacle3.height);
    context.fillStyle = "purple";
    context.fillRect(obstacle4.x, obstacle4.y, obstacle4.width, obstacle4.height);
    context.fillStyle = "purple";
    context.fillRect(o5.x, o5.y, o5.width, o5.height);
    context.fillStyle = "purple";
    context.fillRect(o6.x, o6.y, o6.width, o6.height);
    context.fillStyle = "purple";
    context.fillRect(o7.x, o7.y, o7.width, o7.height);
    context.fillStyle = "brown";
    context.fillRect(o8.x, o8.y, o8.width, o8.height);
    context.fillStyle = "brown";
    context.fillRect(o9.x, o9.y, o9.width, o9.height);
    context.fillStyle = "brown";
    context.fillRect(o10.x, o10.y, o10.width, o10.height);
    context.fillStyle = "cyan";
    context.fillRect(player.x, player.y, player.size, player.size);
    context.fillStyle = "orange";
    for (let b of burgers) {
        context.fillRect(b.x, b.y, b.size, b.size);
    }
    if (player.x + player.size >= canvas.width) {
        stop("You win! -- ");
        return;
    }

    for (let b of burgers) {
        if (player_collides(b)) {
            EatsBurger();
            break;
        }
            
    }
    for (let b of burgers) {
        if (b.y + b.size > 350) {
            b.x = randint(0, canvas.width)
            b.y = 0;
        } else {
            b.x = b.x + b.xChange;
            b.y = b.y + b.yChange;
        }
    }
    if (moveRight) {
        player.x = player.x + player.xChange;
        player.frameY = 2;
    }
    if (moveUp) {
        player.y = player.y - player.yChange;
        player.frameY = 1;
    }
    if (moveDown) {
        player.y = player.y + player.yChange;
        player.frameY = 1;
    }
    if (moveLeft) {
        player.x = player.x - player.yChange;
        player.frameY = 1;
    }

    score = score+1

    if (hits_pillar(weight1)) {
        UsesWeight();
        
    }

    if (hits_pillar(obstacle1)) {
        stop("You Died --  ");
        return;
    }

    if (hits_pillar(obstacle2)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(obstacle3)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(obstacle4)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o5)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o6)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o7)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o8)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o9)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(o10)) {
        stop("You Died -- ");
        return;
    }

    badGuy1.x +=16
    if (badGuy1.x >= canvas.width) {
        badGuy1 ={
            x : 0,
            y : randint(0, 130),
            width : 15,
            height : 15,
        }
    }
    badGuy2.x +=14
    if (badGuy2.x >= canvas.width) {
        badGuy2 ={
            x : 0,
            y : randint(170, 300),
            width : 15,
            height : 15,
        }
    }

    if (hits_pillar(badGuy1)) {
        stop("You Died -- ");
        return;
    }

    if (hits_pillar(badGuy2)) {
        stop("You Died -- ");
        return;
    }





    updateGameArea();
}

function randint(min, max) {
    return Math.round(Math.random() * (max-min)) +  min;
}

function activate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    }
}

function deactivate(event) {
    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

function load_assets(assets, callback) {
    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets ===0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

function player_collides(b) {
    if (player.x + player.size < b.x ||
        b.x + b.size < player.x ||
        player.y > b.y + b.size ||
        b.y > player.y + player.size) {
        return false;
    } else {
        return true;
    }
}

function hits_pillar(a) {
    if (player.x + player.size < a.x ||
        a.x + a.width < player.x ||
        player.y > a.y + a.height ||
        a.y > player.y + player.size) {
        return false;
    } else {
        return true;
    }
}

function stop(outcome) {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);
    let outcome_element = document.querySelector("#outcome");
    outcome_element.innerHTML = outcome + " Score " + score;

    let data = new FormData();
    data.append("score", score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "/store_score", true);
    xhttp.send(data);
}

function handle_response() {
    if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
            if (xhttp.responseText === "success") {
                console.log("Yes")
            } else {
                console.log("No")
            }
        }
    }
}

function EatsBurger() {
    player.size = player.size + 1;
    if (player.xChange <= 0.5) {
        player.xChange = 0.5;
    } else {
        player.xChange = player.xChange - 0.3;
    }
    if (player.yChange <= 0.5) {
        player.yChange = 0.5;
    } else {
        player.yChange = player.yChange - 0.3;
    }
    if (player.size >= 80) {
        stop("You Lose. You Got Too Fat");
        return;

    }
}

function UsesWeight() {
    player.size = player.size - 1;
    if (player.xChange >= 5) {
        player.xChange = 5;
    } else {
        player.xChange = player.xChange + 0.4;
    }
    if (player.yChange >= 5) {
        player.yChange = 5;
    } else {
        player.yChange = player.yChange + 0.4
    } if (player.size <= 5) {
        player.size = 5
    }
}

function chaserMovement() {
   if (chaser.x < canvas.width) {
    chaser.x += 1
   }
      
}

//for score count
function component (width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        context = myGameArea.context;
        if (this.type == "text") {
            context.font = this.width + " " + this.height;
            context.fillStyle = color;
            context.fillText(this.text, this.x, this.y);
        } else {
            context.fillStyle = color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

