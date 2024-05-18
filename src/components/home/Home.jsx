import React from "react";
import "./home.css";
const Home = () => {
    return(
         <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center">Keep yourself productive ,<br></br>organize your life with TaskTodo</h1>
            <p>Your go to app for organizing multiple tasks in an easy manner.</p>
            <button className="home-btn">Add Task</button>
        </div>
    </div>
    );
};

export default Home;