const express = require('express')
const md5=require('md5');
const con = require('../../config/db');
const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
const ip =require('ip');
const verifikasi = require('../../middleware/auth');



const router=express.Router();


router.post('/register', (req,res)=>{
     
     const post ={
          username:req.body.username,
          email:req.body.email,
          password:md5(req.body.password),
          role:req.body.role,
          tanggal_daftar:new Date()
     }; 

     con.query(`SELECT * FROM user WHERE email='${post.email}'`,(err,result)=>{
          if (err) throw err;
          if (result.length ==0){
               con.query(`INSERT INTO user (id, username, email, password, role, tanggal_daftar) VALUES ('${post.id}', '${post.username}', '${post.email}', '${post.password}', '${post.role}', '${post.tanggal_daftar}')`,(err, result)=>{
                    if (err) throw err;
                    res.status(200).json({msg:'berhasil register data'});
               })
          }else {
               res.status(203).json({msg:'email anda sudah di registerasi'});
          }
     })
     
     

});
router.post('/login',(req,res)=>{

     const post={
          email:req.body.email,
          password:md5(req.body.password)
     };
     con.query(`SELECT*FROM user WHERE email="${post.email}" AND password="${post.password}"`,(err,result)=>{
          if (err) throw err;
          if (result.length ==1){
               const token=jwt.sign({result},secret.secret,{
                    expiresIn:3600
               });
               const id_user=result[0].id;
               const data={
                    id_user:id_user,
                    akses_token:token,
                    ip_addres:ip.address()
               };
               con.query(`INSERT INTO akeses_token (id_user,akses_token,ip_address) VALUES ('${data.id_user}', '${data.akses_token}','${data.ip_addres}')`,(err,result)=>{
                    if (err) throw (err);
                    res.status(200).json({token:data.akses_token});
               })

          }else {
               res.status(401).json({msg:'Email atau password Salah! '});
          }
          
     })
    

})

router.post('/rahasia',verifikasi(2),(req,res)=>{

     res.send("halaman rahasia")

})
module.exports=router;