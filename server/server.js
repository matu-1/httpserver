const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./config/config');

app.use(express.static(__dirname + '/../public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));
 
mongoose.connect(process.env.URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, err => {
  if(err) throw err;
  console.log('conectado a la bd.. !!!');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});