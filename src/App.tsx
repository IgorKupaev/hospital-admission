import React from 'react';
import type { FC } from 'react';
import './App.scss';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

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
