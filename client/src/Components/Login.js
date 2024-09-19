import React from "react";

const Login = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            maxWidth: '1200px',
            border: '1px solid #eaeaea',
            backgroundColor: '#fff',
            overflow: 'hidden'
        },
        leftSection: {
            flex: 1,
            padding: '100px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginTop: '10px',
            fontFamily: 'Times New Roman, Times, serif',
        },
        input: {
            padding: '10px',
            marginTop: '5px',
            border: '0.5px solid #ccc',
            borderRadius: '5px',
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
        rightSection: {
            flex: 1,
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        img: {
            width: '110%',
            height: '120%',
            objectFit: 'unset',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftSection}><br /><br /><br /><br />
                <h2>Log In to Makao</h2>
                <form style={styles.form}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input type="email" name="email" id="email" required style={styles.input} />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input type="password" name="password" id="password" required minLength="8" style={styles.input} />
                    <small>Please enter 8 or more characters.</small>

                    <button type="submit" style={styles.button}>Login</button><br />
                    <p>Don't have an account? <a href="/signup">Sign up</a></p>
                </form>
            </div>

            <div style={styles.rightSection}>
                <img src="login.jpg" alt="Modern House" style={styles.img} />
            </div>
        </div>
    );
};

export default Login;
