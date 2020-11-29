
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const currentDate = new Date()
const currentDay = currentDate.getDate()
const currentWeek = currentDate.getDay()
const currentMonth = currentDate.getMonth()
const currentYear = currentDate.getFullYear()

const $dates = document.querySelector('#dates')
const $month = document.querySelector('#month')
const $year = document.querySelector('#year')

const $prevMonthDOM = document.querySelector('#prev_month')
const $nextMonthDOM = document.querySelector('#next_month')

let eachMonth = currentMonth
let eachYear = currentYear


const getTotalDays = function (month, year) {
    return new Date(year, month, 0).getDate()
    // getTotalDays(currentMonth, currentYear)
}

// Show in DOM
month.textContent = monthNames[currentMonth]
year.textContent = currentYear.toString()

const weeks = document.querySelector('.calendar__week')


// Days of the last month 
for (let i = 0; i < dayOfTheWeek(); i++){
    const divDays = document.createElement('div')
    divDays.classList.add('calendar__day', 'calendar__item')
    divDays.innerHTML = ''
    weeks.appendChild(divDays)
}

// Days of the actual month 
for (let index = 1; index <= getTotalDays(eachMonth, currentYear); index++) {
    const divDays = document.createElement('div')
    divDays.classList.add('calendar__day', 'calendar__item')
    divDays.innerHTML = index
    weeks.appendChild(divDays)
}

function dayOfTheWeek() {
    const start = new Date(eachYear, eachMonth, 1)
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1

}


function preMonth() {
    if (eachMonth === 0) {
        eachMonth = 11
    } else {
        eachMonth --
    }
    setNewYear()

}

function nextMonth() {
    if (eachMonth === 11) {
        eachMonth = 0
    } else {
        eachMonth ++
    }
    setNewYear()
}

function setNewYear() {
    currentDate.setFullYear(eachYear, eachMonth, currentDay)
    month.textContent = monthName[eachMonth]
    year.textContent = eachYear.toString()
}