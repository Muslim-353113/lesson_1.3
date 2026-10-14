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

//2
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let position = 0;

function moveBlock() {
    const maxPosition = parentBlock.clientWidth - childBlock.offsetWidth;

    if (position < maxPosition) {
        position++;

        childBlock.style.left = `${position}px`;

        setTimeout(moveBlock, 10);
    }
}

moveBlock();