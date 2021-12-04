import React from 'react';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import About from './pages/About';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ExperimentsPage from './pages/ExperimentsPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<HomePage/>}>
        </Route>
        <Route path='/blog' element={<BlogPage/>}>
        </Route>
        <Route path='/about' element={<About/>}>
        </Route>
        <Route path='/experiments' element={<ExperimentsPage/>}>
        </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
