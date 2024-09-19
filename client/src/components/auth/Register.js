import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";

function Register(){
    const [data, setData]=useState({
        username: "",
        email: "",
        password: ""
    });
    const navigate=useNavigate();
    const { registerUser }=useUser();
    const [visible, setVisible]=useState(false);

    const doRegister=async(e)=>{
        e.preventDefault();
        try{
            const res=await registerUser(data);
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
    };

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
                    <h1>Create a new account</h1>
                    <br/>
                    <p>Already have an account? <a href="/login">Login</a></p>
                    <br/>
                </div>
                <form className="form" onSubmit={doRegister}>
                    <input type="text" placeholder="Username" onChange={(e)=>setData({...data, username: e.target.value})}/>
                    <input type="email" placeholder="Email" onChange={(e)=>setData({...data, email: e.target.value})}/>
                    <div className="password">
                        <input type={visible ? "text" : "password"}placeholder="Password" onChange={(e)=>setData({...data, password: e.target.value})}/>
                        <img src={visible ? "visibility-on.png" : "visibility-off.png"} alt={visible ? "visibility-on" : "visibility-off"} onClick={toggleVisibility}/>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;