/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, { useState, useEffect } from "react";
import { usePhoto } from "../../contexts/PhotoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function NasaPhoto(){
    const { fetchPhoto, inFav, toggleFav }=usePhoto();
    const [data, setData]=useState(null);
    const [infav, setInfav]=useState(false);
    const navigate=useNavigate();
    const username=localStorage.getItem("username") || "";
    
    const getToday=()=>{
        const today=new Date();
        return today.toISOString().slice(0, 10);
    };
    
    const today=getToday();
    const initialDate=localStorage.getItem("date") || today;
    const [date, setDate]=useState(initialDate);
    localStorage.setItem("date", date);

    const setPreviousDate=()=>{
        const currentDate=new Date(date);
        currentDate.setDate(currentDate.getDate()-1);
        const previousDate=currentDate.toISOString().slice(0, 10);
        setDate(previousDate);
        localStorage.setItem("date", previousDate);
    };

    const setNextDate=()=>{
        const currentDate=new Date(date);
        currentDate.setDate(currentDate.getDate()+1);
        const todayDate=new Date(today);
        if(currentDate>todayDate) return;
        const nextDate=currentDate.toISOString().slice(0, 10);
        setDate(nextDate);
        localStorage.setItem("date", nextDate);
    };

    const changeDate=(e)=>{
        setDate(e.target.value);
        localStorage.setItem("date", e.target.value);
    };

    useEffect(()=>{
        const fetchData=async()=>{
            if(date){
                const data=await fetchPhoto(date);
                if(data){
                    setData(data);
                    // console.log(data);
                }
            }
        }
        fetchData();
        inFavourite();
    }, [date]);

    const inFavourite=async()=>{
        if(username===""){
            setInfav(false);
            return;
        }
        if(date){
            try{
                const res=await inFav(username, date);
                if(res.ok){
                    setInfav(res.result);
                }
            }
            catch(err){
                console.log(err.message);
            }
        }
    }

    const toggleFavorites=async(e)=>{
        const username=localStorage.getItem("username") || "";
        if(username===""){
            navigate("/login");
        }
        e.preventDefault();
        try{
            const res=await toggleFav(username, data.title, data.date);
            if(res.ok){
                toast.success(res.message);
                inFavourite();
            }
            else{
                toast.error(res.message);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }

    if(!data) return <div/>
    
    return(
        <div className="apod-page">
            <div className="apod-details">
                <div className="apod-header">
                    <h1>{data.title}</h1>
                </div>
                <div className="controls">
                    <div className="control-buttons">
                        <img src="./previous.png" alt="previous" onClick={setPreviousDate}/>
                        <p>{data.date}</p>
                        <img src="./next.png" alt="next" onClick={setNextDate}/>
                    </div>
                    <div className="control-input">
                        <p>Choose a date</p>
                        <input type="date" value={date} onChange={changeDate} max={today}/>
                    </div>
                </div>
                <button onClick={toggleFavorites}>
                    {infav ? "Remove from favourites" : "Add to favourites" }                    
                    {/* <img src={infav ? "unlike.png" : "like.png"} alt={infav ? "unlike" : "like"}/> */}
                </button>
                <div className="apod-contents">
                    <p>{data.explanation}</p>
                    <a href={data.hdurl}>
                        {data.media_type==="image" ? (
                            <img src={data.hdurl} alt={data.title}/>
                        ): (
                            <iframe src={data.url} title={data.title} frameBorder="0"/>
                        )}
                    </a>
                </div>
            </div>
        </div>
    )
}