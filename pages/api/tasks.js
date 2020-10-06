
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern-todo',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
})

const taskSchema = {
  description:{
      type:String,
      required:true,
      trim:true
  },
  completed:{
      type:Boolean,
      default:false
  }
}

let Task;

try{
  Task = mongoose.model('tasks')
}catch{
  Task = mongoose.model('tasks',taskSchema)
}


export default async (req, res) => {
  if (req.method === 'GET'){
    const tasks = await  Task.find({})
    res.status(200).json(tasks)
  }
  else if (req.method === 'POST'){
    const task = new Task(req.body)
    await task.save()
    res.status(200).json(task)
  }
}
