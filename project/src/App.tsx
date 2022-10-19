import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Aside } from './components/AsieBar/Aside/Aside';
import { Header } from './components/Header/Header';
import { Favourites } from './pages/Favourites/Favourites';
import { Game } from './pages/Game/Game';
import { Home } from './pages/Home/Home';
import { Search } from './pages/Search/Search';
import { ROUTES } from './routes/routes';

function App() {
  return (
    <div className="container">
      <Header/>
      <div className="main">
        <div className="aside"><Aside/></div>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home/>}/>
          <Route path={ROUTES.GAME} element={<Game/>}/>
          <Route path={ROUTES.SEARCH} element={<Search/>}/>
          <Route path={ROUTES.FAVOURITES} element={<Favourites/>}/>
          <Route path={'*'} element={<Home/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
