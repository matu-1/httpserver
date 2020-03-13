var url = 'http://localhost:3000/usuario/';
var data = {
  nombre: 'example',
  anime: 'naruto',
  anio: 20125,
};

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));