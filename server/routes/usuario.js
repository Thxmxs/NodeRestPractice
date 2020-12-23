const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario')//importo modelo bd
const bcrypt =require('bcrypt');
const _ = require('underscore');

router.get('/', function (req, res) {//le lleva algo al usuario
    
    let desde = req.query.desde || 0;//ver desde que registro
    desde = Number(desde);
    let limite = req.query.limite || 5;//ver cuantos registros poor paginas
    limite = Number(limite);

    Usuario.find({estado:true},'nombre email role estado google')
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
       
            Usuario.countDocuments({estado:true},(err,conteo)=>{
                res.json({
                    ok:true,
                    Cantidad:conteo,
                    usuarios   
                });
            });
        
       });

  });

  router.post('/', function (req, res) {//crear nuevo registros
    let body = req.body;//trae info que pasen por la url
  
let usuario = new Usuario({
    nombre:body.nombre,
    email:body.email,
    password:bcrypt.hashSync(body.password,10),
    role:body.role
});

usuario.save((err,usuarioDB)=>{
if(err){
    return res.status(400).json({
        ok:false,
        err
    });
}
res.json({
    ok:true,
    usuario:usuarioDB
});

});    
  });


  router.put('/:id',function(req,res){//put parra actualizar data-registros
  
      let id=req.params.id;
      let body =_.pick(req.body,['nombre','email','img','role','estado']); 

      Usuario.findByIdAndUpdate(id,body,{new :true,runValidators:true},(err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            usuario:usuarioDB
        });
      })
  })
  router.delete('/:id',function(req,res){//put parra actualizar data-registros
  
    let id=req.params.id;
    
    Usuario.findByIdAndUpdate(id,{estado:false},{new :true},(err,usuarioDB)=>{
      if(err){
          return res.status(400).json({
              ok:false,
              err
          });
      }
      res.json({
          ok:true,
          usuario:usuarioDB
      });
    })
})

  module.exports=router;