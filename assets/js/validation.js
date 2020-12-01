const $buttonCreatedEvent = document.querySelector('#create-event')
$buttonCreatedEvent.addEventListener('click', validationEvent)

document.getElementById('recordatory').addEventListener('change', checkedRecordatory)

const $inputText = document.querySelectorAll('#form-new-event input[type=text]')
const $inputDataStart = document.querySelector('#event-start')

function validationEvent(e) {
    e.preventDefault();
    alert('nos llega')
    let validation = true
    for (var i=0; i < $inputText.length; i++) {
        if ($inputText[i].value === "" || !/[a-zA-Z0-9.]+/.test($inputText[i].value)) {
            validation = false
            console.log('validation es false');
            break
        } else {
            validation = true
            console.log('validation es true');
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
        document.querySelector('#event-recordatory').classList.remove('hidden')
    }
}