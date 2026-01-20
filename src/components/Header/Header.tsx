import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Header() {
  const myContext=useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="header-wrapper">
      <div className="header-container">

        <div className="header-text">Task Management</div>

        <ul className="link-wrapper">
          <li className="header-profile-wrapper">
            <div className="profile-name">
              <NavLink className={({ isActive }) => (isActive ? "profile-text active" : "profile-text")} to='/tasks'>Task</NavLink>
            </div>
          </li>
          <li className="header-profile-wrapper">
            <div className="profile-name">
              <NavLink to='/graph' className={({ isActive }) => (isActive ? "profile-text active" : "profile-text")}>Graph</NavLink>
            </div>
          </li>
          <li className="header-profile-wrapper">
            <div className="profile-name">
              <i className="fa-regular fa-circle-user"></i>
              <div>{ myContext.userName }</div>
              <i className="fa-solid fa-chevron-down downIcon"></i>
            </div>
            <ul className="sublist">
              <li onClick={()=>{myContext.handleProjectMethod("Add"); navigate("/tasks");}}>
                <div className="sublist-title">Add Project</div>
              </li>
              <li onClick={()=>{myContext.handleProjectMethod("Edit"); navigate("/tasks");}}>
                <div className="sublist-title">Edit Project</div>
              </li>
              <li onClick={()=>{myContext.handleProjectMethod("Delete"); navigate("/tasks");}}>
                <div className="sublist-title">Delete Project</div>
              </li>
              <li>
                <NavLink to="/login" onClick={()=>{myContext.handleLogout()}}>
                  <div className="header-logout">
                    Logout
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </div>
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>

      </div>
    </div>
  );
}

export default Header;
