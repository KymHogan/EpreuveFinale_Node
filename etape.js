const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

var db 

MongoClient.connect('mongodb://127.0.0.1/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

app.get('/',  (req, res, next) => {
    res.redirect('/collection');
})

app.get('/fichier',  (req, res, next) => {
	var obj;
	fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
	if(err) return console.error(err);
	obj = JSON.parse(data);
	console.log(obj);
	res.send(obj)
	res.render('index.ejs', {adresse: res});
	});
});

app.get('/provinces',  (req, res, next) => {
	var obj;
	fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
		if(err) return console.error(err);
		obj = JSON.parse(data);
		console.log(obj);
		res.render('index.ejs', {adresse: obj});
	});
});

app.get('/collection',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      res.render('index.ejs', {adresse: resultat});
    })
});

app.get('/ajout',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      var capitalChiffre = Math.floor((Math.random()*100))+100;
      db.collection('adresse').insertOne({
			"code" : "QC",
			"nom" : "Québec",
			"capital": capitalChiffre
      })
      res.render('index.ejs', {adresse: resultat});
    })
    res.redirect('/collection');
});

app.get('/detruire',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      db.collection('adresse').deleteMany()
    })
    res.redirect('/collection');
});


app.get('/ajoutPlusieurs',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
    	if(err) return next(err);
		var obj;
		fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
			if(err) return console.error(err);
			obj = JSON.parse(data);
			console.log(obj);

			db.collection('adresse').insertMany(JSON.parse(data));
		});
	})
	res.redirect('/collection');
});

