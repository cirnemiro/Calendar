document.getElementById('recordatory').addEventListener('change', checkedRecordatory)

const $inputTitle = document.querySelector('#event-start').value
const $inputDataFinish = document.querySelector('#event-start').value
const $inputRecordatory = document.querySelector('#recordatory').checked
const $inputType = document.querySelector('#event-title').value
const $inputDescription = document.querySelector('#description').value

function validationEvent(boolean) {

}

function checkedRecordatory() {
    if (document.getElementById('recordatory').checked) {
        document.querySelector('#event-recordatory').classList.remove('hidden')
    }
}

if (validationEvent() === true) {
    $buttonCreatedEvent.addEventListener('click', addNewEvent)
    $buttonCreatedEvent.addEventListener('click', hiddenNewEvent)
}