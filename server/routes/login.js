const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    password: ';)',
    google: true,
  }
}

app.post('/google', async (req, res) => {
  let token = req.body.idtoken;
  userGoogle = await verify(token);
  Usuario.findOne({email: userGoogle.email}, (err, usuarioDB) => {
    if(err) {
      return res.status(500).json({ ok: false, err,});
    }

    if(usuarioDB){
      if(usuarioDB.email == false) {  //si se logeo de forma normal ants o ya tiene una cuenta 
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Debe logearse de forma normal'
          },
        });

      }else{
        let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, {expiresIn: process.env.DURACION_TOKEN})
        res.json({ ok: true, usuario: usuarioDB, token});
      }

    }else{
      let usuario = new Usuario(userGoogle);
      usuario.save((err, usuarioDB) => {
        if(err){
          return res.status(400).json({ ok: false,  err,});
        }
        let token = jwt.sign({usuario: usuarioDB}, process.env.SEED, {expiresIn: process.env.DURACION_TOKEN})
        res.json({ ok: true, usuario: usuarioDB, token});
      });
    }
  })
});

module.exports = app;