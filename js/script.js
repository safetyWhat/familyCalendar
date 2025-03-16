const calContainer = document.getElementById('calendar_container');
const prevMthBtn = document.getElementById('prev_month');
const nextMthBtn = document.getElementById('next_month');
const mthSelect = document.getElementById('month_selector');
const yearSelect = document.getElementById('year_selector');
const mthContainer = document.getElementById('month_container');
const currentDate = new Date();

const renderMonth = (month, year) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    //Determine the number of days from the previous month to display
    const daysFromPrevMonth = firstDay.getDay();
    if (daysFromPrevMonth > 0) {
        const prevMonth = new Date(year, month - 1);
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
            createDayElement(mthContainer, prevMonth.getFullYear(), prevMonth.getMonth(), i, 'prev-month');
        }
    }
    //Render the current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        createDayElement(mthContainer, year, month, i);
    }
    //Determine the number of days from the next month to display
    const daysFromNextMonth = 6 - lastDay.getDay();
    if (daysFromNextMonth > 0) {
        const nextMonth = new Date(year, month + 1);
        for (let i = 1; i <= daysFromNextMonth; i++) {
            createDayElement(mthContainer, nextMonth.getFullYear(), nextMonth.getMonth(), i, 'next-month');
        }
    }
};

const createDayElement = (container, year, month, day, additionalClass) => {
    const date = new Date(year, month, day);
    const dayElement = document.createElement('div');
    dayElement.className = `calendar-day ${additionalClass}`;
    dayElement.dataset.year = year;
    dayElement.dataset.month = month;
    dayElement.dataset.day = day;
    
    const dayNumber = document.createElement('span');
    dayNumber.textContent = day;
    dayElement.appendChild(dayNumber);
    container.appendChild(dayElement);
};
// Load the current month
renderMonth(currentDate.getMonth(), currentDate.getFullYear());
mthSelect.value = currentDate.getMonth();
yearSelect.value = currentDate.getFullYear();

// Event listeners for month and year selection
mthSelect.addEventListener('change', (e) => {
    const selectedMonth = parseInt(e.target.value);
    const selectedYear = parseInt(yearSelect.value);
    mthContainer.innerHTML = '';
    renderMonth(selectedMonth, selectedYear);
});
yearSelect.addEventListener('change', (e) => {
    const selectedMonth = parseInt(mthSelect.value);
    const selectedYear = parseInt(e.target.value);
    mthContainer.innerHTML = '';
    renderMonth(selectedMonth, selectedYear);
});
// Event listeners for previous and next month buttons
prevMthBtn.addEventListener('click', () => {
    const selectedMonth = parseInt(mthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    if (selectedMonth === 0) {
        mthSelect.value = 11;
        yearSelect.value = selectedYear - 1;
    } else {
        mthSelect.value = selectedMonth - 1;
    }
    mthContainer.innerHTML = '';
    renderMonth(parseInt(mthSelect.value), parseInt(yearSelect.value));
});
nextMthBtn.addEventListener('click', () => {
    const selectedMonth = parseInt(mthSelect.value);
    const selectedYear = parseInt(yearSelect.value);
    if (selectedMonth === 11) {
        mthSelect.value = 0;
        yearSelect.value = selectedYear + 1;
    } else {
        mthSelect.value = selectedMonth + 1;
    }
    mthContainer.innerHTML = '';
    renderMonth(parseInt(mthSelect.value), parseInt(yearSelect.value));
});