const express = require('express')
const app = express()
const fs = require('fs')
const { model } = require('mongoose')
var solver = require('node-tspsolver')


const dataBuffer = fs.readFileSync('delivery_points.json')
const dataJSON = dataBuffer.toString()
const dataParse = JSON.parse(dataJSON)
const custData = (dataParse.data.customer_details)
const newJSON = JSON.stringify(custData)
ids = Object.keys(custData)
const mydata = () => {
    const a = []
    const ll = []
    const mul = []
for (let i=0;i<ids.length;i++)
{
    id = ids[i]
    const b = []
    
    const temp = []
    
    
     if(custData[id].customer_address.lat_long['latitude'] != undefined || custData[id].customer_address.lat_long['longitude'] != undefined )
     {
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
        // temp.push(id)
        // temp.push(custData[id].customer_address.lat_long['latitude'])
        // temp.push(custData[id].customer_address.lat_long['longitude'])

        // ll.push(temp)
    a.push(b)
    mul.push({oid:id,value:custData[id].customer_address.lat_long['latitude']*custData[id].customer_address.lat_long['longitude']})
    }

}


  mul.sort((a,b) => {
      return a.value - b.value
  })





// const fl = []
// for(let j=0;j<ll.length;j++)
// {
//     const tempfl = []
//     for(let k=0;k<ll.length;k++)
//     {
//         lon1 =  ll[j][0] * Math.PI / 180;
//         lon2 = ll[k][0] * Math.PI / 180;
//         lat1 = ll[j][1] * Math.PI / 180;
//         lat2 = ll[k][1] * Math.PI / 180;

        
//         let dlon = lon2 - lon1;
//         let dlat = lat2 - lat1;
//         let a = Math.pow(Math.sin(dlat / 2), 2)
//                  + Math.cos(lat1) * Math.cos(lat2)
//                  * Math.pow(Math.sin(dlon / 2),2);
               
//         let c = 2 * Math.asin(Math.sqrt(a));
   
//         let r = 6371;
//         tempfl.push(c*r)
//     }
//     fl.push(tempfl)
// }



// const fsolver = async () => {
//     const rest = await solver.solveTsp(fl, true, {})
    
//     for(let z=0;z<a.length;z++)
//     {
//         a[z].push(rest[z]+1)
//     }
// }

// fsolver()

for(let z=0;z<a.length;z++)
    {
        for(let y=0;y<a.length;y++)
        {
            if(a[y][0] == mul[z].oid)
            {
                a[y].push(z)
            }
        }
    }
    // console.log(a)

return a
}


module.exports = {mydata:mydata}
