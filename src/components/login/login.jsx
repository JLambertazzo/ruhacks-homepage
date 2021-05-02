import React from "react";
import loginImg from "../../login.svg";
import { useHistory } from "react-router-dom";

export const Login = () => {

  const history = useHistory();

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img src={loginImg} alt="Login" />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <a onClick={() => history.push('/userInfo')} className="btn">Login</a>
      </div>
    </div>
  );
}