import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import MainPage from './pages/MainPage'
import MyCardsPage from './pages/MyCardsPage'
import MarketPage from './pages/MarketPage'
import OpenpacksPage from './pages/OpenpacksPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/mycards" element={<MyCardsPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/openpacks" element={<OpenpacksPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)