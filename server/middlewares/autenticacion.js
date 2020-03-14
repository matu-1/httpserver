const jwt = require('jsonwebtoken');

//verifica el token del usuario
let verificarToken = (req, res, next) => {
  let token = req.get('token');
  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if(err){
      return res.status(401).json({
        ok: false,
        err,
      });
    }
    req.usuario = decoded.usuario;
    next();
  } )
};

//verifica que tenga ADMIN_ROLE -> admin
let verificarAdminRol = (req, res, next) => {
    let usuario = req.usuario;
    if(usuario.role != 'ADMIN_ROLE'){
      return res.status(400).json({
        ok: false,
        err: {message: `el rol ${usuario.role} no tiene permiso | el usuario no es administrador`},
      });
    }
    next();
}

module.exports = {
  verificarToken,
  verificarAdminRol,
}