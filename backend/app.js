const express=require('express');
const cookieParser=require('cookie-parser');
const userRouter=require("./routes/user.js");
const productRouter=require("./routes/product.js")
const cors=require('cors');
require('dotenv').config()
const connectDb=require("./utils/connectDb.js");
const app=express();
const port=process.env.PORT;
connectDb();
app.use(cors({
    origin: "http://localhost:5173", 
  credentials: true
}))
app.use(cookieParser());
app.use(express.json());
app.use('/',userRouter);
app.use('/',productRouter);
app.get('/',(req,res)=>{
    res.send('hi');
})
app.listen(port,()=>{

    console.log(`listening at port ${port}`);
})