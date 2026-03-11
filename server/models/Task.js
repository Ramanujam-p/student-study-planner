const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({

text:String,
subject:String,
deadline:Date,

completed:{
type:Boolean,
default:false
},

user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

})

module.exports = mongoose.model("Task",taskSchema)