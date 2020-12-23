require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
 
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
// parse application/json
//app.use(bodyParser.json())
app.use(express.json())

//Importo archivo app con peticiones
app.use(require('./routes'))



//conexion a mongo
mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},(err)=>{
  if(err){
    throw err;
  }
  console.log('base de datos online');
});
app.listen(process.env.PORT,()=> console.log(`escuchando el puerto 3000`));