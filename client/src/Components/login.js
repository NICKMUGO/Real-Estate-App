import React from 'react';
import "./signup.css";
function Login() {
  return (
    <div>
      <div className="container">
        <div className="left-section">
          <br />
          <br />
          <br />
          <br />
          <h2>Log In to Makao</h2>
          <form action="">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required minLength="8" />
            <small>Please enter 8 or more characters.</small>

            <button type="submit">Login</button>
            <br />
            <p>
              Don't have an account? <a href="signup.html">Sign up</a>
            </p>
          </form>
        </div>

        <div className="right-section">
          <img src="/login.jpg" alt="Modern House" />
        </div>
      </div>
    </div>
  );
}

export default Login;
