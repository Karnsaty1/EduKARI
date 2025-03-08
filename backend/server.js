const express=require('express');
const app=express();
const {connectDB}=require('./routes/db');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path=require('path');
const port=process.env.PORT;
const cors=require('cors');
const corsOptions={
    origin:process.env.FRONTEND,
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}
app.use(cors(corsOptions));
app.use((req, res, next) => {
    if (req.originalUrl === '/data/upload') {
        next(); // Skip JSON parsing for file uploads
    } else {
        express.json()(req, res, next); // Apply JSON parsing for other routes
    }
});
app.use(express.urlencoded({extended: true, limit: '50mb'}))
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
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

