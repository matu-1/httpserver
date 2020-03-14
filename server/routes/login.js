const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

app.post('/login', (req, res) => {
  let data = req.body;
  Usuario.findOne({email: data.email}, (err, usuarioDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err,
      });
    }
    if(!usuarioDB){
      return res.status(400).json({
        ok: false,
        err:{
          message: '(usuario) o contraseña incorectos',
        },
      });
    }

    if(!bcrypt.compareSync(data.password, usuarioDB.password)){
      return res.status(400).json({
        ok: false,
        err:{
          message: 'usuario o (contraseña) incorectos',
        },
      });
    }
    let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, {expiresIn: process.env.DURACION_TOKEN})
    res.json({ ok: true, usuario: usuarioDB, token});
  });
  
});

module.exports = app;