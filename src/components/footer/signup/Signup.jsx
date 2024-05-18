import React, { useState } from "react";
import "./signup.css";
import "./headingcomp";
import HeadingComp from "./headingcomp";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Signup = () => {
    const history =useNavigate();
    const [Inputs,setInputs]=useState({
        email:"",
        username:"",
        password:"",
    });
    const change =(e) =>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
    } ;
    const submit= async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:1000/api/v1/register",Inputs).then((response) =>{
            if(response.data.message === "User Already Exists"){
                alert(response.data.message);
            }
            else{
                alert(response.data.message);
                setInputs({
                    email:"",
                    username:"",
                    password:"",
                  });
                   history("/signin");
            }
            
        });
       
    };
       return (
    <div className="signup">
    <div className="container">
        <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center"> 
            <div className="d-flex flex-column w-50 p-5">
                <input 
                className="p-2 my-3 input-signup"
                type="email"
                name="email" 
                placeholder="Enter your email"
                onChange={change}
                value={Inputs.email}/> 
                <input 
                className="p-2 my-3 input-signup"
                type="username"
                name="username" 
                placeholder="Enter your username"
                onChange={change}
                value={Inputs.username}
                />
                

                <input 
                className="p-2 my-3 input-signup"
                type="password"
                name="password" 
                placeholder="Enter your password"
                onChange={change}
                value={Inputs.password}/>
               

                <button className="signup-btn"onClick={submit} ><b>Sign Up</b></button>
                </div>
                </div>
                <div className="col-lg-4 col-left column d-flex justify-content-center align-items-center"> 
                <HeadingComp first="Sign Up"/>
             </div>
        </div>
    </div>
    </div>
    );
};
export default Signup;