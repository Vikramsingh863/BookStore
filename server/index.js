import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import route from './Route/route.js';

import cors from 'cors'



const PORT = 5500||process.env.PORT;
const app = express();
app.use(cors({
  origin: "https://book-store-gold-one.vercel.app",
  // credentials:true,
  // allowedHeaders: 'Content-Type,Authorization' 
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/',route)

const URL = process.env.URL
mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then((res)=>{
    app.listen(PORT,()=>console.log("server is running at port no", PORT) )
})
.catch((error)=>console.log("Error while connecting", error))
