const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const morgan =require('morgan');


// parsing data
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    
     return res.send("Hello word");

});

// route
app.use('/api', require('./router/api/user'));
app.use('/api', require('./router/api/profile'));


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running to PORT ${port}`);
});

