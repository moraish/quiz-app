import AppBar from "./components/AppBar"
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
// import Footer from "./components/Footer";
import FooterSmall from "./components/FooterSmall";
import Profile from "./pages/Profile";
import ReviewCard from "./pages/ReviewCard";
import Footer from "./components/Landing/Footer";
import Pricing from "./pages/Pricing";
import Signup from "./pages/SignUp";
import Signin from "./pages/Signin";
import SigninPage from "./pages/SigninPage";
import Categories from "./pages/Category";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          {/* To be removed */}
          <Route path="/review" element={<ReviewCard />} />
          <Route path="/signinpage" element={<SigninPage />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
      {location.pathname === '/' ? <Footer /> : <FooterSmall />}

    </div>
  )
}

export default App;
