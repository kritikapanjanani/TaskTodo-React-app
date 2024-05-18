import React, { useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/footer";
import Home from "./components/home/Home";
import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Signup from "./components/footer/signup/Signup";
import Signin from "./components/footer/signup/Signin";
import Tasks from "./components/tasks/Tasks";
import { useDispatch } from "react-redux";
import { authActions } from "../src/store";


const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id){
      dispatch(authActions.login());
    }    
  },[]);

  return ( 
  <div> 
    <Router>
    <Navbar />
      <Routes>
        <Route exact path= "/" element ={<Home />} />
        <Route exact path= "/signup" element ={<Signup />} />
        <Route exact path= "/signin" element ={<Signin />} />
        <Route exact path= "/tasks" element ={<Tasks />} />
      </Routes>
    </Router>


    <Footer />

  </div>
  );
};

export default App;
