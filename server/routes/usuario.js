const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificarToken, verificarAdminRol } = require('../middlewares/autenticacion');

app.get('/usuario', verificarToken, (req, res) => {
  const desde = parseInt(req.query.desde) || 0;
  const limite = parseInt(req.query.limite) || 5;
  Usuario.find({estado: true}, 'nombre email role estado google img')
    .skip(desde).limit(limite)
    .exec((err, usuarios) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    Usuario.count({estado: true}, (err, cantidad) => {
      res.json({ ok: true, usuarios, cantidad});
    });
  
  });
});

app.post('/usuario', [verificarToken, verificarAdminRol], (req, res) => {
  let data = req.body;
  let usuario = new Usuario({
    nombre: data.nombre,
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
    role: data.role,
  });
  usuario.save((err, result) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({ ok: true, usuario: result });
  });
});

app.put('/usuario/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  let data = _.pick(req.body, ['nombre','email','img','role']);
  Usuario.findByIdAndUpdate(id, data, {new: true, runValidators: true}, (err, result) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({ ok: true, usuario: result });
  });
});

app.delete('/usuario/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  // Usuario.findByIdAndRemove(id, (err, userRemove) => {
  Usuario.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, userRemove) => {
    if(err){
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    if(!userRemove){
      return res.status(400).json({
        ok: false,
        err: {
          message: 'usuario no encontrado'
        },
      });
    }
    res.json({ ok: true, usuario: userRemove });
  })
});

module.exports = app;