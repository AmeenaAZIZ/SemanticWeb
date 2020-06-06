import React from 'react';
import { Redirect, Router, Route } from 'react-router-dom';
import ResourcesList from './components/test1';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cards from './components/Cards';
import CardsFetch from './components/CardsFetch';
import CardsFetchAuteur from './components/CardsAuteursFemmes';

import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import history from './history.js';
import Detail from './components/Detail';
import DetailsAuteur from './components/DetailsAuteur';
import AddCard from './components/Addcard';
import CardsFetchNep from './components/CardFetchNeptune';

const NonProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => {
    return (
        <React.Fragment>
          <NavBar />
          <Component />
          <Footer />
        </React.Fragment>
    );
  }} />
);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => {
    if(localStorage.getItem('user')) {
      return (
          <React.Fragment>
            <NavBar />
            <Component />
            <Footer />
          </React.Fragment>
      );
    } else {
      return (
          <Redirect to='/' />
      );
    }
  }} />
);

export default function App() {
  return (
    <Router history={history}>
      <NonProtectedRoute path="/" component={Home} exact />
      <NonProtectedRoute path="/register" component={Register} />
      <NonProtectedRoute path="/login" component={Login} />
      <NonProtectedRoute path="/listeFemmes" component={Cards} />
      <NonProtectedRoute path="/listeHommes" component={Cards} />
      <NonProtectedRoute path="/test" component={ResourcesList} />
      <NonProtectedRoute path="/details/:id" component={Detail} />
      <NonProtectedRoute path="/listeFemmesFetched" component={CardsFetch} />
      <NonProtectedRoute path="/listAuteurFetched" component={CardsFetchAuteur} />
      <NonProtectedRoute path="/detailsAuteur/:id" component={DetailsAuteur} />
      <NonProtectedRoute path="/CardsFetchNep" component={CardsFetchNep} />
      <NonProtectedRoute path="/artiste/add" component={AddCard} />
    </Router>
);
}