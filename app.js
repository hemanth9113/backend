const express=require('express')
const cors=require('cors')
const app = express()
const PORT = 4000


const mongoose=require('mongoose')
mongoose.set('strictQuery', false);

//require data models
const User = require('./models/user')

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors()) // cross origin resource sharing.[btw two origin we need to share resource  i.e from frontend to backend]

const dbURL = "mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then( ()=>{
    console.log("connected to database");
})


app.post('/signup',async(req,res)=>{
    User.findOne({email:req.body.email},(err,userData)=>{
        if(userData){
            res.send({message:'User already exists'})
        } else {
            const data = new User({
                name:req.body.name,
                mobile:req.body.mobile,
                email:req.body.email,
                password:req.body.password
            })
            data.save(()=>{
                if(err){
                    res.send(err)
                } else {
                    res.send({message:'user registration successfully'})
                }
            })
        }
    })
})


app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

