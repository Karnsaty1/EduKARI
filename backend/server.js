const express=require('express');
const app=express();
const {connectDB}=require('./routes/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path=require('path');
const port=process.env.PORT;
app.use(express.json());
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
const cors=require('cors');
const corsOptions={
    origin:process.env.FRONTEND,
    credentials:true
}
app.use(cors(corsOptions));
connectDB().then(()=>{
app.use('/data',require('./routes/data'));
app.use('/auth',require('./routes/auth'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


    app.listen(port, ()=>{
        console.log(`Server running at http://localhost:${port}`);
    });

}).catch((error)=>{
    console.log(error);
    process.exit(1);
});

