// import { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Routes, Route,Redirect, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//components
import Header from './components/header';
//pages
import HomePage from './pages/homePage';
import DaoPage from './pages/daoPage';
import UserProfile from './pages/UserProfile';
import JobPage from './pages/JobPage';
import NewsPage from './pages/NewsPage';
import ArticlePage from './pages/ArticlePage';
import Membership from './pages/Membership';
import ProposalPage from './pages/ProposalPage';
import Adverstise from './pages/Adverstise';
function App() {
const navigate = useNavigate()
const isMember = useSelector((state)=>state.user)
    
    return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dao/:contract" element={<DaoPage />} />
        <Route path="/users/:user" element={<UserProfile />} />
        <Route path="/jobBoard" element={<JobPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<ArticlePage />} />
        <Route path='/membership' element={<Membership/>}/>
        <Route path='/proposal/:id' element={<ProposalPage/>}/>
        <Route path='/advertise' element={<Adverstise/>}/>

      </Routes>
    </div>
  );
}

export default App;
