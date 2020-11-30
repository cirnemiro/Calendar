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

    // saveInLocalStorage(event)
    document.querySelector('#form-new-event').reset()
}
$buttonCreatedEvent.addEventListener('click', addNewEvent)
console.log(allTheEvents)


// function getOfLocalStorage() {
//     let localEventList = localStorage.getItem('AllTheEvents')
//     //if localStorage is empty
//     if (localEventList === null) {
//         allTheEvents = []
//     } else {
//         //How we are save in string, we need again the object
//         allTheEvents = JSON.parse(localEventList)
//     }
//     return allTheEvents
// }

// function saveInLocalStorage(listevent) {
//     localStorage.setItem('AllTheEvents', JSON.stringify(listevent))

// }


