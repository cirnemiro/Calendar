<<<<<<< HEAD
$buttonEvent.addEventListener('click', showCreatedNewEvent)
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> origin/develop
>>>>>>> 32ef48196336dfca86eef41ea60a1af9dafc3e7e
const $cross = document.querySelector('.cross').addEventListener('click', hiddenNewEvent)
const enric= document.querySelector('.enric')
enric.addEventListener('click',hiddenNewEvent)

=======
>>>>>>> develop
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
    if (document.getElementById('recordatory').checked == true) {
        document.querySelector('.event-recordatory').classList.add('visible')
    }
>>>>>>> origin/develop
>>>>>>> 32ef48196336dfca86eef41ea60a1af9dafc3e7e
}
=======

}

>>>>>>> develop
function hiddenNewEvent() {
    document.querySelector('.enric').classList.add('hidden')
    document.querySelector('.new-event-form').classList.add('hidden')
    document.getElementById('enric').classList.add('hidden')
    //TODO: when push the button created
}