/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { createContext, useState, useContext } from "react";

const UserContext=createContext();

export const UserProvider=({ children })=>{
    const [user, setUser]=useState(null);
    const API_URL=process.env.REACT_APP_BACKEND_URL;

    const registerUser=async(userData)=>{
        try{
            const response=await fetch(`${API_URL}/registerUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const result=await response.json();
            if(response.ok){
                setUser(result.user);
            }
            return { message: result.message, ok: response.ok, username: result.username };
        }
        catch(err){
            console.log(err);
        }
    };

    const loginUser=async(userData)=>{
        try{
            const response=await fetch(`${API_URL}/loginUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const result=await response.json();
            if(response.ok){
                setUser(result.user);
            }
            return { message: result.message, ok: response.ok, username: result.username };
        }
        catch(err){
            console.log(err);
        }
    };

    const logoutUser=async()=>{

    };

    const deleteUser=async(username)=>{
        try{
            const response=await fetch(`${API_URL}/deleteUser`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username})
            });
            const result=await response.json();
            return { message: result.message, ok: response.ok };
        }
        catch(err){
            console.log(err);
        }
    };

    return(
        <UserContext.Provider value={{ registerUser, loginUser, deleteUser, logoutUser }}>
            { children }
        </UserContext.Provider>
    )
};

export const useUser=()=>useContext(UserContext);