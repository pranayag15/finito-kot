function datewisesort(data){
    var data = data.sort((a, b) => {
        return new Date(b.datetime) - new Date(a.datetime)  
    })
    return data
}

module.exports.sortData = function (allData) { 
    console.log(new Date(allData[0].datetime).getDate())
    var statusZero =[], statusOne = [];

    for (let index = 0; index < allData.length; index++) {
        allData[index].date = allData[index].datetime.split('T')[0]
        allData[index].time = allData[index].datetime.split('T')[1].substr(0, 8)
        if(allData[index].status == 0){
            statusZero.push(allData[index])
        } else {
            statusOne.push(allData[index])
        }
    }
    var statusZero = datewisesort(statusZero)
    var statusOne = datewisesort(statusOne)
    var mergedArray = statusZero.concat(statusOne)
    return mergedArray
};