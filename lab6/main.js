const ballsCount = 15;
const ballSize = 20;
const minDistance = 200;
const minSpeed = 0;
const maxSpeed = 1;
const balls = [];
let animationId;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function randomSpeed() {
    return Math.random() * (maxSpeed - minSpeed) + minSpeed;
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xSpeed = randomSpeed();
        this.ySpeed = randomSpeed();
    }

    display() {
        ctx.strokeStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x, this.y, ballSize, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
    }

    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
        }
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.xSpeed = randomSpeed();
        this.ySpeed = randomSpeed();
    }
}

function drawLine(x1, y1, x2, y2) {
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawBalls(balls) {
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].display();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBalls(balls);

    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            const distance = Math.hypot(balls[i].x - balls[j].x, balls[i].y - balls[j].y);

            if (distance <= minDistance) {
                drawLine(balls[i].x, balls[i].y, balls[j].x, balls[j].y);
            }
        }
    }

    animationId = requestAnimationFrame(draw);
}

function toggleAnimation() {
    const toggleButton = document.getElementById('toggleButton');

    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        toggleButton.textContent = 'Start Animation';
    } else {
        draw();
        toggleButton.textContent = 'Stop Animation';
    }
}

function resetBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].reset();
        if(!animationId){
            draw();
            toggleButton.textContent = 'Stop Animation';
        }
    }
}

for (let i = 0; i < ballsCount; i++) {
    balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));
}