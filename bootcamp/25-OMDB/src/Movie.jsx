import React from 'react';
import axios from 'axios';

export default class Movie extends React.Component {
    constructor(){
        super()
       this.state={movie:[]}
        
    }
 
  componentDidMount () {

    axios.get(`http://www.omdbapi.com/?apikey=20dac387&s=${this.state.search}`)//mi page api
      .then(res => {
          this.setState({movies:res.data.Search})
       
      })
  }

  render() {
    
    return (

    <div>  { this.state.movies.map(movies => <div>{movies.Poster}</div>)}</div>
        )
  }
}