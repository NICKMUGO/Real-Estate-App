import React from "react";

const Signup = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            maxWidth: '1300px',
            border: '1px solid #eaeaea',
            backgroundColor: '#031739',
            overflow: 'hidden'
        },
        leftSection: {
            flex: 1,
            padding: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: '#B4975A',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginTop: '10px',
            fontFamily: 'Times New Roman, Times, serif',
            color: '#B4975A', // Added text color
        },
        input: {
            padding: '10px',
            marginTop: '5px',
            border: '0.5px solid #ccc',
            borderRadius: '5px',
            backgroundColor: 'gray',  
        },
        button: {
            padding: '15px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            marginTop: '20px',
            cursor: 'pointer',
        },
        gender: {
            marginTop: '15px',
        },
        terms: {
            marginTop: '20px',
        },
        rightSection: {
            flex: 1,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            width: '110%',
            height: '50%',
            objectFit: 'unset',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}>
                <p>Already have an account? <a href="/login">Log in</a></p>
                <h2>Sign Up to Makao</h2>
                <form style={styles.form}>
                    <label htmlFor="fullname" style={styles.label}>Username</label>
                    <input type="text" id="fullname" name="fullname" required style={styles.input} />

                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" name="email" id="email" required style={styles.input} />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" name="password" id="password" required minLength="8" style={styles.input} />
                    <small>Please enter 8 or more characters.</small>

                    <label htmlFor="phone" style={styles.label}>Phone Number</label>
                    <input type="tel" id="phone" name="phone" placeholder="*254" required style={styles.input} />

                    <label htmlFor="address" style={styles.label}>Address</label>
                    <input type="number" name="address" id="address" required style={styles.input} />

                    <label htmlFor="usertype" style={styles.label}>Usertype</label>
                    <input type="text" id="usertype" name="usertype" required style={styles.input} />

                    <div style={styles.gender}>
                        <label>Gender:</label>
                        <input type="radio" name="gender" id="male" value="male" />
                        <label htmlFor="male">Male</label>
                        <input type="radio" name="gender" id="female" value="female" />
                        <label htmlFor="female">Female</label>
                        <input type="radio" id="other" name="gender" value="other" />
                        <label htmlFor="other">Prefer not to say</label>
                    </div>

                    <div style={styles.terms}>
                        <input type="checkbox" name="terms" id="terms" required />
                        <label htmlFor="terms">I agree to the Terms of Service</label>
                    </div>
                    <button type="submit" style={styles.button}>Sign Up</button>
                </form>
            </div>

            <div style={styles.rightSection}>
                <img src="signup.jpg" alt="Modern House" style={styles.img} />
            </div>
        </div>
    );
};

export default Signup;
