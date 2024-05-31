import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import NovelPage from './pages/NovelPage/NovelPage';
import ControlRoom from './pages/ControlRoom/ControlRoom';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import Library from './pages/Library/Library';
import NavBar from './components/NavBar/NavBar';
import { UserProvider } from './Contexts/UserContext';
import './App.css';

const App = () => {
    return (
        <UserProvider>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/novel/:id" element={<NovelPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="/control" element={<ControlRoom />} /> 
                </Routes>
            </div>
        </UserProvider>
    );
};

export default App;

