import React from 'react';
import axios from 'axios';

import { Fragment, useState } from 'react';

export default class Movies extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      
      input: '',
      Search: '',

    }
    //bind funciones
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {//cambia el input
    console.log(event.target.value)
  }

  handleSubmit(event) {
    console.log( this.input.current.value);
    event.preventDefault();
  }

  componentDidMount() {

    axios.get("http://www.omdbapi.com/?apikey=20dac387&s=lego")//mi page api
      .then(res => {
        this.setState({ movies: res.data.Search })
      })
  }

  render() {

    return (
      <div>

        <div>  {this.state.movies.map(movies => <img src={movies.Poster} alt="peliculaBatman" />)}</div>

        <Fragment>
          <h1> Search</h1>
          <form className="row" onSubmit={this.handleSubmit} >
            <div className="col-md-3">
              <input type="text" placeholder="Search" className="form-control" onChange={this.handleChange} name="search" ref={this.input}></input>
            </div>
            <button type="submit" value="Submit" className="btn btn-primary">Enviar</button>
          </form>
          <ul>
            <li>{this.state.search}</li>
          </ul>
        </Fragment>


      </div>

    )
  }
}
