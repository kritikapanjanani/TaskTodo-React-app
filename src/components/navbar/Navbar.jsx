import React from "react";
import "./Navbar.css";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
const Navbar =() => {
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const logout = () =>{
    sessionStorage.clear("id");
    dispatch(authActions.logout());

  }
 
    return <div><nav className="navbar navbar-expand-lg nav-color">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <b>
        <GiNotebook /> &nbsp;TasksTODO
          </b>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item mx-1 ">
            <Link className="nav-link active nav" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item mx-1">
            <Link className="nav-link active nav" aria-current="page" to="/tasks">Tasks</Link>
          </li>
          {!isLoggedIn && (
            <>
            <li className="nav-item mx-1">
            <Link className="nav-link active btn-nav" aria-current="page" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item mx-1">
            <Link className="nav-link active btn-nav" aria-current="page" to="/signin">Sign In</Link>
          </li>
          </>
          )}
          {isLoggedIn && (
          <>
          <li className="nav-item mx-1">
            <Link className="nav-link active btn-nav1" aria-current="page" to="#" onClick={logout}>Log Out</Link>
          </li>
          </>
          )}
          <li className="nav-item mx-1">
            <Link className="nav-link active" aria-current="page" to="#"><img className="img-fluid user-png" src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="img" /></Link>
          </li>
        </ul>
      </div>
    </div>
  </nav></div>;
};

export default Navbar;