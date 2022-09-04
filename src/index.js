import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';
import Home from './pages/home/index';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import home from './pages/home/index';
import CadastroUsuario from './pages/cadastroUsuario/cadastroUsuario';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes>
        <Route path = "/"  exact={true} element={<App />}></Route>
        <Route path='/cadastroProduto' element></Route>
        <Route path='/cadastroUsuario' element={<CadastroUsuario/>}></Route>
        <Route path='/' element></Route>
        <Route path='/listagemProdutos' element></Route>
        <Route path='/carrinho' element></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
