// DOM Variables

const $dates = document.querySelector('#dates')
const $month = document.querySelector('#month')
const $year = document.querySelector('#year')

const $buttonEvent = document.querySelector('#btn-newEvent')
const $buttonCreatedEvent = document.querySelector('#create-event')
const $cross = document.querySelector('.cross')

const $inputText = document.querySelectorAll('#form-new-event input[type=text]')
const $inputDataStart = document.querySelector('#event-start')

const $lastMonthArrow = document.querySelector('#last_month')
const $nextMonthArrow = document.querySelector('#next_month')


const enric = document.querySelector('.enric')

// Global Variables

const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
const weekDays =['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const currentDate = new Date()
currentDate.setDate(1)

let dayOfTheWeek = 0
let allTheEvents = []


// EventListener
$lastMonthArrow.addEventListener('click', showPreviousMonth);
$nextMonthArrow.addEventListener('click', showNextMonth);

$buttonEvent.addEventListener('click', showCreatedNewEvent)
$cross.addEventListener('click', hiddenNewEvent)
enric.addEventListener('click',hiddenNewEvent)

$buttonCreatedEvent.addEventListener('click', validationEvent)
document.getElementById('recordatory').addEventListener('change', checkedRecordatory)


// Functions Onload
showCurrentMonth()

// Functions ___________________________________________________________________________________________________________________________________________________

// Functions of calendary --------------------------------------------------------------------------------------------------------
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
    

    const stringLocalstorage = localStorage.getItem('AllTheEvents')
    const arrayLocalStorage = JSON.parse(stringLocalstorage)

    let event1 = ""
    let event2 = ""
    let event3 = ""

    for (let i = 0; i < arrayLocalStorage.length; i++) {
        if (arrayLocalStorage[i].dateStart === `2020-12-${dayOfTheMonth}`) {
            event1 = arrayLocalStorage[i].title

        }
    }

    if (isOutOfTheMonthDay) {
        $day.classList.add('calendar__day--other')
    }


    $day.innerHTML = `
        <div style="border: 1px solid black" class="calendar-day__template">
            <div>${weekDays[dayOfTheWeek]}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events" >${event1}&nbsp;</div>
            <div class="calendar-day-template__events" >${event2}&nbsp;</div>
            <div class="calendar-day-template__events" >${event3}&nbsp;</div>
        </div>
    `

    $day.addEventListener('click', clickDay)

    function clickDay() {
        showCreatedNewEvent()
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

// Functions of show of modal --------------------------------------------------------------------------------------------------------

document.onkeydown = function(evt) {
    evt = evt || window.event
    if (evt.key === 27 || evt.key === "Escape" || evt.key === "esc") {
        hiddenNewEvent()
    }
}

function showCreatedNewEvent() {
    document.querySelector('.enric').classList.remove('hidden')
    document.querySelector('.new-event-form').classList.remove('hidden')
    document.getElementById('enric').classList.remove('hidden')

}

function hiddenNewEvent() {
    document.querySelector('.enric').classList.add('hidden')
    document.querySelector('.new-event-form').classList.add('hidden')
    document.getElementById('enric').classList.add('hidden')
}

// Functions of localStorage --------------------------------------------------------------------------------------------------------

function addNewEvent() {

    let event = {
        title: document.querySelector('#event-title').value,
        dateStart: document.querySelector('#event-start').value,
        dataFinish: document.querySelector('#event-finish').value,
        dataTimeStart: document.querySelector('#event-hStart').value,
        dataTimeFinish: document.querySelector('#event-hFinish').value,
        recordatory: document.querySelector('#recordatory').checked,
        type: document.querySelector('#event-title').value,
        description: document.querySelector('#description').value
    }
    allTheEvents.push(event)

    saveInLocalStorage(allTheEvents)
    document.querySelector('#form-new-event').reset()
}

function getOfLocalStorage() {
    let localEventList = localStorage.getItem('AllTheEvents')
    //if localStorage is empty
    if (localEventList === null) {
        allTheEvents = []
    } else {
        //How we are save in string, we need again the object
        allTheEvents = JSON.parse(localEventList)
    }

    return allTheEvents
}

function saveInLocalStorage(listevent) {
    localStorage.setItem('AllTheEvents', JSON.stringify(listevent))

}


function startRecordatory() {

    //
}

// Fuctions of Validation

function validationEvent(e) {
    e.preventDefault();
    let validation = true
    for (var i=0; i < $inputText.length; i++) {
        if ($inputText[i].value === "" || !/[a-zA-Z0-9.]+/.test($inputText[i].value)) {
            validation = false
            break
        } else {
            validation = true
        }
    }

    if ($inputDataStart.value === "") {
        validation = false
    } else {
        validation = true
    }

    if (validation) {
        addNewEvent()
        hiddenNewEvent()
    }

}

function checkedRecordatory() {
    if (document.getElementById('recordatory').checked) {
        const $selected = document.querySelector('#event-recordatory')
        $selected.classList.remove('hidden')

        const $timeSelected = $selected.options[$selected.selectedIndex].value
        const $whichTypeSelected = $selected.options[$selected.selectedIndex].text;
        console.log($whichTypeSelected);
        console.log($timeSelected);
    }
}