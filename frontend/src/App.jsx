// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import CityInfo from './pages/Cityinfo.jsx';
import CityDetails from './pages/CityDetails.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/info/:city" element={<CityInfo />} />
          <Route path="/city/:cityName" element={<CityDetails />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* 2. Add the new routes for authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;