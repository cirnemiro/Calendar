
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const weekDays =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const currentDate = new Date()
currentDate.setDate(1)




let dayOfTheWeek = 0

const $dates = document.querySelector('#dates')
const $month = document.querySelector('#month')
const $year = document.querySelector('#year')

const $buttonEvent = document.querySelector('#btn-newEvent')

const $lastMonthArrow = document.querySelector('#last_month')
const $nextMonthArrow = document.querySelector('#next_month')

// EventListener
$lastMonthArrow.addEventListener('click', showPreviousMonth);
$nextMonthArrow.addEventListener('click', showNextMonth);

function getTotalDays(date) {
    const month = date.getMonth()
    const year = date.getFullYear()
    return new Date(year, month + 1, 0).getDate()
    // https://stackoverflow.com/a/1184359
}

function createDayElement(dayOfTheMonth, isOutOfTheMonthDay,dayOfTheWeek) {
    let $day = document.createElement('div')
    $day.classList.add('calendar__day', 'calendar__item')
    $day.dataset.day = dayOfTheMonth

    if (isOutOfTheMonthDay) {
        $day.classList.add('calendar__day--other')
    }


    $day.innerHTML = `
        <div style="border: 1px solid black" class="calendar-day__template">
            <div>${weekDays[dayOfTheWeek]}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events" >event1</div>
            <div class="calendar-day-template__events" >event2</div>
            <div class="calendar-day-template__events" >event3</div>
        </div>
    `

    $day.addEventListener('click', clickDay)

    function clickDay() {
        // showCreatedNewEvent()
    }

    return $day
}


function removeDayElement($day) {
    // $day.removeEventListener('click', clickDay)
    $day.remove()
}

function emptyDaysContainer() {
    $dates.querySelectorAll('.calendar__day').forEach(removeDayElement)
}

function showCurrentMonth() {
    emptyDaysContainer()

    const lastMonthDate = new Date(currentDate)
    lastMonthDate.setMonth(currentDate.getMonth() - 1)

    const lastMonthDaysAmount = getTotalDays(lastMonthDate)

    const currentMonthDaysAmount = getTotalDays(currentDate)

    const currentMonthFirstDay = getMonthFirstDay(currentDate)
    const currentMonthFirstDayWeekDayIndex = getDateWeekDayIndex(currentMonthFirstDay)

    const currentMonthLastDay = getMonthLastDay(currentDate)
    const currentMonthLastDayWeekDayIndex = getDateWeekDayIndex(currentMonthLastDay)
    

    // Days of the last month
    for (let i = currentMonthFirstDayWeekDayIndex; i > 0; i--) {
        const dayOfTheMonth = lastMonthDaysAmount - (i -1)
        const $thisDay = createDayElement(dayOfTheMonth, true, dayOfTheWeek)
        dayOfTheWeek++
        if(dayOfTheWeek===7){
            dayOfTheWeek=0
        }


        $dates.appendChild($thisDay)
    }

    // Days of the actual month
    for (let i = 1; i <= currentMonthDaysAmount; i++) {
        const dayOfTheMonth = i
        const $thisDay = createDayElement(dayOfTheMonth, false, dayOfTheWeek)
        dayOfTheWeek++
        if(dayOfTheWeek===7){
            dayOfTheWeek=0
        }

        $dates.appendChild($thisDay)
    }

    // Days of the next month
    const nextMonthAmountOfDaysToShow = 6 - currentMonthLastDayWeekDayIndex
    for (let i = 1; i <= nextMonthAmountOfDaysToShow; i++){
        const dayOfTheMonth = i
        const $thisDay = createDayElement(dayOfTheMonth, true, dayOfTheWeek)
        dayOfTheWeek++
        if(dayOfTheWeek===7){
            dayOfTheWeek=0
        }



        $dates.appendChild($thisDay)
    }

    $month.textContent = monthNames[currentDate.getMonth()]
    $year.textContent = currentDate.getFullYear()
}

function getMonthFirstDay(date) {
    const month = date.getMonth()
    const year = date.getFullYear()
    return new Date(year, month, 1)
}

function getMonthLastDay(date) {
    const month = date.getMonth()
    const year = date.getFullYear()
    const monthDaysAmount = getTotalDays(date)
    return new Date(year, month, monthDaysAmount)
}

function getDateWeekDayIndex(date) {
    return (date.getDay() - 1) === -1
        ? 6
        : date.getDay() - 1
}

function showPreviousMonth() {
    const previousMonth = currentDate.getMonth() - 1
    currentDate.setMonth(previousMonth)
    showCurrentMonth()
}

function showNextMonth() {
    const nextMonth = currentDate.getMonth() + 1
    currentDate.setMonth(nextMonth)
    showCurrentMonth()
}

showCurrentMonth()
