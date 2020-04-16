const express=require('express')
require('./db/mongoose')

const userRouter=require('./router/users')
const taskRouter=require('./router/tasks')


const app=express()
const port=process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('server in up on port'+port)
})



// const bcrypt=require('bcryptjs')
// const myFunction=async()=>{
// const password='Red1234!'
// const hashed=await bcrypt.hash(password,8)
// console.log(password)
// console.log(hashed)
// const isMatch=await bcrypt.compare('Red1234!',hashed)
// console.log(isMatch)

// }
// myFunction()

// const jwt=require('jsonwebtoken')
// const myFunction=async()=>{
// const token=jwt.sign({_id:'gitar56'},"thisismycourses",{expiresIn:'1 seconds'})
// console.log(token)


// setTimeout(()=>{
//     const data=jwt.verify(token,'thisismycourses')
//     console.log(data)},0000)



// }
// myFunction()


// const Task = require('./models/task')
// const User = require('./models/users')
// const main = async ()=>{

    // const task = await Task.findById('5e9256a30026ca074047e143')
    // await task.populate('owner').execPopulate()
    // console.log(task)

//     const user= await User.findById('5e92540303a4293890fee41d')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)

// }

// main()