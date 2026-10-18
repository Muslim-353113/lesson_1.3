//дз1
//1
const gmailInput = document.querySelector("#gmail_input");
const checkButton = document.querySelector("#gmail_button");
const result = document.querySelector("#gmail_result")

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

checkButton.addEventListener("click", () => {
    const gmail = gmailInput.value.trim();

    if (gmailRegex.test(gmail)) {
        result.style.color = 'green'
        result.textContent = 'Gmail валидный'
    } else {
        result.style.color = 'red'
        result.textContent = 'Gmail невалидный'
    }
});

//2.1
document.addEventListener('DOMContentLoaded', () => {
    const parentBlock = document.querySelector('.parent_block');
    const childBlock = document.querySelector('.child_block');

    if (parentBlock && childBlock) {
        let positionX = 0;
        let positionY = 0;
        let direction = 'right';

        const speed = 2;

        const moveChild = () => {
            const maxX = parentBlock.clientWidth - childBlock.offsetWidth;
            const maxY = parentBlock.clientHeight - childBlock.offsetHeight;

            if (maxX <= 0 || maxY <= 0) return;

            if (direction === 'right') {
                positionX += speed;

                if (positionX >= maxX) {
                    positionX = maxX;
                    direction = 'down';
                }
            } else if (direction === 'down') {
                positionY += speed;

                if (positionY >= maxY) {
                    positionY = maxY;
                    direction = 'left';
                }
            } else if (direction === 'left') {
                positionX -= speed;

                if (positionX <= 0) {
                    positionX = 0;
                    direction = 'up';
                }
            } else if (direction === 'up') {
                positionY -= speed;

                if (positionY <= 0) {
                    positionY = 0;
                    direction = 'right';
                }
            }

            childBlock.style.left = `${positionX}px`;
            childBlock.style.top = `${positionY}px`;
        };

        setInterval(moveChild, 10);
    }

//дз2
//1
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

if (secondsDisplay && startButton && stopButton && resetButton) {
    let seconds = 0;
    let timerId = null;

    const renderSeconds = () => {
        secondsDisplay.textContent = seconds;
    };

    const startTimer = () => {
        if (timerId !== null) return;
        timerId = setInterval(() => {
            seconds += 1;
            renderSeconds();
        }, 1000);
    };

    const stopTimer = () => {
        if (timerId !== null) {
            clearInterval(timerId);
            timerId = null;
        }
    };

    const resetTimer = () => {
        stopTimer();
        seconds = 0;
        renderSeconds();
    };

    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);
    resetButton.addEventListener('click', resetTimer);

    renderSeconds();
}


//2

const slides = document.querySelectorAll('.slide');

if (slides.length > 1) {
    let currentSlide = 0;

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    };

    showSlide(currentSlide);

    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}
});
