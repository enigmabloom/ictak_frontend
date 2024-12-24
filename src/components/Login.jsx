import { useContext, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StudentContext } from './StudentProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setStudent } = useContext(StudentContext);

  // axios.defaults.withCredentials = true;

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/student/login', {
        email,
        password,
      });

      if (response.status === 200) {
        alert(response.data.message);
        const user = response.data.user;
        setStudent(user);
        sessionStorage.setItem("token", response.data.token);
        
        if(user.selectedProject) {
          navigate('/project-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div
        style={{
          background: 'linear-gradient(to right, #004d40, #00acc1)',
          padding: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <img
          src="/logo/iip-white.png"
          alt="ICTAK Logo"
          style={{
            width: '100px',
            height: 'auto',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        />
        {/* Header Text */}
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            style={{
              color: '#fff',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            ICTAK Internship Portal
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: '#fff',
              marginTop: '5px',
            }}
          >
            Student Login
          </Typography>
        </div>
      </div>

      {/* Login Box */}
      <div
        style={{
          margin: '50px auto',
          maxWidth: '400px',
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          backgroundColor: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: 'bold', marginBottom: '20px' }}
        >
          Login to Your Account
        </Typography>

        {/* Email Field */}
        <TextField
          id="email"
          label="Username / Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Field */}
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {errorMessage && (
          <Typography
            variant="body2"
            style={{ color: 'red', marginTop: '10px' }}
          >
            {errorMessage}
          </Typography>
        )}

        {/* "New User" Link */}
        <div
          style={{
            marginTop: '10px',
            textAlign: 'right',
          }}
        >
          <Link
            to="/signup"
            style={{
              color: '#004d40',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            New user? Click here
          </Link>
        </div>

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          style={{
            marginTop: '20px',
            background: 'linear-gradient(to right, #004d40, #00acc1)',
            color: '#fff',
          }}
          onClick={handleLogin}
        >
          Log In
        </Button>
      </div>
    </div>
  );
};

export default Login;

