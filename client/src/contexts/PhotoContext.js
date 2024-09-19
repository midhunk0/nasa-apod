/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { createContext, useState, useContext } from "react";

const PhotoContext=createContext();

export const PhotoProvider=({ children })=>{
    const [data, setData]=useState(null);
    const [favourites, setFavourites]=useState(null);
    const NASA_API=process.env.REACT_APP_NASA_KEY;
    const API_URL=process.env.REACT_APP_BACKEND_URL;

    const fetchPhoto=async(date)=>{
        try{
            const response=await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API}&date=${date}`);
            const result=await response.json();
            setData(result);
            return result;
        }   
        catch(err){
            console.log(err);
        } 
    };

    const fetchFav=async(username)=>{
        try{
            const response=await fetch(`${API_URL}/fetchDates/${username}`);
            const result=await response.json();
            setFavourites(result);
            return result;
        }
        catch(err){
            console.log(err);
        }
    }

    const inFav=async(username, date)=>{
        try{
            const response=await fetch(`${API_URL}/inFav/${username}/${date}`);
            const result=await response.json();
            return { message: result.message, result: result.present, ok: response.ok };
        }
        catch(err){
            console.log(err.message);
        }
    }

    const toggleFav=async(username, title, date)=>{
        try{
            const response=await fetch(`${API_URL}/toggleFav`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, title, date })
            });
            const result=await response.json();
            return { message: result.message, ok: response.ok }
        }
        catch(err){
            console.log(err);
        }
    };

    const removeItem=async(username, title, date)=>{
        try{
            const response=await fetch(`${API_URL}/removeItem`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, title, date })
            });
            const result=await response.json();
            return { message: result.message, ok: response.ok }
        }
        catch(err){
            console.log(err);
        }
    };

    return(

        <PhotoContext.Provider value={{ fetchPhoto, fetchFav, inFav, toggleFav, removeItem }}>
            { children }
        </PhotoContext.Provider>
    )
};

export const usePhoto=()=>useContext(PhotoContext);