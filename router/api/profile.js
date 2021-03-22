const express = require('express');
const con = require('../../config/db');


const router= express.Router();


router.get('/profile', (req,res)=>{
    
    con.query(`select * from mahasiswa`, (err, result)=>{
        if (err) throw err;
        let data = result;

      return   res.status(200).json(data);

    });

})

router.get ('/profile/:id', (req,res)=>{
    let Id= req.params.id;

    con.query(`SELECT * FROM mahasiswa WHERE id_mahasiswa=${Id}`,(err,result)=>{
        if (err) throw err;
        const data= result;
        res.json({ data :data});
       
    })
    
});
router.post('/profile', (req,res)=>{
  
    const {nama, nim , jurusan}=req.body;
    con.query(`INSERT INTO mahasiswa (nama,nim, jurusan) VALUES (?,?,?)`,[nama,nim,jurusan], (err, rows,fields)=>{
        if (err) throw err;
      
        return res.status(200).json({msg:'berhasil post data'});

    })

})
// update data
router.put('/profile/:id', (req, res)=>{
    const id=req.params.id;
    const nama=req.body.nama;
    const nim=req.body.nim;
    const jurusan=req.body.jurusan

    con.query(`UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE id_mahasiswa=?`,[nama,nim,jurusan,id], (err,result)=>{
        if (err) throw err;
        res.status(200).json({msg:'berhasil update data'});
    })
});
// delet data 
router.delete('/profile/:id', (req,res)=>{
    const id=req.params.id;
    con.query(`DELETE FROM mahasiswa WHERE id_mahasiswa=?`,[id],(err,result)=>{
        if (err) throw err;
        res.status(200).json({msg:"Data berhasil dihapus"});
    })
})

// get data join
router.get('/profile_data',(req,res)=>{
    con.query(`SELECT mahasiswa.id_mahasiswa,mahasiswa.nama,mahasiswa.nim,mahasiswa.jurusan,matakuliah.matakuliah,matakuliah.sks from krs JOIN mahasiswa JOIN matakuliah WHERE krs.id_matakuliah=matakuliah.id_matakuliah AND krs.id_mahasiswa=mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa`,(err,result)=>{
        if (err) throw err;

        res.json({msg:result});
    })
})

module.exports=router;