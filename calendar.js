document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');

    let currentDate = new Date(2026, 5, 1); // 2026년 6월 기준

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYearDisplay.textContent = `${year}년 ${month + 1}월`;

        // 요일 헤더
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('calendar-day-header');
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // 공백 채우기
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('calendar-day', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        // 날짜 채우기
        for (let d = 1; d <= daysInMonth; d++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            
            const dayNum = document.createElement('span');
            dayNum.classList.add('day-number');
            dayNum.textContent = d;
            dayCell.appendChild(dayNum);

            // 해당 날짜의 일정 찾기
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const events = SUBSCRIPTION_DATA.filter(e => e.date === dateStr);

            events.forEach(event => {
                const eventTag = document.createElement('div');
                eventTag.classList.add('event-tag', event.type);
                eventTag.textContent = event.title;
                dayCell.appendChild(eventTag);
            });

            calendarGrid.appendChild(dayCell);
        }
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

    renderCalendar();
});