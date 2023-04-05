import './scss/app.scss';
import Header from './components/Header';

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import pizzas from './pizzas.json';
import Card from './components/pages/Cart';
import NotFoundBlock from './components/NotFoundBlock';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import FullPizza from './components/pages/FullPizza';
import MainLayout from './layouts/MainLayout';

// export const AppContext = React.createContext({});

function App() {
  // const [searchValue, setSearchValue] = React.useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/card');
  };

  return (
    // <AppContext.Provider value={{ searchValue, setSearchValue }}>
    /* <div>
        <div>
          <button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
          </button>
          <span>{count}</span>
          <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
          </button>
          <button aria-label="Decrement value" onClick={() => dispatch(incrementByAmount())}>
            Random namber
          </button>
          <span>{count}</span>
        </div>
      </div> */
    // <div className="wrapper">
    //   <Header />
    //   <div className="content">
    //     <div className="container">

    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="card" exact element={<Card />} />
        <Route path="" exact element={<Home />} />
        <Route path="*" exact element={<NotFound />} />
        <Route path="pizza/:id" exact element={<FullPizza />} />
      </Route>
    </Routes>
    //     </div>
    //   </div>
    // </div>
    // </AppContext.Provider>
  );
}

export default App;
