import React from 'react';

function createMovie( props ){

    function click(event){
        event.preventDefault();
        let newMovie = {
            film_title : event.target.new.value,
            year : event.target.new.value,
            rating : event.target.new.value

             
        };
        props.createMovie(newMovie);
    }

    return(){
        <form onSubmit={(event) => click(event)}>
            <label id="peliculas">
                Titulo: <input type="text" id="movieTitle"></input>
                Año: <input type="text" id="movieYear"></input>
                Califiacion: <input type="text" id="movieRating"></input>
            </label>
            <button id="peliBoton" >Agregar</button>
        </form>
    }

}



export default Movie;