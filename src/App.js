import './scss/app.scss';
import Header from './components/Header';

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import pizzas from './pizzas.json';
import Card from './components/pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

export const AppContext = React.createContext({});

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/card');
  };

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
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
    </AppContext.Provider>
  );
}

export default App;
