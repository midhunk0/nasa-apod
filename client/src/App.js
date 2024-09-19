import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import Register from "./components/auth/Register";
import { NasaPhoto } from "./components/pages/NasaPhoto";
import { Favourites } from "./components/pages/Favourites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

function App() {
    return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route element={<Navbar/>}>
				<Route path="/" element={<NasaPhoto/>}/>
				<Route path="/favourites" element={<Favourites/>}/>
				</Route>
			</Routes>
			<ToastContainer 
				toastStyle={{background: "#003B41"}}
                position="bottom-right" 
                autoClose={2000} 
                hideProgressBar={true} 
                newestOnTop={false} 
                closeOnClick={true} 
                rtl={false}
                pauseOnFocusLoss={true} 
                draggable={true} 
                theme="colored"
                pauseOnHover={true}
            />
		</BrowserRouter>
    );
}

export default App;
