const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario')//importo modelo bd
const bcrypt =require('bcrypt');
const _ = require('underscore');

router.post('/',(req,res)=>{
let body = req.body;

Usuario.findOne({email:body.email},(err,usuarioDB)=>{

if(err){
    return res.status(500).json({
        ok:false,
        err
    });
}
if(!usuarioDB){
    return res.status(400).json({
        ok:false,
        err:{
            message:"(Usuario) o contraseña incorrectas"
        }
    }); 
}
if(!bcrypt.compareSync(body.password,usuarioDB.password)){

    return res.status(400).json({
        ok:false,
        err:{
            message:"Usuario o (contraseña) incorrectas"
        }
    });    
}
res.json({
    ok:true,
    usuario:usuarioDB,
    token:'123'
})

})

})

module.exports=router;