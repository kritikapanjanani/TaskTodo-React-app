import React, { useEffect, useState } from "react";
import "./tasks.css";
import TaskCard from "./TaskCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from "./Update";
import axios from "axios";
let id= sessionStorage.getItem("id");
let toUpdateArray=[];

const Tasks = () => {
    const [Inputs,setInputs]= useState({ title: "", body:""});
    const[Array,setArray]=useState([]);
    
    const show=() =>{
        document.getElementById("textarea").style.display="block";
    };
    const change=(e)=>{
        const { name, value } = e.target;
        setInputs({...Inputs,[name]:value });
    };
    const submit = async() => {
        if (Inputs.title === "" || Inputs.body === "") {
            toast.error("Title or body should not be empty!");
        } else {
            if (id) {
                await axios
                    .post("http://localhost:1000/api/v/addTask", {
                        title: Inputs.title,
                        body: Inputs.body,
                        id: id,
                    })
                    .then((response) => {
                        console.log(response);
                        setInputs({ title: "", body: "" });
                        toast.success("Your task is added");
                    })
                    .catch((error) => {
                        console.error("There was an error adding the task!", error);
                        toast.error("There was an error adding the task!");
                    });
            } else {
                setArray([...Array, Inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your task is added");
                toast.error("Task not saved! User needs to sign up...");
            }
        }
    };
    
    
    const del= async (Cardid) =>{
        if (id){
            await axios.delete(`http://localhost:1000/api/v/deleteTask/${Cardid}`,{data:{id:id}})
            .then((response)=> {
               toast.success("Your Task is deleted");
            });

        }
        else{
            toast.error("Please Signup first");
        }
        

    };
    const dis =(value) => {
        console.log(value);
        document.getElementById("tasks-update").style.display=value;
    };
    const update=(value)=>{
        toUpdateArray= Array[value];
       
    };
    useEffect(() => {
        if (id){
        const fetch= async () => {
            await axios.get(`http://localhost:1000/api/v/getTasks/${id}`)
                .then((response) => {
                    console.log(response);
                  
                })
                
        };
        fetch();
    }
    }, [submit]);

    return(
        <>
        <div className="tasks my-5">
            <ToastContainer/>
            <div className="tasks-main container d-flex justify-content-center align-items-center flex-column">
                <div className="d-flex flex-column tasks-inputs-div w-50 p-1">
                <input 
                type="text" 
                placeholder= "TITLE" 
                className="my-2 tasks-inputs" 
                onClick={show} 
                name="title" 
                value={Inputs.title} 
                onChange={change} />
                <textarea 
                id="textarea" 
                type="text" 
                placeholder="BODY" 
                name="body"
                className=" tasks-inputs"
                value={Inputs.body}
                onChange={change}
                />
                </div>
                <div><button className="task-btn px-3 my-5" onClick={submit}> +</button></div>
            </div>
            <div className="tasks-body">
                <div className="container-fluid ">
                    <div className="row ">
                    {Array && Array.map((item,index)=>(
                    <div key ={index} className="col-lg-3 col-10  mx-5 my-2">
                    <TaskCard 
                      title={item.title}
                      body={item.body}
                      id={item._id} 
                      delid={del} 
                      display={dis} 
                      updateId={index}
                      toBeUpdate={update}
                      />
                    </div>
                    ))}
                  </div>  
                </div>
            </div>
        </div>
        <div className="tasks-update" id="tasks-update">
            <div className="container update">
                <Update display={dis} update={toUpdateArray}/></div>
            
        </div>
        </>
    );
};
export default Tasks;