import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddPage from "./Pages/AddPage";
import Search from "./Pages/Search";
import Navbar, { Pages } from "./Pages/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <header className="App-header">
                    <Routes>
                        <Route path={Pages.Login} element={<Login />} />
                        <Route path={Pages.Home} element={<Search />} />
                        <Route path={Pages.Register} element={<Register />} />
                        <Route path={Pages.Add} element={<AddPage />} />
                    </Routes>
                </header>
            </BrowserRouter>
        </div>
    );
}

export default App;
