const numbersContainer = document.querySelector('.numbers-container');
const generateBtn = document.getElementById('generate-btn');

function generateNumbers() {
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const circle = document.createElement('div');
        circle.classList.add('number');
        circle.textContent = number;
        circle.style.backgroundColor = getNumberColor(number);
        numbersContainer.appendChild(circle);
    });
}

function getNumberColor(number) {
    if (number <= 10) {
        return '#fbc400'; // Yellow
    } else if (number <= 20) {
        return '#69c8f2'; // Blue
    } else if (number <= 30) {
        return '#ff7272'; // Red
    } else if (number <= 40) {
        return '#aaaaaa'; // Gray
    } else {
        return '#b0d840'; // Green
    }
}

generateBtn.addEventListener('click', generateNumbers);

// Initial generation
generateNumbers();