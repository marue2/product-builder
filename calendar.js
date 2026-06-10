document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevBtn = document.getElementById('prev-month');
    const nextBtn = document.getElementById('next-month');
    const alarmerForm = document.getElementById('alarmer-form');
    const enableNotifBtn = document.getElementById('enable-notif-btn');
    const notifPrompt = document.getElementById('notif-prompt');

    let currentDate = new Date(2026, 5, 1); // 2026년 6월 기준
    let reminders = JSON.parse(localStorage.getItem('reminders') || '[]');

    // Notification Logic
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
            if (Notification.permission === "granted") {
                new Notification("알림 예약 완료", {
                    body: `${title} 청약 일전에 알림을 보내드립니다.`,
                });
            }
        }
        localStorage.setItem('reminders', JSON.stringify(reminders));
        renderCalendar();
    }

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
                    toggleReminder(event.title, dateStr);
                });

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

    // Alarmer Form Handling
    if (alarmerForm) {
        alarmerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('user-email').value;
            alert(`${email}님, 청약 알리미 신청이 완료되었습니다! (서버 연결 후 실제 발송이 시작됩니다)`);
            alarmerForm.reset();
        });
    }

    initNotifications();
    renderCalendar();
});