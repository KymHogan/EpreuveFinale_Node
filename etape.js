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


console.log("Ça marche!");

/* ================= lecture json ==================== */


/* ================================================== */

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

/*
app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url)
 
    var cursor = db.collection('adresse').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    // renders index.ejs
    // affiche le contenu de la BD
    res.render('index.ejs', {adresse: resultat})

    })   

})
*/

// va chercher le form de la collection adresse et affiche le contenu de la bdd
app.get('/',  (req, res, next) => {
    /*var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
	    var obj;
		fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
			if(err) return console.error(err);
			obj = JSON.parse(data);
			console.log(obj);
			//res.send(obj.toString());
			res.render('index.ejs', {adresse: obj});
		});
      // renders index.ejs
      // affiche le contenu de la BD 
      //res.render('index.ejs', {adresse: resultat});
    }) */

	res.render('index.ejs', {adresse: res});
})


app.get('/fichier',  (req, res, next) => {
	/*
	console.log("fichier");
	var obj;
	fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
		if(err) return console.error(err);
		obj = JSON.parse(data);
		console.log(obj);
		//res.send(obj.toString());
		res.render('index.ejs', {adresse: obj});
		//res.write(obj);
	});
	*/
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