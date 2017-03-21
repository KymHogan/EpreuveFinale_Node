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

//Fonctionne
app.get('/provinces',  (req, res, next) => {
	var obj;
	fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
		if(err) return console.error(err);
		obj = JSON.parse(data);
		console.log(obj);

		res.render('index.ejs', {adresse: obj});
	});
});

//Fonctionne
app.get('/collection',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);
      // renders index.ejs
      // affiche le contenu de la BD 
      res.render('index.ejs', {adresse: resultat});
    })
});

//Fonctionne
app.get('/detruire',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
      if(err) return next(err);

      db.collection('adresse').deleteMany()

      // renders index.ejs
      // affiche le contenu de la BD 
      res.render('index.ejs', {adresse: resultat});
    })
});

/*
app.get('/ajoutPlusieurs',  (req, res, next) => {
	var cursor = db.collection('adresse').find().toArray(function(err, resultat){
    	if(err) return next(err);

		var obj;
		fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
			if(err) return console.error(err);
			obj = JSON.parse(data);
			console.log(obj);
			db.collection('adresse').insertMany([{"code":"NF","nom":"Terre-Neuve","capital":"St-john"},{"code":"IPE","nom":"Ile du Prince-Édouard ","capital":"Charlottetown"},{"code":"NS","nom":"Nouvelle Écosse","capital":"Halifax"},{"code":"NB","nom":"Nouveau-Brunswick","capital":"Fredericton"},{"code":"QC","nom":"Québec","capital":"Québec"},{"code":"ON","nom":"Ontario","capital":"Toronto"},{"code":"MA","nom":"Manitoba","capital":"Winipeg"},{"code":"SK","nom":"Saskatshewan","capital":"Regina"},{"code":"AL","nom":"Alberta","capital":"Edmonton"},{"code":"BC","nom":"Colombie Britannique","capital":"Victoria"},{"code":"NU","nom":"Nunavut","capital":"Igaluit"},{"code":"YT","nom":"Yukon","capital":"Whitehorse"},{"code":"NT","nom":"Territoire du Nord-Ouest","capital":"Yellowknife"}]);
		});
	})
});
*/
