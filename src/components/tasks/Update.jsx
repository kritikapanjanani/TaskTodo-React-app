import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Update =({display,update}) => {
    useEffect(() =>{
        setInputs({
        title:update.title,
        body:update.body,
    });
    },[update]);

    
const[Inputs,setInputs] =useState({
    title:"",
    body:"",
   
});
    const change =(e)=>{
        const { name ,value } =e.target;
        setInputs({...Inputs,[name]:value});
    };
const submit= async()=>{
    await axios.put(`http://localhost:1000/api/v/updateTask/${update.id}`,Inputs)
    .then((response)=> {
     toast.success(response.data.message);
    });
    display("none");
};
return <div className="p-5 d-flex justify-content-center align-items-center flex-column update">
    <h3 className="update1">Update your Task!</h3>
    <input 
    type="text" 
    className="todo-inputs my-4 w-50 py-1" 
    name="title"
    value={Inputs.title} 
    onChange={change} />


    <textarea 
    className="todo-inputs w-50 py-0" 
    name="body"
    value={Inputs.body} 
    onChange={change}/> 
    <div>
    <button className="btn btn-dark my-4 "onClick={submit}>UPDATE</button>
    <button className="btn btn-danger my-4 mx-4" onClick={()=>{display("none")}}>CLOSE</button>
    </div>
</div>
};
export default Update;