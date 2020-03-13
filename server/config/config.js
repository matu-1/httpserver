
//puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base de datos
let urlBD;

if(process.env.NODE_ENV == 'dev'){
  urlBD = 'mongodb://localhost:27017/cafe';
}else{
  urlBD = 'mongodb+srv://matu:7991@cluster0-p5sby.mongodb.net/cafe?retryWrites=true&w=majority';
}

process.env.URL_DB = urlBD;
