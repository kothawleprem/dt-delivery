const mongoose = require('mongoose') 
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

const cdata = require('./data.js')
const Data  = require('./models/dataSchema');

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