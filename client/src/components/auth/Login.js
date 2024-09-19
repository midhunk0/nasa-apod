import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";

export function Login(){
    const [data, setData]=useState({
        credential: "",
        password: ""
    });
    const navigate=useNavigate();
    const { loginUser }=useUser();
    const [visible, setVisible]=useState(false);

    const doLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await loginUser(data);
            if(res.ok){
                toast.success(res.message);
                localStorage.setItem("username", res.username);
                navigate("/");
            }
            else{
                toast.error(res.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const toggleVisibility=()=>{
        setVisible(!visible);
    }

    return(
        <div className="form-page">
            <div className="image-div">
                <img src="./nasa.jpg" alt="nasa"/>
            </div>
            <h1 className="logo">Nasa apod.</h1>
            <div className="form-div">
                <div className="form-head">
                    <h1>Login to your account</h1>
                    <br/>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                    <br/>
                </div>
                <form className="form" onSubmit={doLogin}>
                    <input type="text" placeholder="Username/Email" onChange={(e)=>setData({...data, credential: e.target.value})}/>
                    <div className="password">
                        <input type={visible ? "text" : "password"} placeholder="Password" onChange={(e)=>setData({...data, password: e.target.value})}/>
                        <img src={visible ? "visibility-on.png" : "visibility-off.png"} alt={visible?"visibility-on":"visibility-off"} onClick={toggleVisibility}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}