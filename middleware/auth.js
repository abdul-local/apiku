const jwt=require('jsonwebtoken')

const config=require('../config/secret');
function verifikasi(roles){
    return function (req,res,next){
        // cek authorizzation header
        const tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            const token=tokenWithBearer.split(' ')[1];
            // verifikasi
            jwt.verify(token,config.secret, (err,decoded)=>{
                if(err){
                    return res.status(401).json({msg:'Token tidak terdaftar'});
                }else {
                    if(roles==2){
                        req.auth=decoded;
                        next();
                    }else {
                        return res.status(401).json({msg:'Gagal role authentication'});
                    }
                }
            })
        }else{
            return res.status(401).json({msg:'token tidak tersedia'});
        }
    }
}
module.exports=verifikasi;