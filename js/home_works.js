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
const secondsDisplay = document.querySelector('#seconds');
const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

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

//дз3 


function delay(value, ms, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(`Ошибка при обработке: ${value}`));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

//1

delay(1, 500)
  .then(value => {
    console.log("Шаг 1:", value);

    return delay(value + 1, 500, true);
  })
  .then(value => {
    console.log("Шаг 2:", value);

    return delay(value + 1, 500);
  })
  .then(value => {
    console.log("Шаг 3:", value);
    return value;
  })
  .catch(error => {
    console.log("Поймали ошибку:", error.message);
  })
  .finally(() => {
    console.log("Цепочка завершена");
  });

//2

async function runMath() {
  try {
    const first = await delay(1, 500);
    console.log("Шаг 1:", first);

    const second = await delay(first + 1, 500, true);
    console.log("Шаг 2:", second);

    const third = await delay(second + 1, 500);
    console.log("Шаг 3:", third);
  } catch (error) {
    console.log("Поймали ошибку:", error.message);
  } finally {
    console.log("Цепочка завершена");
  }
}

runMath();

//3

async function runArray() {
  const numbers = [10, 20, 30, 40];
  const results = [];

  for (const value of numbers) {
    try {
      const shouldFail = Math.random() > 0.7;

      const result = await delay(
        value,
        500,
        shouldFail
      );

      results.push({
        value: result,
        error: null
      });
    } catch (error) {
      results.push({
        value,
        error: error.message
      });
    }
  }

  console.log(results);
  return results;
}

runArray();

//4

async function runPromiseAll() {
  try {
    const results = await Promise.all([
      delay("A", 1000),
      delay("B", 500, true),
      delay("C", 1500),
      delay("D", 700)
    ]);

    console.log("Результаты:", results);
  } catch (error) {
    console.log("Promise.all:", error.message);
  }
}

runPromiseAll();

//5

async function runPromiseAllSettled() {
  const results = await Promise.allSettled([
    delay("A", 1000),
    delay("B", 500, true),
    delay("C", 1500),
    delay("D", 700)
  ]);

  const succeeded = results
    .filter(item => item.status === "fulfilled")
    .map(item => item.value);

  const failed = results
    .filter(item => item.status === "rejected")
    .map(item => item.reason.message);

  console.log("Успешные:", succeeded);
  console.log("Ошибки:", failed);
}

runPromiseAllSettled();

//6

async function runPromiseRace() {
  try {
    const result = await Promise.race([
      delay("Полезный результат", 2000),
      delay("Таймаут", 500, true)
    ]);

    console.log("Результат:", result);
  } catch (error) {
    console.log("Гонка завершилась ошибкой:", error.message);
  }
}

runPromiseRace();

//дз4
//1
const charactersList = document.querySelector(".characters-list");

async function getCharacters() {
  try {
    const response = await fetch("../data/characters.json");

    if (!response.ok) {
      throw new Error("Не удалось загрузить characters.json");
    }

    const characters = await response.json();

    charactersList.innerHTML = "";

    characters.forEach((character) => {
      const card = document.createElement("div");
      card.classList.add("character-card");

      const photoContainer = document.createElement("div");
      photoContainer.classList.add("character-photo");

      const img = document.createElement("img");
      img.src = character.person_photo;
      img.alt = character.name;
      img.loading = "lazy";

      // Если фотография не загрузилась
      img.addEventListener("error", () => {
        img.style.display = "none";
        photoContainer.textContent = "Фото недоступно";
      }, { once: true });

      const name = document.createElement("h2");
      name.textContent = character.name;

      const age = document.createElement("p");
      age.textContent = `Возраст: ${character.age}`;

      photoContainer.append(img);
      card.append(photoContainer, name, age);

      charactersList.append(card);
    });

  } catch (error) {
    console.error("Ошибка:", error);

    charactersList.textContent =
      "Не удалось загрузить персонажей. Проверь JSON и запусти проект через локальный сервер.";
  }
}

getCharacters();
//2
fetch('../data/bio.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log('Ошибка:', error);
    });

//дз5
const form = document.querySelector("#registrationForm");
const message = document.querySelector("#message");
const result_1 = document.querySelector("#result_1");
const submitBtn = document.querySelector("#submitBtn");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.textContent = "";
    result.textContent = "";

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const password = form.elements.password.value;
    const age = Number(form.elements.age.value);
    const gender = form.elements.gender.value;
    const consent = form.elements.consent.checked;

    if (name.length < 2 || name.length > 100) {
        message.textContent = "Имя должно содержать от 2 до 100 символов.";
        return;
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
        message.textContent = "Введите корректный возраст от 1 до 120 лет.";
        return;
    }

    if (age < 18) {
        message.textContent = "Отправка запрещена: вам должно быть не менее 18 лет.";
        return;
    }

    if (!consent) {
        message.textContent = "Необходимо согласиться на обработку данных.";
        return;
    }

    if (password.length < 8 || password.length > 128) {
        message.textContent = "Пароль должен содержать от 8 до 128 символов.";
        return;
    }

    const requestType = form.querySelector(
        'input[name="requestType"]:checked'
    ).value;

    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    try {
        let response;

        if (requestType === "json") {

            const userData = {
                name: name,
                email: email,
                password: password,
                age: age,
                gender: gender,
                consent: consent
            };

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

        } else {

            const formData = new FormData(form);

            formData.delete("requestType");
            formData.set("age", String(age));

            response = await fetch(API_URL, {
                method: "POST",
                body: formData
            });
        }

        if (!response.ok) {
            throw new Error(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }

        const responseText = await response.text();

        if (!responseText.trim()) {
            throw new Error("Сервер вернул пустой ответ.");
        }
        let data;
        try {
            data = JSON.parse(responseText);
        } catch {
            throw new Error("Сервер вернул некорректный JSON.");
        }
        if (data && typeof data === "object" && "password" in data) {
            data.password = "[скрыто]";
        }
        message.textContent = "Данные успешно отправлены!";
        result_1.textContent = JSON.stringify(data, null, 2);
        console.log("Ответ сервера:", data);
    } catch (error) {
        if (error instanceof TypeError) {
            message.textContent =
                "Ошибка сети. Проверьте подключение к интернету.";
        } else {
            message.textContent = error.message ||
                "Произошла неизвестная ошибка.";
        }
        console.error("Ошибка запроса:", error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить";
    }
});