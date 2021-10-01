const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
      orderId: Number,
      customerName: String,
      addressId: Number,
      flat: String,
      building: String,
      wing: String,
      area: String,
      city: String,
      latitude:Number,
      longitude:Number,
      googleAddressData:String,
      instructions:String,
      phoneNo:Number,
      visited:Boolean


})

//collection creation
const Data = new mongoose.model("Tasks",dataSchema)


module.exports = Data
