const mysql = require('mysql')

 const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"express_db"
});

// connecr to db
con.connect(err=>{
    if (err) throw err;
    console.log("connected to database");

   
});

module.exports=con;