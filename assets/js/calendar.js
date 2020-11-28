const currentDate = new Date();

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const day = currentDate.getDate();
const week = currentDate.getDay();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();


const daysOfTheMonth = function (month, year) {
    return currentDate(year, month, 0).getDate;
}