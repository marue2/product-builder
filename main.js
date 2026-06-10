document.addEventListener('DOMContentLoaded', () => {
    const numbersDisplay = document.getElementById('numbers-display');
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const setCountSelect = document.getElementById('set-count');

    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton(savedTheme);
    }

    function updateThemeButton(theme) {
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '라이트 모드' : '다크 모드';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton(newTheme);
        });
    }

    // Lotto Generation Logic
    function getSecureRandom(max) {
        if (window.crypto && window.crypto.getRandomValues) {
            const array = new Uint32Array(1);
            window.crypto.getRandomValues(array);
            return (array[0] % max) + 1;
        }
        return Math.floor(Math.random() * max) + 1;
    }

    function generateSingleSet() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(getSecureRandom(45));
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function getNumberColor(number) {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaaaaa'; // Gray
        return '#b0d840'; // Green
    }

    function renderNumbers() {
        const count = parseInt(setCountSelect.value) || 1;
        numbersDisplay.innerHTML = '';

        for (let i = 0; i < count; i++) {
            const set = generateSingleSet();
            const setContainer = document.createElement('div');
            setContainer.classList.add('number-set');
            
            set.forEach(num => {
                const circle = document.createElement('div');
                circle.classList.add('number');
                circle.textContent = num;
                circle.style.backgroundColor = getNumberColor(num);
                setContainer.appendChild(circle);
            });

            numbersDisplay.appendChild(setContainer);
        }
    }

    // Copy to Clipboard
    async function copyToClipboard() {
        const sets = document.querySelectorAll('.number-set');
        if (sets.length === 0) return;

        let textToCopy = '로또 행운의 번호 결과:\n';
        sets.forEach((set, index) => {
            const nums = Array.from(set.querySelectorAll('.number')).map(n => n.textContent);
            textToCopy += `${index + 1}세트: ${nums.join(', ')}\n`;
        });

        try {
            await navigator.clipboard.writeText(textToCopy);
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '복사 완료!';
            copyBtn.style.backgroundColor = '#2ecc71';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('복사에 실패했습니다.');
        }
    }

    // Event Listeners
    if (generateBtn) {
        generateBtn.addEventListener('click', renderNumbers);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', copyToClipboard);
    }

    // Initialization
    initTheme();
    renderNumbers();
});