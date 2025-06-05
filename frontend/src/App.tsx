// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/Home/Home';
// import SignIn from './pages/Auth/SignIn';
// import SignUp from './pages/Auth/SignUp';
// import Bookmarks from './pages/Bookmarks';
// import Navbar from './components/Navbar';
// // import Layout from './layouts/Layout';
// // import './App.css'

// const App: React.FunctionComponent = () => {
//   return (
//     <>
//       <Navbar />
//       <Router>
//         {/* <Layout> */}
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/sign-in" element={<SignIn />} />
//             <Route path="/sign-up" element={<SignUp />} />
//             <Route path="/bookmarks" element={<Bookmarks />} />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         {/* </Layout> */}
//       </Router>
//     </>
//   )
// }

// export default App

import { NewsProvider } from './context/NewsContext';
import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <NewsProvider>
      <AppRouter />
    </NewsProvider>
  );
};

export default App;
