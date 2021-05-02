import React from "react";
import loginImg from "../../login.svg";
import { useHistory } from "react-router-dom";

export const Register = () => {

  const history = useHistory();

  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Signup" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <a onClick={() => history.push('/hobbies')} className="btn">Register</a>
      </div>
    </div>
  );
}