import AppBar from "./components/AppBar"
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Footer from "./components/Footer";
import FooterSmall from "./components/FooterSmall";
import Profile from "./pages/Profile";
import ReviewCard from "./components/ReviewCard";

function App() {
  const location = useLocation();

  return (
    <div>
      <AppBar />
      <div className="pt-20 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* To be removed */}
          <Route path="/review" element={<ReviewCard />} />
        </Routes>
      </div>
      {location.pathname === '/' ? <Footer /> : <FooterSmall />}

    </div>
  )
}

export default App
