import './scss/app.scss';
import Header from './components/Header';

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import pizzas from './pizzas.json';
import Card from './components/pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="card" exact element={<Card />} />
            <Route path="/" exact element={<Home />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
