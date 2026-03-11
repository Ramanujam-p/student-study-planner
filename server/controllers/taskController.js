const Task = require("../models/Task")

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async(req,res)=>{

const task = await Task.create({
...req.body,
user:req.user
})

res.json(task)

}

exports.updateTask = async (req,res)=>{
  try{

    const task = await Task.findById(req.params.id)

    if(!task){
      return res.status(404).json({message:"Task not found"})
    }

    task.completed = !task.completed

    await task.save()

    res.json(task)

  }catch(error){
    res.status(500).json({message:error.message})
  }
}

exports.deleteTask = async (req, res) => {

  await Task.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });

};