const express = require('express')
const app = express()
const fs = require('fs')
const { model } = require('mongoose')

// app.use(express.static(publicDirectoryPath))

const dataBuffer = fs.readFileSync('delivery_points.json')
const dataJSON = dataBuffer.toString()
const dataParse = JSON.parse(dataJSON)
const custData = (dataParse.data.customer_details)
const newJSON = JSON.stringify(custData)
ids = Object.keys(custData)
const mydata = () => {
    const a = []
for (let i=0;i<ids.length;i++ )
{
    id = ids[i]
    const b = []
    b.push(id)
    b.push(custData[id].customer_name)
    b.push(custData[id].customer_address['address_id'])
    b.push(custData[id].customer_address['flat'])
    b.push(custData[id].customer_address['building'])
    b.push(custData[id].customer_address['wing'])
    b.push(custData[id].customer_address['area'])
    b.push(custData[id].customer_address['city'])
    b.push(custData[id].customer_address.lat_long['latitude'])
    b.push(custData[id].customer_address.lat_long['longitude'])
    b.push(custData[id].customer_address['google_address_data'])
    b.push(custData[id].customer_address['instructions'])
    b.push(custData[id].customer_address['phone_no'])
    b.push(custData[id].visited)

    a.push(b)

}
// console.log(a)
return a
}


module.exports = {mydata:mydata}
