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
    //TODO: when push the button created
}