import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="wrapper">
      <section className="container">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default MainLayout;
