import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Home from './pages/Home/index.jsx';
import Movie from './pages/movie'
import './styles/global.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path={':movieId'} element={<Movie />} />
    </Routes>
  </BrowserRouter>
);
