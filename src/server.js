const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./data/db');

const app = express();

nunjucks.configure('src/views', {
  express: app,
  noCache: true,
});

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.render("index.html");
});

app.get('/create-point', (req, res) => {


  return res.render("create-point.html");
});

app.post('/save-point', (req, res) => {
  const {
    image,
    name,
    adress, 
    adress2, 
    state, 
    city, 
    items
  } = req.body;

  const query = `
    INSERT INTO places (
      image,
      name,
      adress,
      adress2,
      state,
      city,
      items
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?
    );
  `
  const value = [
    image,
    name,
    adress, 
    adress2, 
    state, 
    city, 
    items
  ];

  function afterInsertData (error) {
    if (error) {
      console.log(error);
      alert('Erro no cadastro.');
    }
    console.log(this);

    return res.render('create-point.html', {saved: true});
  };

  db.run(query, value, afterInsertData);


})  

app.get('/search', (req, res) => {
  const search = req.query.search

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error, rows) {
    if (error) {
      return console.log(error);
    }

    const total = rows.length;

    return res.render('search-result.html', { places: rows, total });
  });
});

app.listen(3333, () => {
  console.log('Server listen on port 3333');
});