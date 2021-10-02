const mongoose = require('mongoose') 
const express = require('express')
const bodyParser = require('body-parser')
const requestt = require('request')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const cdata = require('./data.js')
const Data  = require('./models/dataSchema');
const { request } = require('express')

customer_data = cdata.mydata()

const DB = 'mongodb+srv://admin:admin@debugthugs.cq8wr.mongodb.net/Delivery?retryWrites=true&w=majority'



mongoose.connect(DB).then(() => {
  console.log('conn success')
}).catch((err) => console.log(err))


app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))

app.use(cors())

app.get('/create',(req,res) => {
  const createDocument = async () => {
  try{
    for(var i=0;i<customer_data.length;i++)
    {
        const taskData = new Data({
          orderId: customer_data[i][0],
          customerName: customer_data[i][1],
          addressId: customer_data[i][2],
          flat: customer_data[i][3],
          building: customer_data[i][4],
          wing: customer_data[i][5],
          area: customer_data[i][6],
          city: customer_data[i][7],
          latitude:customer_data[i][8],
          longitude:customer_data[i][9],
          googleAddressData:customer_data[i][10],
          instructions:customer_data[i][11],
          phoneNo:customer_data[i][12],
          visited:customer_data[i][13],
          rank:customer_data[i][14]
      })
      const result = await taskData.save()
      // console.log(result)
    }
    
  }catch(err)
  {
    console.log(err)
  }
}
    createDocument()
    res.send('Database Created')
})


app.get('/read',(req,res) =>{
  const getDocument = async () => {
      const result = await Data.find()
      // console.log(result)
      res.json(result)
  }
  getDocument()
})


app.get('/update',(req,res) => {
  const oid = req.query.orderid
  const updateDocument = async () => {
  const findValue = await Data.find({orderId:oid})
  const newValue = !(findValue[0].visited)
  const updatedData = await Data.updateOne({orderId:oid},{$set:{visited:newValue}})
  const checkValue = await Data.find({orderId:oid})
  res.json(checkValue)
  }
  updateDocument()
})

app.get('/rank',(req,res)=> {
  const r = req.query.rank
  const getRank = async () => {
    const findRank = await Data.find({rank:r})
    const latlng = (findRank[0].latitude).toString() +","+(findRank[0].longitude).toString()
    if(r!=1){
        const findRankb = await Data.find({rank:r-1})
        const latlngb = (findRankb[0].latitude).toString() +","+(findRankb[0].longitude).toString()
        
        const url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins="+ latlng +"&destinations="+latlngb+"&key=baYnB5GJ7wwsbuERlVNKZ1py7gJq7"
        // console.log(url)
        requestt({url,json:true},(error,{body})=>{
          if(!error){
           res.json((body.rows[0].elements[0].distance['value']))
          }
        })
        
    }
    else{
      res.json({latlng,latlng})
    }
  }
  getRank()
  // console.log('in')
})

app.get('/distance',(req,res)=> {
  const oid1 = req.query.orderId1
  const oid2 = req.query.orderId2
  console.log(oid1,oid2)
  const getDistance = async () => {
    const findDistance1 = await Data.find({orderId:oid1})
    const latlng1 = (findDistance1[0].latitude).toString() +","+(findDistance1[0].longitude).toString()
    
    const findDistance2 = await Data.find({orderId:oid2})
    const latlng2 = (findDistance2[0].latitude).toString() +","+(findDistance2[0].longitude).toString()
    
    const url = "https://api.distancematrix.ai/maps/api/distancematrix/json?origins="+ latlng1 +"&destinations="+latlng2+"&key=baYnB5GJ7wwsbuERlVNKZ1py7gJq7"
    console.log(url)
    requestt({url,json:true},(error,{body})=>{
      if(!error){
        res.json((body.rows[0].elements[0].distance['value']))
      }
    })
  }
  getDistance()
})

app.get('/delete',(req,res) => {
  const deleteDocument = async () => {
    const deleteData = await Data.deleteMany({})
    res.send('Deleted Document ')
  }
  deleteDocument()
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log('Server Started!!')
})