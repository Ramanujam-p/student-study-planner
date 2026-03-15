const Subject = require("../models/Subject")

exports.getSubjects = async(req,res)=>{

try{

const subjects = await Subject.find({user:req.user})

res.json(subjects)

}catch(err){

res.status(500).json({message:err.message})

}

}

exports.createSubject = async(req,res)=>{

try{

const subject = await Subject.create({
name:req.body.name,
user:req.user
})

res.json(subject)

}catch(err){

res.status(500).json({message:err.message})

}

}

exports.deleteSubject = async(req,res)=>{

try{

const subject = await Subject.findOne({
_id:req.params.id,
user:req.user
})

if(!subject){
return res.status(404).json({
message:"Subject not found"
})
}

await subject.deleteOne()

res.json({message:"Subject deleted"})

}catch(err){

res.status(500).json({message:err.message})

}

}