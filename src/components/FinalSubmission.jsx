import React from 'react';
import { Box, Button, TextField, Typography, Container, Card, CardContent } from '@mui/material';

const FinalSubmission = () => {
  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Final Project Submission
      </Typography>
      
    
      
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          label="Project Title"
          variant="outlined"
          sx={{ marginBottom: '15px' }}
        />
        <TextField
          label="Project Description"
          variant="outlined"
          multiline
          rows={4}
          sx={{ marginBottom: '15px' }}
        />
        
        {/* Links Section */}
        <TextField
          label="GitHub Repository Link"
          variant="outlined"
          type="url"
          sx={{ marginBottom: '15px' }}
        />
      
        
        
        {/* Submit button */}
        <Button variant="contained" color="primary" sx={{ marginTop: '15px' }}>
          Submit Project
        </Button>
      </Box>
    </Container>
  );
};

export default FinalSubmission;
