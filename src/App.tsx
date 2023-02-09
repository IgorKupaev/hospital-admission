import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';

import './App.scss';

import type { FC } from 'react';

const App: FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />}/>
        <Route path="*" element={<MainPage />}/>
        <Route path="/" element={<MainPage />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
