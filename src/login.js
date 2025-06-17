import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
 const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/auth/login', null, {
      params: { username, password }
    });

    if (response.data.message === 'Login successful') {
      navigate('/home'); // ⬅️ Redirect to home page
    } else {
      setMessage('Invalid login response'); // In case backend sends something unexpected
    }
    console.log(username,password)

  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage(error.response.data.message || 'Invalid credentials');
    } else {
      setMessage('Server error. Please try again.');
    }
  }
};


  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      backgroundColor: '#ffffff',
      padding: '40px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
      textAlign: 'center',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    message: {
      marginTop: '15px',
      textAlign: 'center',
      color: '#ff4444',
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Log In</button>
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
