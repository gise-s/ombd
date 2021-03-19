//RUTAS DE FRONT: /MOVIES
import React from 'react';
import ReactDOM from "react-dom";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Movies from './Movies';
import Home from './Home';
import User from './User';



export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Movies">
          <Movies />
        </Route>
        <Route  path="/:Movie">
          <Movies />
        </Route>
        <Route  path="/:user">
          <User />
        </Route>
      </Switch>
    </div>
  )
}
