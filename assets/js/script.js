// DOM Variables
// localStorage.setItem('AllTheEvents', [])
const $dates = document.querySelector('#dates')
const $month = document.querySelector('#month')
const $year = document.querySelector('#year')


const $buttonEvent = document.querySelector('#btn-newEvent')
const $buttonCancelEvent = document.querySelector('#deleted-event')
const $buttonCreatedEvent = document.querySelector('#create-event')
const $cross = document.querySelector('.cross')

const $inputText = document.querySelectorAll('#form-new-event input[type=text]')
const $inputDataStart = document.querySelector('#event-start')

const $lastMonthArrow = document.querySelector('#last_month')
const $nextMonthArrow = document.querySelector('#next_month')

const $modal = document.querySelector('.modal')
const $modalOverlay = document.querySelector('.modal__overlay')


// Global Variables

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentDate = new Date()
currentDate.setDate(1)


let dayOfTheWeek = 0
let allTheEvents = [] // JSON.parse(localStorage.getItem('AllTheEvents'))


getEventsFromLocalStorage()

//vero inicio-------
let allTheRecordatories = allTheEvents.filter(event => {
    let dateRecordatoryStart = new Date(event.dateStart)
    if (dateRecordatoryStart > currentDate) return event.recordatory

})


function setupNotifications() {
    setInterval(() => {
        allTheRecordatories.forEach(recordatory => {

            // if (recordatory < currentDate) {
            //     $toast.classList.add('visibilite')
            //     $eventPass.classList.add('event__pass')
                
            // }
        })
    }, 10 * 1000)
}
//vero fin--------------
setupNotifications()

// EventListener
$lastMonthArrow.addEventListener('click', showPreviousMonth);
$nextMonthArrow.addEventListener('click', showNextMonth);

$buttonEvent.addEventListener('click', showCreatedNewEvent)
$cross.addEventListener('click', hiddenNewEvent)
$modalOverlay.addEventListener('click',hiddenNewEvent)

$buttonCreatedEvent.addEventListener('click', validationEvent)
$buttonCancelEvent.addEventListener('click', hiddenNewEvent)
document.getElementById('recordatory').addEventListener('change', checkedRecordatory)


// Functions Onload
showCurrentMonth()

// Functions ___________________________________________________________________________________________________________________________________________________

// Functions of calendary --------------------------------------------------------------------------------------------------------
function getTotalDays(date) {
    const month = date.getMonth()
    const year = date.getFullYear()
    return new Date(year, month +1, 0).getDate()
    // https://stackoverflow.com/a/1184359
}

function createDayElement(dayDate, isOutOfTheMonthDay, events) {
    let dayOfTheMonth = dayDate.getDate()
    const dayOfTheWeekIndex = dayDate.getDay()
    let currentYear = currentDate.getFullYear()
    let currentMonth = currentDate.getMonth()
    const dayOfTheWeek = weekDays[dayOfTheWeekIndex]

    let $day = document.createElement('div')
    $day.classList.add('calendar_day', 'calendar_item')
    $day.dataset.day = dayOfTheMonth
 

    if(dayOfTheMonth<10){
        dayOfTheMonth = '0'+dayOfTheMonth
    }
    if(currentMonth<10){
        currentMonth = ''+currentMonth
    }
    
    let myArray1 = allTheEvents.filter(e=>{
        if(e.dateStart == `${currentYear}-${currentMonth+1}-${dayOfTheMonth}`){ //`${currentYear}-${currentMonth+1}-${dayOfTheMonth}`
            return true
        } 
    })


    if(myArray1.length === 0){
        $day.innerHTML = `
        <div class="calendar-day__template">
            <div>${dayOfTheWeek}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events">&nbsp;</div> 
            <div class="calendar-day-template__events">&nbsp;</div>
            <div class="calendar-day-template__events">&nbsp;</div>
        </div>
    `

    }else if (myArray1.length===1){
        $day.innerHTML = `
        <div class="calendar-day__template">
            <div>${dayOfTheWeek}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events">${myArray1[0].title}&nbsp;</div> 
            <div class="calendar-day-template__events">&nbsp;</div>
            <div class="calendar-day-template__events">&nbsp;</div>
        </div>
    `
    console.log('evento1');
    }
    else if (myArray1.length===2){
        $day.innerHTML = `
        <div class="calendar-day__template">
            <div>${dayOfTheWeek}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events">${myArray1[0].title}</div> 
            <div class="calendar-day-template__events">${myArray1[1].title}</div>
            <div class="calendar-day-template__events">&nbsp;</div>
        </div>
    `
    console.log('evento2');
    }
    else if (myArray1.length===3){
        $day.innerHTML = `
        <div class="calendar-day__template">
            <div>${dayOfTheWeek}</div>
            <div class="divDay">${dayOfTheMonth}</div>
            <div class="calendar-day-template__events">${myArray1[0].title}</div> 
            <div class="calendar-day-template__events">${myArray1[1].title}</div>
            <div class="calendar-day-template__events">${myArray1[2].title}</div>
        </div>
    `
    console.log('evento3');
    }

    if (isOutOfTheMonthDay) {
        $day.classList.add('calendar__day--other')
    }

    // $day.addEventListener('click', clickDay)

    return $day

}

// function clickDay(dayOfTheMonth) {
//     alert('hi!')
    
//}

function removeDayElement() {
//     $day.removeEventListener('click', clickDay)
//    $day.remove()
}

function emptyDaysContainer() {
    $dates.querySelectorAll('.calendar__day').forEach(removeDayElement)
}

function showCurrentMonth() {
    emptyDaysContainer()

    // lasMont - Te muesrta el numero del mes anterior
    const lastMonthDate = new Date(currentDate)
    lastMonthDate.setMonth(currentDate.getMonth() - 1)

    // nextMont - Te muesrta el numero del mes siguiente
    const nextMonthDate = new Date(currentDate)
    nextMonthDate.setMonth(currentDate.getMonth() + 1)

    // Te muestra los dias del mes anterior
    const lastMonthDaysAmount = getTotalDays(lastMonthDate)

     // Te muestra los dias del mes actual
    const currentMonthDaysAmount = getTotalDays(currentDate)

    // El primer dia del mes // En qué número de la semana es
    const currentMonthFirstDay = getMonthFirstDay(currentDate)
    const currentMonthFirstDayWeekDayIndex = getDateWeekDayIndex(currentMonthFirstDay)

    // El ultimo dia del mes actual // Del mes actual el ultimo dia de la semana su index
    const currentMonthLastDay = getMonthLastDay(currentDate)
    const currentMonthLastDayWeekDayIndex = getDateWeekDayIndex(currentMonthLastDay)


    const currentMonthEvents = allTheEvents.filter(event => {
        const { startDate, endDate } = event

        // const startDate = event.startDate
        // const endDate = event.endDate

        if (startDate >= currentMonthFirstDay && startDate <= currentMonthLastDay) {
            return true
        }
        if (endDate >= currentMonthFirstDay && endDate <= currentMonthLastDay) {
            return true
        }
        return false

    })

    // el último parámetro es el parámetro a lo que se lo quiero añadir, o bien una array, un número o en mi caso un objeto
    const currentMonthEventsPerDay = currentMonthEvents.reduce((result, event) => {

        // Clona todos los keys y values de result (el que hemos definido) y me crear una copia, PARA NO RENOMBRARLO
        const events = { ...result }

        const { startDate, endDate } = event

        const listOfEventDates = getDatesBetween(startDate, endDate)

        const listOfValidEventDates = listOfEventDates.filter(date => {
            return (date >= currentMonthFirstDay) && (date <= currentMonthLastDay)
        })

        const listOfEventDays = listOfValidEventDates.map(date => {
            return date.getDate() //Esto va a ser cada key del día
        })

        listOfEventDays.forEach(day => {
            if (!events[day]) {
                events[day] = []
            }
            events[day].push(event)
        })

        return events
    }, {}) //

    // console.log('lista:   ', currentMonthEventsPerDay);

    // Days of the last month
    for (let i = currentMonthFirstDayWeekDayIndex; i > 0; i--) {
        const dayOfTheMonth = lastMonthDaysAmount - (i - 1)

        const thisDate = new Date(lastMonthDate)
        thisDate.setDate(dayOfTheMonth)

        const $thisDay = createDayElement(thisDate, true, [])
        $dates.appendChild($thisDay)
    }

    // Days of the actual month
    for (let i = 1; i <= currentMonthDaysAmount; i++) {
        const dayOfTheMonth = i

        const thisDate = new Date(currentDate)
        thisDate.setDate(dayOfTheMonth)

        const $thisDay = createDayElement(thisDate, false, currentMonthEventsPerDay[dayOfTheMonth])
        $dates.appendChild($thisDay)
    }

    // Days of the next month
    const nextMonthAmountOfDaysToShow = 6 - currentMonthLastDayWeekDayIndex
    for (let i = 1; i <= nextMonthAmountOfDaysToShow; i++) {
        const dayOfTheMonth = i

        const thisDate = new Date(nextMonthDate)
        thisDate.setDate(dayOfTheMonth)

        const $thisDay = createDayElement(thisDate, true, [])
        $dates.appendChild($thisDay)
    }

    $month.textContent = monthNames[currentDate.getMonth()]
    $year.textContent = currentDate.getFullYear()
}

function getDatesBetween(start, end) {
    const dates = []
    // 
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {

        dates.push(new Date(date))

    }

    return dates
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


function showCreatedNewEvent() {
    $modal.classList.remove('hidden')
    
}

function hiddenNewEvent() {
    $modal.classList.add('hidden')
    document.querySelector('#form-new-event').reset()

}
document.onkeydown = function(evt) {
    if (evt.key === 27 || evt.key === "Escape" || evt.key === "esc") {
        hiddenNewEvent()
    }
}

// Functions of localStorage --------------------------------------------------------------------------------------------------------

function addNewEvent() {

    const dateStart = document.querySelector('#event-start').value
    const dateFinish = document.querySelector('#event-finish').value
    const dateTimeStart = document.querySelector('#event-hStart').value.split(':')
    const dateTimeFinish = document.querySelector('#event-hFinish').value.split(':')

    const $select = document.querySelector('#event-recordatory')

    const timeSelected = $select.value
    const whichTypeSelected = $select.options[$select.selectedIndex].text;

    console.log(timeSelected)
    console.log(whichTypeSelected)



    let event = {
        dateStart,
        dateFinish,
        dateTimeStart,
        dateTimeFinish,
        timeSelected,
        whichTypeSelected,
        title: document.querySelector('#event-title').value,
        recordatory: document.querySelector('#recordatory').checked,
        type: document.querySelector('#event-title').value,
        description: document.querySelector('#description').value
    }

    allTheEvents.push(event)

    // If it is a recordatory, add it to the allTheRecordatories list
    if (event.recordatory === true) {
        allTheRecordatories.push(event)
    }
    

    persistEventsToLocalStorage(allTheEvents)

    document.querySelector('#form-new-event').reset()
}

function getEventsFromLocalStorage() {
    let localEventList = localStorage.getItem('AllTheEvents')
    
    //if localStorage is empty
    if (!localEventList) {
        localStorage.setItem('AllTheEvents', allTheEvents)
    } else {
        //How we are save in string, we need again the object
        allTheEvents = JSON.parse(localEventList)
    }

    return allTheEvents
}

function persistEventsToLocalStorage(allTheEvents) {
    localStorage.setItem('AllTheEvents', JSON.stringify(allTheEvents))
}


function startRecordatory(event) {
    // currentDate
    const $toastWrapper = document.createElement('div')
    $toastWrapper.className = 'toast'
    document.body.appendChild($toastWrapper)
    setInterval(() => {
    allTheRecordatories.forEach( event => {
        let eachDayOfREcordatoryEvents = new Date(event.dateStart).getTime()//ms de la hora 
        let eachHour = event.dateTimeStart[0] * 3600000
        let eachMin = event.dateTimeStart[1] * 60000
        let dateOfEventMs = eachDayOfREcordatoryEvents + eachHour + eachMin - event.timeSelected
        let currentDateEvent = new Date().getTime()
         console.log();

        if (dateOfEventMs < currentDateEvent) {
            console.log('iuju el evento');
            //eliminar evento de la lista de eventos con timer
        }
    })
    }, 100000)
}
startRecordatory()
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
        const $selectOption = document.querySelector('#event-recordatory')
        const $recordatoryFinish = document.querySelector('#recordatoryFinish')
        $selectOption.classList.remove('hidden')
        $recordatoryFinish.classList.remove('hidden')
    }

}