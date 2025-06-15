/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { usePhoto } from "../../contexts/PhotoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Favourites(){
    const { fetchFav, removeItem }=usePhoto();
    const [data, setData]=useState(null);
    const [hover, setHover]=useState("");
    const navigate=useNavigate();

    const username=localStorage.getItem("username");

    const fetchData=async()=>{
        if(username){
            const result=await fetchFav(username);
            if(result){
                setData(result);
                toast.success(result.message);
            }
            else{
                toast.error(result.message);
            }
        }
        else{
            navigate("/login");
            toast.error("User not found");
        }
    }

    useEffect(()=>{
        fetchData();
    }, [username]);

    if(!data){
        return <div/>
    }

    const dateCorrection=(date)=>{
        const currentDate=new Date(date);
        // currentDate.setDate(currentDate.getDate()+1);
        const correctDate=currentDate.toISOString().slice(0, 10);
        localStorage.setItem("date", correctDate);
    }

    const showPhoto=(date)=>{
        dateCorrection(date);
        navigate("/");
    }

    const remove=async(date, title)=>{
        dateCorrection(date);
        const correctDate=localStorage.getItem("date");
        const username=localStorage.getItem("username") || "";
        try{
            const res=await removeItem(username, title, correctDate);
            if(res.ok){
                toast.success(res.message);
                fetchData();
            }
            else{
                toast.error(res.message);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    return(
        <div className="fav-page">
            <h1>Favourites</h1>
            <div className="fav-items">
                {data.data.map((item)=>(
                    <div key={item.date} className="fav-item" onMouseEnter={()=>setHover(item.date)} onMouseLeave={()=>setHover("")}>
                        <p onClick={(e)=>{e.preventDefault();showPhoto(item.date)}}>{item.title}</p>
                        <img src={hover===item.date ? "remove.png" : "remove-dark.png"} alt="remove" onClick={()=>remove(item.date, item.title)}/>
                    </div>
                ))}
            </div>
        </div>
    )
}