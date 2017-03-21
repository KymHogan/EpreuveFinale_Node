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


var obj;
fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data){
	if(err) return console.error(err);
	obj = JSON.parse(data);
	console.log(obj.toString());
});


app.get('/',  (req, res) => {
   console.log('la route route get / = ' + req.url);
 
    // renders index.ejs
    res.render('index.ejs');
})


/*
function ecritureTableauProvince(){

	var sChaine = "";

	sChaine += "<h1>Tableau de provinces</h1>";
	sChaine += "<table>";
	for (province in obj){

		sChaine += "<tr><td>" + province + "</td><td>" + obj[province].toString() + "</td></tr>";
	}
	sChaine += "</table>";

	return sChaine;
}
*/
/*
http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html; charset=utf8"});
  //response.write("<style>table {border-collapse: collapse;}table, th, td {border: 1px solid black;}td {padding:3%;}</style>");

  //response.write(ecritureTableauProvince());	

  response.end(); 
}).listen(8888);
*/

console.log("Program Ended");