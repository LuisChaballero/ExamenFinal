import React from 'react';
import './App.css';
import './Movie';

class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : []
      
    }
    
  }


  

  componentDidMount(){
    //appURL : 'http://localhost:8080'
    let url = "http://localhost:8080/api/moviedex"
    let settings = {
      method: 'GET'
    }
    

    fetch(url, settings)
      .then(response => {
        if(response.ok){
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .catch( error => {
        console.log(error);
      }); 

  }
 
  render(){
    return (
      <div>
        
        
        
      </div>
    );
  }
}

export default App;
   