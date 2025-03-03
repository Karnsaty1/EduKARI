const express=require('express');
const app=express();
require('dotenv').config();
const path=require('path');
const port=process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')));
const cors=require('cors');
const corsOptions={
    origin:process.env.FRONTEND,
    credentials:true
}
app.use(cors(corsOptions));
app.use('/data',require('./routes/data'));
app.use('/auth',require('./routes/auth'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});

