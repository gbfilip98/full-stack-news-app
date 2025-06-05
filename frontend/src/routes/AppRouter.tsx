import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import VerifyEmail from '../pages/VerifyEmail';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/sign-in" element={<SignIn />} />
        {/* Fallback for invalid routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;