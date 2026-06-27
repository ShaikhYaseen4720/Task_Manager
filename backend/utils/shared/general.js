const generateId = (dataArray) => {
    return dataArray.length === 0
     ? 1
     : Math.max(...dataArray.map(data => data.id)) + 1
}


export {
    generateId
}