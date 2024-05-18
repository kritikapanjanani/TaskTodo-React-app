import React from "react";
import { MdDelete } from "react-icons/md";
import { FaDisplay, FaPenToSquare } from "react-icons/fa6";
const TaskCard = ({title,body,id,delid,display,updateId,toBeUpdate}) => {
    return <div className="p-3 task-card">
        <div>
            <h5>{title}</h5>
            <p className="content">{body.split("",77)}...
                </p>
            </div>
            <div className="d-flex justify-content-around ">
            <div className="card-icon-head p-1"
            onClick={()=>{
                display("block");
                toBeUpdate(updateId);
             }}>
            <FaPenToSquare className="card-icons"/>Update
            </div>
            <div className="card-icon-head p-1 text-danger" 
            onClick={()=>{
                delid(id);
             }}>
            <MdDelete className="card-icons del "/>Delete
            </div>
            </div>
        </div>
        
};
export default TaskCard;