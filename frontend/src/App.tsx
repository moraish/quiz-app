import AppBar from "./components/AppBar"
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/Footer";
import FooterSmall from "./components/FooterSmall";

function App() {
  const location = useLocation();

  return (
    <div>
      <AppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      {location.pathname === '/' ? <Footer /> : <FooterSmall />}
    </div>
  )
}

export default App
