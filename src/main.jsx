import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Movie from './pages/Movie'
import Search from './pages/Search'
import AuthProvider from './providers/auth'
import Checkout from './pages/Checkout'
import Favoritos from './pages/Favoritos'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<App/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:id' element={<Movie/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/favoritos' element={<Favoritos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
