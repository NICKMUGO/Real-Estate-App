import React from 'react';
import "./signup.css";

function Signup() {
  return (
    <div>
      <div className="container">
        <div className="left-section">
          <br />
          <br />
          <br />
          <br />
          <p>
            Already have an account? <a href="login.html">Log in</a>
          </p>
          <h2>Sign Up to Makao</h2>
          <form action="">
            <label htmlFor="fullname">Username</label>
            <input type="text" id="fullname" name="fullname" required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required minLength="8" />
            <small>Please enter 8 or more characters.</small>

            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="*254" required />

            <label htmlFor="address">Address</label>
            <input type="number" name="address" id="address" required />

            <label htmlFor="usertype">Usertype</label>
            <input type="text" id="usertype" name="usertype" required />

            <div className="gender">
              <label>Gender:</label>
              <input type="radio" name="gender" id="male" value="male" />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" />
              <label htmlFor="female">Female</label>
              <input type="radio" id="other" name="gender" value="other" />
              <label htmlFor="other">Prefer not to say</label>
            </div>

            <div className="terms">
              <input type="checkbox" name="terms" id="terms" required />
              <label htmlFor="terms">I agree to the Terms of Service</label>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="right-section">
          <img src="/signup.jpg" alt="Modern House" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
