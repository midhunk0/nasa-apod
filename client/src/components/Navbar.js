import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../contexts/UserContext";

function Navbar(){
    const [show, setShow]=useState(false);
    const navigate=useNavigate();
    const location=useLocation();
    const toggleShow=()=>{
        setShow(!show);
    }
    const { deleteUser }=useUser();

    const tab=location.pathname;
    const username=localStorage.getItem("username")||"";

    const toggleTab=()=>{
        if(tab==="/"){
            navigate("/favourites");
        }
        else{
            navigate("/");
        }
        setShow(prev=>!prev);
    }

    const logoutUser=()=>{
        localStorage.clear();
        navigate("/login");
        toast.success("Logout successfully");
    }

    const doDelete=async()=>{
        try{
            const res=await deleteUser(username);
            if(res.ok){
                toast.success(res.message);
                navigate("/register");
                localStorage.clear();
            }
            else{
                toast.error(res.message);
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }

    return(
        <>
        <div className="navbar">
            <h2 className="title"><a href="/">Nasa apod.</a></h2>
            <div className="options">
                {username===""?<></>:(
                    <>
                        <img src={show?"close.png":"menu.png"} onClick={toggleShow} alt={show?"close":"menu"}/>
                        <div className={`user-options ${show?"show":""}`}>
                            <p onClick={toggleTab}>{tab==="/" ? "Favorites" : "Home"}</p>
                            <p onClick={logoutUser}>Logout</p>
                            <p onClick={doDelete}>Delete</p>
                        </div>
                    </>
                )}
            </div>
        </div>
        <Outlet/>
        </>
    )
}

export default Navbar;