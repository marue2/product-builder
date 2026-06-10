document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const alarmerForm = document.getElementById('alarmer-form');
    const enableNotifBtn = document.getElementById('enable-notif-btn');
    const notifPrompt = document.getElementById('notif-prompt');

    // Analysis Elements
    const analysisCard = document.getElementById('analysis-card');
    const analysisTitle = document.getElementById('analysis-title');
    const analysisScore = document.getElementById('analysis-score');
    const analysisPrice = document.getElementById('analysis-price');
    const analysisMarket = document.getElementById('analysis-market');
    const analysisProfit = document.getElementById('analysis-profit');
    const analysisText = document.getElementById('analysis-text');

    // Search Calculator Elements
    const complexSearch = document.getElementById('complex-search');
    const complexList = document.getElementById('complex-list');
    const searchCalcBtn = document.getElementById('search-calc-btn');
    const calcLoader = document.getElementById('calc-loader');
    const calcResult = document.getElementById('calc-result');
    
    const resName = document.getElementById('res-name');
    const resRegion = document.getElementById('res-region');
    const resPrice = document.getElementById('res-price');
    const resMarket = document.getElementById('res-market');
    const resProfit = document.getElementById('res-profit');
    const resGrade = document.getElementById('res-grade');
    const naverLink = document.getElementById('naver-link');

    let currentDate = new Date(2026, 5, 1); // 2026년 6월 기준
    let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');

    // Datalist 채우기
    function initSearchList() {
        if (complexList && typeof MARKET_DATABASE !== 'undefined') {
            MARKET_DATABASE.forEach(item => {
                const option = document.createElement('option');
                option.value = item.name;
                complexList.appendChild(option);
            });
        }
    }

    function initNotifications() {
        if (!("Notification" in window)) {
            if (notifPrompt) notifPrompt.style.display = 'none';
            return;
        }
        if (Notification.permission === "granted") {
            if (notifPrompt) notifPrompt.style.display = 'none';
        }
        if (enableNotifBtn) {
            enableNotifBtn.addEventListener('click', async () => {
                const permission = await Notification.requestPermission();
                if (permission === "granted") {
                    alert("알림 설정이 완료되었습니다!");
                    if (notifPrompt) notifPrompt.style.display = 'none';
                }
            });
        }
    }

    function toggleReminder(title, date) {
        const id = `${title}-${date}`;
        if (reminders.includes(id)) {
            reminders = reminders.filter(r => r !== id);
        } else {
            reminders.push(id);
        }
        localStorage.setItem('reminders', JSON.stringify(reminders));
        renderCalendar();
    }

    function showAnalysis(event) {
        if (!event.price) {
            analysisCard.style.display = 'none';
            return;
        }

        analysisTitle.textContent = event.title;
        analysisScore.textContent = event.score || '-';
        analysisPrice.textContent = (event.price / 10000).toFixed(1) + '억';
        analysisMarket.textContent = (event.marketPrice / 10000).toFixed(1) + '억';
        analysisProfit.textContent = ((event.marketPrice - event.price) / 10000).toFixed(1) + '억';
        analysisText.textContent = event.analysis;

        analysisCard.style.display = 'block';
        analysisCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearDisplay.textContent = `${year}년 ${month + 1}월`;

        const days = ['일', '월', '화', '수', '목', '금', '토'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('calendar-day-header');
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            
            const dayNum = document.createElement('span');
            dayNum.classList.add('day-number');
            dayNum.textContent = d;
            dayCell.appendChild(dayNum);

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const events = SUBSCRIPTION_DATA.filter(e => e.date === dateStr);

            events.forEach(event => {
                const id = `${event.title}-${dateStr}`;
                const isReminded = reminders.includes(id);

                const eventTag = document.createElement('div');
                eventTag.classList.add('event-tag', event.type);
                eventTag.innerHTML = `
                    <span>${event.title}</span>
                    <span class="remind-me">${isReminded ? '🔔' : '🔕'}</span>
                `;
                
                eventTag.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showAnalysis(event);
                });

                const remindBtn = eventTag.querySelector('.remind-me');
                remindBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    toggleReminder(event.title, dateStr);
                });

                dayCell.appendChild(eventTag);
            });

            calendarGrid.appendChild(dayCell);
        }
    }

    // Automatic Search Calculator Logic
    if (searchCalcBtn) {
        searchCalcBtn.addEventListener('click', () => {
            const keyword = complexSearch.value.trim();
            if (!keyword) {
                alert('단지명을 입력하거나 목록에서 선택해주세요.');
                return;
            }

            // 검색 중 효과
            calcResult.style.display = 'none';
            calcLoader.style.display = 'block';

            setTimeout(() => {
                const found = MARKET_DATABASE.find(item => item.name.includes(keyword));
                calcLoader.style.display = 'none';

                if (found) {
                    resName.textContent = found.name;
                    resRegion.textContent = found.region;
                    resPrice.textContent = (found.price / 10000).toFixed(1) + '억';
                    resMarket.textContent = (found.market / 10000).toFixed(1) + '억';
                    
                    const profit = (found.market - found.price) / 10000;
                    resProfit.textContent = profit.toFixed(1) + '억';

                    // 등급 계산
                    const ratio = ((found.market - found.price) / found.price) * 100;
                    let grade = '보통';
                    let color = '#95a5a6';
                    if (ratio >= 50) { grade = '매우 높음 (S)'; color = '#e74c3c'; }
                    else if (ratio >= 30) { grade = '높음 (A)'; color = '#f39c12'; }
                    else if (ratio >= 15) { grade = '양호 (B)'; color = '#2ecc71'; }

                    resGrade.textContent = grade;
                    resGrade.style.backgroundColor = color;
                    
                    naverLink.href = `https://land.naver.com/search/search.naver?query=${encodeURIComponent(found.name)}`;
                    calcResult.style.display = 'flex';
                } else {
                    alert('데이터를 찾을 수 없습니다. 정확한 단지명을 입력해주세요.');
                }
            }, 800); // 0.8초 딜레이로 검색 시뮬레이션
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    if (alarmerForm) {
        alarmerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('user-email').value;
            alert(`${email}님, 청약 알리미 신청이 완료되었습니다!`);
            alarmerForm.reset();
        });
    }

    initSearchList();
    initNotifications();
    renderCalendar();
});