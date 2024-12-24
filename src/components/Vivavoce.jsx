import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Vivavoce = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSummary, setProjectSummary] = useState('');
  const [challenges, setChallenges] = useState('');
  const [futureWork, setFutureWork] = useState('');
  const [questions, setQuestions] = useState('');
  
  const handleSubmit = () => {
    alert('Your Viva Voce submission has been saved!');
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Viva Voce Format
      </Typography>

      {/* Project Details */}
      <Card sx={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h6">Project/Thesis Details</Typography>
          <TextField
            label="Project Title"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '15px' }}
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <TextField
            label="Project Summary"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: '15px' }}
            value={projectSummary}
            onChange={(e) => setProjectSummary(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Viva Questions Accordion */}
      <Accordion sx={{ marginBottom: '15px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">Viva Questions</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            label="Challenges Encountered"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{ marginBottom: '15px' }}
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}
          />
          <TextField
            label="Future Work"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{ marginBottom: '15px' }}
            value={futureWork}
            onChange={(e) => setFutureWork(e.target.value)}
          />
          <TextField
            label="Additional Questions/Clarifications"
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{ marginBottom: '15px' }}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Viva Voce Details
        </Button>
      </Box>
    </Container>
  );
};

export default Vivavoce;
