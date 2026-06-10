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
    const analysisUnits = document.getElementById('analysis-units');
    const analysisStructure = document.getElementById('analysis-structure');
    const analysisCommunity = document.getElementById('analysis-community');
    const analysisSchool = document.getElementById('analysis-school');
    const analysisTransport = document.getElementById('analysis-transport');
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

    // 분석 카드와 시세차익 계산 결과를 통합하여 보여주는 함수
    function showIntegratedAnalysis(event) {
        if (!event.price) {
            analysisCard.style.display = 'none';
            calcResult.style.display = 'none';
            return;
        }

        // 1. 단지 상세 분석 카드 업데이트
        analysisTitle.textContent = event.title;
        analysisScore.textContent = event.score || '-';
        analysisPrice.textContent = (event.price / 10000).toFixed(1) + '억';
        analysisMarket.textContent = (event.marketPrice / 10000).toFixed(1) + '억';
        analysisProfit.textContent = ((event.marketPrice - event.price) / 10000).toFixed(1) + '억';
        
        analysisUnits.textContent = event.units || '-';
        analysisStructure.textContent = event.structure || '-';
        analysisCommunity.textContent = event.community || '-';
        analysisSchool.textContent = event.school || '-';
        analysisTransport.textContent = event.transport || '-';
        analysisText.textContent = event.analysis;

        analysisCard.style.display = 'block';

        // 2. 하단 계산기 결과 섹션도 자동으로 업데이트하여 연동된 느낌 제공
        if (calcResult) {
            resName.textContent = event.title;
            resRegion.textContent = '상세 분석 참조';
            resPrice.textContent = (event.price / 10000).toFixed(1) + '억';
            resMarket.textContent = (event.marketPrice / 10000).toFixed(1) + '억';
            const profit = (event.marketPrice - event.price) / 10000;
            resProfit.textContent = profit.toFixed(1) + '억';

            const ratio = ((event.marketPrice - event.price) / event.price) * 100;
            let grade = '보통';
            let color = '#95a5a6';
            if (ratio >= 50) { grade = '매우 높음 (S)'; color = '#e74c3c'; }
            else if (ratio >= 30) { grade = '높음 (A)'; color = '#f39c12'; }
            else if (ratio >= 15) { grade = '양호 (B)'; color = '#2ecc71'; }

            resGrade.textContent = grade;
            resGrade.style.backgroundColor = color;
            naverLink.href = `https://land.naver.com/search/search.naver?query=${encodeURIComponent(event.title)}`;
            
            calcResult.style.display = 'flex';
        }

        analysisCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                    <span class="remind-me" title="알림 설정">${isReminded ? '🔔' : '🔕'}</span>
                `;
                
                eventTag.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showIntegratedAnalysis(event);
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

    if (searchCalcBtn) {
        searchCalcBtn.addEventListener('click', () => {
            const keyword = complexSearch.value.trim();
            if (!keyword) {
                alert('단지명을 입력하거나 목록에서 선택해주세요.');
                return;
            }

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
            }, 800);
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