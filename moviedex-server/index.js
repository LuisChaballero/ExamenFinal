let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { MovieList } = require('./model');
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});


app.get('/api/moviedex', (req, res) =>{

	MovieList.getAllMovies()
		.then( result =>{
			return res.status(200).json(result);
		}) 
		.catch( error => {
			res.statusMessage = "Error con la conexion en la BD";
			res.status(500).send();
		})
	

});	

app.post('/api/moviedex', jsonParser, (req,res) =>{
	let film_title = req.body.film_title;
	let year = req.body.year;
	let rating = req.body.rating;

	if (!film_title || film_title == ""){
		res.statusMessage = "Titulo de pelicula no proporcionado";
		res.status(406).send();
	}

	if (!year || year == ""){
		res.statusMessage = "Año de pelicula no proporcionado";
		res.status(406).send();
	}

	if (!rating || rating == ""){
		res.statusMessage = "Calificación de pelicula no proporcionado";
		res.status(406).send();
	}

	let newMovie = {
		film_title,
		year,
		rating
	};

	MovieList.createMovie( newMovie)
		.then( movie => {
			if (movie){
				res.statusMessage = "Pelicula agregada a la BD";
				return res.status(201).json(movie);
			}
		})
		.catch( error => {
			res.statusMessage = "Error en la conexion con la BD";
			res.status(500).send();
		})





});

let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}