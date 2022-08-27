function date() {
    const now = new Date(Date.now());
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
}

function datetime() {
    const now = new Date(Date.now());
    return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

module.exports = { date, datetime };