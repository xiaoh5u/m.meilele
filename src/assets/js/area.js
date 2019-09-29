import address from './address.json'
var container = []
var provinceObj = {}
var provinceArr = []
var cityObj = {}
var cityArr = []
var areaObj = {}

//把JSON对象处理成框架识别的格式

 // 省份
for (var key in address) {
    const provinceName = address[key].provinceName
    provinceObj = {
        value: provinceName,
        text: provinceName,
    }
    var citys = address[key].cities
  // 市区
    for (var key in citys) {
        const cityName = citys[key].cityName
        cityObj = {
            value: cityName,
            text: cityName
        }
        provinceArr.push(cityObj)
        provinceObj.children = provinceArr

        var areas = citys[key].areas
        var num = 0
        // 城镇
        areas.forEach(item => {
            const areaName = item.areaName
            areaObj = {
                value: areaName,
                text: areaName,
                // velue:num++
            }

            cityArr.push(areaObj)
            cityObj.children = cityArr

        })
        cityArr = []
        num = 0
    }
   
    provinceArr = []
    container.push(provinceObj)

}



const addressList = container

export {
    addressList
}