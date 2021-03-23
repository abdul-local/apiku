const express= require('express');
const app= express();
const bodyParser= require('body-parser');
const morgan =require('morgan');
const multer = require('multer');
const path=require('path');
//upload image
app.use('/images', express.static(path.join(__dirname,'images')));
// parsing data
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    
     return res.send("Hello word");

});

// deklarasikan tempat menyimpan filenya
const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime()+'-'+file.originalname)
    }
});
const filterImage=(req,file,cb)=>{
    if(file.mimetype ==='image/png'|| file.mimetype==='image/jpg'|| file.mimetype==='image/jpge'){
        cb(null,true)
    }else{
        cb(null,false)
    }
};
app.use(multer({storage:fileStorage, fileFilter:filterImage}).single('image'));


// route
app.use('/api', require('./router/api/user'));
app.use('/api', require('./router/api/profile'));


const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`server running to PORT ${port}`);
});

