import React,{ useState } from "react";
import "./signup.css";
import "./headingcomp";
import HeadingComp from "./headingcomp";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store";

const Signin = () => {
    const dispatch=useDispatch();
    const history =useNavigate();
    const [Inputs,setInputs]=useState({
        email:"",
        password:"",
    });
    const change =(e) =>{
        const {name,value}=e.target;
        setInputs({...Inputs,[name]:value});
    } ;
    const submit= async(e) =>{
        e.preventDefault();
        await axios
        .post("http://localhost:1000/api/v1/signin",Inputs)
        .then((response) =>{
           sessionStorage.setItem("id",response.data.others._id);
           dispatch(authActions.login());
            history("/tasks");
       
    });
}
    return (
    <div className="signup">
        
    <div className="container">
        <div className="row">
        <div className="col-lg-4 col-right column d-flex justify-content-center align-items-center"> 
                <HeadingComp first="Sign In"/>
             </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center"> 
            <div className="d-flex flex-column w-50 p-5">
                <input 
                className="p-2 my-3 input-signup"
                type="email"
                name="email" 
                placeholder="Enter your email"
                value={Inputs.email}
                onChange={change}
                /> 

                <input 
                className="p-2 my-3 input-signup"
                type="password"
                name="password" 
                placeholder="Enter your password"
                value={Inputs.password}
                onChange={change}
                />
                <button className="signup-btn" onClick={submit} ><b>Sign In</b></button>
                </div>
                </div>
                
        </div>
    </div>
    </div>
    );
};
export default Signin;