<<<<<<< HEAD
const events = {
    title: "",
    dataDay: "",
    dateStart: 0,
    dateFinish: 0,
    recordatory: [true, 0],
    type: "",
    description: "",
=======
const $buttonCreatedEvent = document.querySelector('#create-event')

let allTheEvents = []

function addNewEvent(e) {
    e.preventDefault();
    let event = {
        title: document.querySelector('#event-title').value,
        dateStart: document.querySelector('#event-start').value,
        dataFinish: document.querySelector('#event-start').value,
        recordatory: document.querySelector('#recordatory').checked,
        type: document.querySelector('#event-title').value,
        description: document.querySelector('#description').value
    }
    allTheEvents.push(event)

    saveInLocalStorage(allTheEvents)
    document.querySelector('#form-new-event').reset()
<<<<<<< HEAD
=======
>>>>>>> origin/develop
>>>>>>> 32ef48196336dfca86eef41ea60a1af9dafc3e7e
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

// console.log(getOfLocalStorage()[2].title);


console.log(getOfLocalStorage(),'este es');

function saveInLocalStorage(listevent) {
    localStorage.setItem('AllTheEvents', JSON.stringify(listevent))

>>>>>>> develop
}


