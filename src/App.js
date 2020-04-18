import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
// import {  browserHistory } from 'react-router';

import './App.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
import HomePage from './layouts/HomePage';
import Categories from './layouts/Categories';
import Products from './layouts/Products';
import Cart from './layouts/Cart';
import CheckOut from './layouts/CheckOut';
import ProductDescriptionpPage from './layouts/ProductDescriptionpPage';
const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomePage}>
        <Route name='home' path='/' exact component={HomePage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/categories' component={Categories} />
        <Route exact path='/products/:categoryId' component={Products} />
        <Route exact path='/product/:productId' component={ProductDescriptionpPage} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/checkout' component={CheckOut} />
        <Redirect from="*" to="/home" />
      </Route>

      {/* <Route path='*' component={HomePage}/> */}

    </Router>

  );
}

export default App;
