
const dataTimeStart = document.querySelector('#event-hStart').value
const dataTimeFinish = document.querySelector('#event-hFinish').value

const stringLocalstorage = localStorage.getItem('AllTheEvents')
    const arrayLocalStorage = JSON.parse(stringLocalstorage)

