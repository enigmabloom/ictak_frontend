import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, phone } = formData;

    // Frontend validation: Check if all fields are filled
    if (!name || !email || !password || !phone) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }

    // try {
    //   const response = await fetch('http://localhost:4000/student/register', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ name, email, password, phone }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || 'Registration failed');
    //   }

    //   const result = await response.json();
    //   setSuccess(result.message);
    //   setError('');
    //   console.log('Registration successful:', result.message);

    //   // Redirect to login after a delay
    //   setTimeout(() => {
    //     window.location.href = '/login';
    //   }, 2000);
    // } catch (error) {
    //   console.error('Error:', error.message);
    //   setError(error.message);
    //   setSuccess('');
    // }
    
    try {
      // const response = await axios.post('https://ictak-internship-portal-student-view-api.vercel.app//student/register', {
      const response = await axios.post('http://localhost:3000/student/register', {
        name,
        email,
        password,
        phone,
      });
    
      // Handle success response
      setSuccess(response.data.message);
      setError('');
      console.log('Registration successful:', response.data.message);
    
      // Redirect to login after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      // Handle error response
      console.error('Error:', error.response?.data?.message || 'Registration failed');
      setError(error.response?.data?.message || 'Registration failed');
      setSuccess('');
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
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src="/logo/iip-white.png"
          alt="ICTAK Logo"
          style={{
            width: '100px',
            position: 'absolute',
            top: '20px',
            left: '20px',
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}
          >
            ICTAK Internship Portal
          </Typography>
          <Typography
            variant="h5"
            style={{ color: '#fff', marginTop: '5px' }}
          >
            Student Registration
          </Typography>
        </div>
      </div>

      {/* Sign Up Form */}
      <div
        style={{
          margin: '50px auto',
          maxWidth: '400px',
          padding: '30px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h6"
          style={{ fontWeight: 'bold', marginBottom: '20px' }}
        >
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          {/* Email Field */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          {/* Password Field */}
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          {/* Phone Field */}
          <TextField
            id="phone"
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* Error Message */}
          {error && (
            <Typography
              variant="body2"
              color="error"
              style={{ marginTop: '10px' }}
            >
              {error}
            </Typography>
          )}
          {/* Success Message */}
          {success && (
            <Typography
              variant="body2"
              color="primary"
              style={{ marginTop: '10px' }}
            >
              {success}
            </Typography>
          )}

          {/* Already Registered Link */}
          <div style={{ marginTop: '10px', textAlign: 'right' }}>
            <Link
              to="/login"
              style={{
                color: '#004d40',
                fontSize: '14px',
                textDecoration: 'none',
              }}
            >
              Already have an account? Log in here
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            style={{
              marginTop: '20px',
              background: 'linear-gradient(to right, #004d40, #00acc1)',
              color: '#fff',
            }}
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
