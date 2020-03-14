
//puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//tiempo de duracion  60s, 60min, 24h, 30d
process.env.DURACION_TOKEN = 60 * 60 * 24 * 30 ;

//seed de autenticacion (clave secreta)
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';

//base de datos
let urlBD;

if(process.env.NODE_ENV == 'dev'){
  urlBD = 'mongodb://localhost:27017/cafe';
}else{
  urlBD = 'mongodb+srv://matu:7991@cluster0-p5sby.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URL_DB = urlBD;
