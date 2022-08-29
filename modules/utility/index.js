const persianDate = require('persian-date');

function date() {
    persianDate.toLocale('fa').toCalendar('persian');
    const now = new persianDate(Date.now());//.format('YYYY-MM-DD H:m:s');
    return `${now.year()}-${now.month()}-${now.day()}`;
    // const now = new Date(Date.now());
    // return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
}

function datetime() {
    persianDate.toLocale('fa').toCalendar('persian');
    const now = new persianDate(Date.now());//.format('YYYY-MM-DD H:m:s');
    return `${now.year()}-${now.month()}-${now.day()} ${now.hours()}:${now.minutes()}:${now.seconds()}`;
    // const now = new Date(Date.now());
    // return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

module.exports = { date, datetime };