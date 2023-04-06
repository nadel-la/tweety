const getMinutes = (data) => {
    let time = new Date(data)
    return time.getMinutes()
}

module.exports = {getMinutes}