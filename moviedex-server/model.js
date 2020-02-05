let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let peliculaCollection = mongoose.Schema({
    film_ID = {
        type: uuid()

    }, 
    film_title = {
        type: String
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    }
});

let Movie = mongoose.model('movies', peliculaCollection);

let MovieList = {
   getAllMovies: function(){
       return Movie.find()
        .then( movies => {
            return movies;
        })
        .catch( error => {
            throw Error(error);
        });
    },
    createMovie : function ( newMovie ){
        return Movie.create( newMovie )
            .then ( movie => {
                return movie;
            })
            .catch( error => {
                throw Error(error);
            })
        }
}


module.exports = {

    MovieList
    
};