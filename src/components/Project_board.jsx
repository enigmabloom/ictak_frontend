import { useState, useEffect, useContext, useRef } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography, Stack, TextField, Input, Select, MenuItem, Snackbar, Alert, Box, Button, Paper, Divider, IconButton, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { StudentContext } from './StudentProvider';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const ProjectBoard = () => {
  const [projectData, setProjectData] = useState(null);
  const { student } = useContext (StudentContext); //student context
  const [isWeeklyFormOpen, setIsWeeklyFormOpen] = useState(false);
  const [isFinalFormOpen, setIsFinalFormOpen] = useState(false);
  const [activeWeeks, setActiveWeeks] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [link, setLink] = useState('');
  const [weeklyFile, setWeeklyFile] = useState(null);
  const [finalFile, setFinalFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for the Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const weeklyFileInputRef = useRef(null);
  const finalFileInputRef = useRef(null);
  const vivaVoceFileInputRef = useRef(null);
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState('');
  const [editingQuery, setEditingQuery] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [commentingQueryId, setCommentingQueryId] = useState('');
  const [isVivaVoceOpen, setIsVivaVoceOpen] = useState(false);
  const [vivaVoceFile, setVivaVoceFile] = useState(null);
  const [marksData, setMarksData] = useState([]);

  const handleWeeklyFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setWeeklyFile(selectedFile);
  }

  const handleFinalFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFinalFile(selectedFile);
  }

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if(!link || !finalFile) {
      alert('Please fill all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('s_id', student?.s_id);
    formData.append('p_id', student?.selectedProject);
    formData.append('link', link);
    formData.append('submissionFile', finalFile);

    try {
      await axios.post('https://ictstudentportal.onrender.com/submission/final', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnackbarMessage(`Final submission has been successfully submitted.`);
      setSnackbarOpen(true);

      // setSelectedWeek('');
      setLink('');
      setFinalFile(null);
      finalFileInputRef.current.value = '';

    } catch (error) {
      console.error('Error submitting the week:', error);
      alert('Submission failed. Please try again.');
    }

  }

  const handleWeeklySubmit = async (e) => {
    e.preventDefault();

    if(!selectedWeek || !link || !weeklyFile) {
      alert('Please fill all the fields.');
      return;
    }

    const formData = new FormData();
    formData.append('s_id', student?.s_id);
    formData.append('p_id', student?.selectedProject);
    formData.append('week', selectedWeek);
    formData.append('link', link);
    formData.append('submissionFile', weeklyFile);

    try {
      await axios.post('https://ictstudentportal.onrender.com/submission/weekly', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnackbarMessage(`Weekly submission for Week ${selectedWeek} has been successfully submitted.`);
      setSnackbarOpen(true);

      // setSelectedWeek('');
      setLink('');
      setWeeklyFile(null);
      weeklyFileInputRef.current.value = '';

    } catch (error) {
      console.error('Error submitting the week:', error);
      alert('Submission failed. Please try again.');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const getWeekStatus = (selectedAt) => {
    const selectedDate = new Date(selectedAt);
    // const selectedDate = new Date("2024-12-19T18:34:20.270+00:00");
    const now = new Date();
    const weeksSinceSelection = Math.floor((now - selectedDate) / (7 * 24 * 60 * 60 * 1000));
    return Array.from({ length: Math.min(4, weeksSinceSelection + 1) }, (_, i) => i + 1);
  }

  const handleReferenceDownload = async (type) => {
    try {
      const projectId = student?.selectedProject;
      const response = await axios.get(`https://ictstudentportal.onrender.com/document/${type}/download/${projectId}`, { responseType: 'arraybuffer'});

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `document-${type}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(`Error downloading the file:`, error);
    }  
  };

  const handleWeeklySubmissionFormatDownload = async () => {
    try {
      const response = await axios.get(`https://ictstudentportal.onrender.com/document/weeklySubmissionFormat/download`, { responseType: 'arraybuffer'});

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `weekly-submission-format.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(`Error downloading the file:`, error);
    }  

  }

  const handleFinalSubmissionFormatDownload = async () => {
    try {
      const response = await axios.get(`https://ictstudentportal.onrender.com/document/finalSubmissionFormat/download`, { responseType: 'arraybuffer'});

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `final-submission-format.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(`Error downloading the file:`, error);
    }
  }

  const handleVivaVoceDownload = async () => {
    try {
      const response = await axios.get(`https://ictstudentportal.onrender.com/document/viva-voce/download`, { responseType: 'arraybuffer'});

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', `viva-voce.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(`Error downloading the file:`, error);
    }
  }

  useEffect (() => {
    const fetchInitialProjectData = async () => {
      try {
        const id = student?.selectedProject;
        const response = await axios.get(`https://ictstudentportal.onrender.com/project/${id}`);
        setProjectData(response.data);

        if (student?.projectSelectedAt) {
          const weekStatus = getWeekStatus(student?.projectSelectedAt);
          setActiveWeeks((prevWeeks = []) => Array.from(new Set([...prevWeeks, ...weekStatus])));

          const projectStartDate = new Date(student?.projectSelectedAt);
          // const projectStartDate = new Date("2024-12-19T18:34:20.270+00:00");
          const now = new Date();
          const weeksSinceSelection = Math.floor((now - projectStartDate) / (7 * 24 * 60 * 60 * 1000));
          
          setIsWeeklyFormOpen(activeWeeks.length > 0);
          setIsFinalFormOpen(weeksSinceSelection >= 5);
        }
      } catch (error) {
        console.log(`Error fetching project data on load: ${error}`);
      }  
    };
    const fetchQueries = async () => {
      try {
        const projectId = student?.selectedProject;
        const response = await axios.get(`https://ictstudentportal.onrender.com/discussion/${projectId}`);
        setQueries(response.data);
      } catch (err) {
        console.error('Error fetching discussion queries:', err);
      }
    };

    const checkFinalSubmission = async () => {
      const projectId = student?.selectedProject;
      const studentId = student?.s_id;
      try {
        const response = await axios.get('https://ictstudentportal.onrender.com/submission/check-final', {
          params: {
            s_id: studentId,
            p_id: projectId,
          },  
        });
        setIsVivaVoceOpen(response.data.isFinalSubmitted);
      } catch (error) {
        console.error('Error checking final submission:', error);
      }
    }
    
    checkFinalSubmission();
    fetchQueries();
    fetchInitialProjectData();
  }, [student, student?.projectSelectedAt, activeWeeks.length, student?.selectedProject, student?.s_id]);

  const postQuery = async () => {
    if (!newQuery.trim()) return;

    try {
      const response = await axios.post(`https://ictstudentportal.onrender.com/discussion`, {
        p_id: student?.selectedProject,
        email: student?.email,
        query: newQuery,
      });
      setNewQuery('');
      setQueries((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('Error posting query:', err);
    }
  };

  const editQuery = async (queryId, updatedQuery) => {
    try {
      const response = await axios.put(`https://ictstudentportal.onrender.com/discussion/${queryId}`, {
        email: student?.email,
        query: updatedQuery,
      });
      setQueries((prev) =>
        prev.map((query) => (query._id === queryId ? { ...query, query: response.data.query } : query))
      );
      setEditingQuery(null);
    } catch (err) {
      console.error('Error editing query:', err);
    }
  };

  const addComment = async (queryId) => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`https://ictstudentportal.onrender.com/discussion/${queryId}/comments`, {
        commenterEmail: student?.email,
        comment: newComment,
      });
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, comments: response.data.comments } : query
        )
      );
      setNewComment('');
      setCommentingQueryId(null);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const likeQuery = async (queryId) => {
    try {
      const response = await axios.put(`https://ictstudentportal.onrender.com/discussion/${queryId}/like`);
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, likes: response.data.likes } : query
        )
      );
    } catch (err) {
      console.error('Error liking query:', err);
    }
  };

  const likeComment = async (queryId, commentIndex) => {
    try {
      const response = await axios.put(
        `https://ictstudentportal.onrender.com/${queryId}/comments/${commentIndex}/like`
      );
      setQueries((prev) =>
        prev.map((query) =>
          query._id === queryId ? { ...query, comments: response.data.comments } : query
        )
      );
    } catch (err) {
      console.error('Error liking comment:', err.response?.data || err.message);
    }
  };

  const handleVivaVoceFileChange = (e) => {
    setVivaVoceFile(e.target.files[0]);
  }

  const handleVivaVoceSubmit = async (e) => {
    e.preventDefault();

    if (!vivaVoceFile) {
      alert('File required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('submissionFile', vivaVoceFile);
      formData.append('s_id', student?.s_id);
      formData.append('p_id', student?.selectedProject);

      await axios.post('https://ictstudentportal.onrender.com/submission/viva-voce', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSnackbarMessage(`Viva-voce has been successfully submitted.`);
      setSnackbarOpen(true);

      setVivaVoceFile(null);
      vivaVoceFileInputRef.current.value = '';

      
    } catch (error) {
      console.error('Error submitting viva-voce:', error);
      alert('Submission failed.');
    }
  };

  const fetchMarks = async () => {
    try {
      const s_id = student?.s_id;
      const p_id = student?.selectedProject;
      const response = await axios.get(`https://ictstudentportal.onrender.com/student/marks?s_id=${s_id}&p_id=${p_id}`);
      setMarksData(response.data);
    } catch (error) {
      console.error('Error getting the marks:', error);
      alert('Fetching marks failed. Please try again.');
    }
  };

  return (
    <>
      <Box
        sx={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px', marginBottom: '20px' }}
      >
        <Typography variant='h4'>
          <strong>Project Name: {projectData?.p_name}</strong>
        </Typography>
      </Box>
      <Container maxWidth="lg" style={{ marginTop: '20px', backgroundColor: 'white' }}></Container>

      {/* Accordion: Project Overview */}
      <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded }
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="project-overview-content"
            id="project-overview-header"
          >
            <Typography variant="h6">Project Overview</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <Typography variant="body1">
                {projectData?.p_det}
              </Typography>
        </AccordionDetails>
        </Accordion>

        {/* Accordion: Reference Material */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="reference-material-content"
            id="reference-material-header"
          >
            <Typography variant="h6">Reference materials</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              <strong>Project Reference:</strong>{' '}
                    <Button variant='outlined' onClick={() => handleReferenceDownload('reference')}>Download</Button>
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion: Weekly Submission */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="weekly-submission-content"
            id="weekly-submission-header"
          >
            <Typography variant="h6">Weekly submission</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="body1">
              <strong>Weekly submission format:</strong>{' '}
                    <Button variant='outlined' onClick={() => handleWeeklySubmissionFormatDownload()}>Download</Button>
            </Typography>
          {isWeeklyFormOpen ? (
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
              <form onSubmit={handleWeeklySubmit}>
                <Stack spacing={2}>
                  <Select
                    value={selectedWeek}
                    onChange={(e) => setSelectedWeek(e.target.value)}
                    fullWidth
                  >
                    {Array.from({ length: 4}, (_, i) => (
                      <MenuItem
                        key={i+1}
                        value={i+1}
                        disabled={!activeWeeks.includes(i + 1)}
                      >
                        Week {i+1}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    label="Link"
                    variant='outlined'
                    fullWidth
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    multiline
                    rows={5}
                  />
                  <Input
                    type='file'
                    fullWidth
                    inputProps={{ accept: '.pdf, .doc, .docx, .ppt, .pptx, .rtf, .txt, .odt, .epub' }}
                    onChange={handleWeeklyFileChange}
                    inputRef={weeklyFileInputRef}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Box>
          ) : (
            <Typography variant="h8">The form will be available once the selected week starts.</Typography>
          )}
          </AccordionDetails>
        </Accordion>

        {/* Accordion: Final Submission */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="final-submission-content"
            id="final-submission-header"
          >
            <Typography variant="h6">Final submission</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="body1">
              <strong>Final submission format:</strong>{' '}
                  <Button variant='outlined' onClick={() => handleFinalSubmissionFormatDownload()}>Download</Button>
            </Typography>
          {isFinalFormOpen ? (
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
              <form onSubmit={handleFinalSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Link"
                    variant='outlined'
                    fullWidth
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    multiline
                    rows={5}
                  />
                  <Input
                    type='file'
                    fullWidth
                    inputProps={{ accept: '.pdf, .doc, .docx, .ppt, .pptx, .rtf, .txt, .odt, .epub' }}
                    onChange={handleFinalFileChange}
                    inputRef={finalFileInputRef}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Box>
          ) : (
            <Typography variant="h8">The form will be available only on the last week of submission.</Typography>
          )}
          </AccordionDetails>
        </Accordion>

        {/* Accordion: Discussion Forum */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="discussion-forum-content"
            id="discussion-forum-header"
          >
            <Typography variant="h6">Discussion Forum</Typography>
          </AccordionSummary>
            <AccordionDetails>
              <Box
                component={Paper}
                elevation={3}
                sx={{
                  padding: '20px',
                  marginBottom: '30px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '10px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Post a Query
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Type your query here..."
                  value={newQuery}
                  onChange={(e) => setNewQuery(e.target.value)}
                  sx={{ marginBottom: '20px', borderRadius: '8px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={postQuery}
                  fullWidth
                  sx={{ padding: '10px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' }}
                >
                  Post Query
                </Button>
              </Box>
              {/* Query List Section */}
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                Queries
              </Typography>
              {queries.map((query) => (
                <Box
                  component={Paper}
                  elevation={3}
                  key={query._id}
                  sx={{
                    padding: '20px',
                    marginBottom: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="body1">
                    <strong>{query.name}:</strong> {editingQuery === query._id ? (
                      <TextField
                        value={query.query}
                        onChange={(e) =>
                          setQueries((prev) =>
                            prev.map((q) =>
                              q._id === query._id ? { ...q, query: e.target.value } : q
                            )
                          )
                        }
                        multiline
                        fullWidth
                        sx={{ marginBottom: '10px', borderRadius: '8px' }}
                      />
                    ) : (
                      query.query
                    )}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#555', display: 'block', marginTop: '5px' }}>
                    Posted on: {new Date(query.timestamp).toLocaleString()}
                  </Typography>
                  {student?.name === query.name && (
                    <IconButton
                      onClick={() =>
                        editingQuery === query._id
                          ? editQuery(query._id, query.query)
                          : setEditingQuery(query._id)
                      }
                      sx={{ float: 'right' }}
                    >
                      {editingQuery === query._id ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  )}

                  <IconButton onClick={() => likeQuery(query._id)} sx={{ marginLeft: '10px' }}>
                    <ThumbUpIcon /> {query.likes || 0}
                  </IconButton>

                  <Divider sx={{ marginY: '10px' }} />
                  {/* Comments Section */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Comments:
                  </Typography>
                  {query.comments?.map((comment, index) => (
                    <Box
                      key={index}
                      sx={{
                        paddingLeft: '10px',
                        marginY: '5px',
                        borderLeft: '3px solid #1976d2',
                        paddingBottom: '5px',
                      }}
                    >
                      <Typography variant="body2">
                        <strong>{comment.commenterName}:</strong> {comment.comment} <br />
                        <em>{new Date(comment.timestamp).toLocaleString()}</em>
                      </Typography>

                      <Button
                        startIcon={<ThumbUpIcon />}
                        onClick={() => likeComment(query._id, index)}
                        size="small"
                        sx={{ marginTop: '5px' }}
                      >
                        Like ({comment.likes || 0})
                      </Button>
                    </Box>
                  ))}

                  {commentingQueryId === query._id ? (
                    <>
                      <TextField
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        fullWidth
                        placeholder="Add a comment..."
                        sx={{ marginTop: '10px', borderRadius: '8px' }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => addComment(query._id)}
                        sx={{
                          marginTop: '10px',
                          borderRadius: '8px',
                          padding: '10px',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                        fullWidth
                      >
                        Post Comment
                      </Button>
                    </>
                  ) : (
                    <Button
                      startIcon={<CommentIcon />}
                      onClick={() => setCommentingQueryId(query._id)}
                      sx={{
                        marginTop: '10px',
                        borderRadius: '8px',
                        padding: '10px',
                        backgroundColor: '#1976d2',
                        color: '#fff',
                      }}
                    >
                      Add Comment
                    </Button>
                  )}
                </Box>
              ))}
            </AccordionDetails>
        </Accordion>

        {/* Accordion: Viva Voce */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="viva-voce-submission-content"
            id="viva-voce-submission-header"
          >
            <Typography variant="h6">Viva-voce submission</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="body1">
              <strong>Final submission format:</strong>{' '}
                  <Button variant='outlined' onClick={() => handleVivaVoceDownload()}>Download</Button>
            </Typography>
          {isVivaVoceOpen ? (
            <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
              <form onSubmit={handleVivaVoceSubmit}>
                <Stack spacing={2}>
                  <Input
                    type='file'
                    fullWidth
                    inputProps={{ accept: '.pdf, .doc, .docx, .ppt, .pptx, .rtf, .txt, .odt, .epub' }}
                    onChange={handleVivaVoceFileChange}
                    inputRef={vivaVoceFileInputRef}
                  />
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </Box>
          ) : (
            <Typography variant="h8">The form will be available only on the last week of submission.</Typography>
          )}
          </AccordionDetails>

        </Accordion>

        {/* Accordion: Marks and Comments */}
        <Accordion
          sx={{ marginBottom: '10px' }}
          onChange={(e, isExpanded) => isExpanded && fetchMarks()}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="marks-panel-content"
            id="marks-panel-header"
          >
            <Typography variant="h6">Marks and comments</Typography>
          </AccordionSummary>
          <AccordionDetails>
          {marksData && marksData._id ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold'}}>Submission Week</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold'}}>Marks</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold'}}>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Week 1 */}
                <TableRow>
                  <TableCell align="center">Week 1</TableCell>
                  <TableCell align="center">{marksData.week_1_marks}</TableCell>
                  <TableCell align="center">{marksData.week_1_comment}</TableCell>
                </TableRow>
                {/* Week 2 */}
                <TableRow>
                  <TableCell align="center">Week 2</TableCell>
                  <TableCell align="center">{marksData.week_2_marks ? marksData.week_2_marks : '-'}</TableCell>
                  <TableCell align="center">{marksData.week_2_comment ? marksData.week_2_comment : '-'}</TableCell>
                </TableRow>
                {/* Week 3 */}
                <TableRow>
                  <TableCell align="center">Week 3</TableCell>
                  <TableCell align="center">{marksData.week_3_marks ? marksData.week_3_marks : '-'}</TableCell>
                  <TableCell align="center">{marksData.week_3_comment ? marksData.week_3_comment : '-'}</TableCell>
                </TableRow>
                {/* Week 4 */}
                <TableRow>
                  <TableCell align="center">Week 4</TableCell>
                  <TableCell align="center">{marksData.week_4_marks ? marksData.week_4_marks : '-'}</TableCell>
                  <TableCell align="center">{marksData.week_4_comment ? marksData.week_4_comment : '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Typography variant="h6" sx={{ marginTop: '20px', fontSize: '16px' }}>Final Marks & Viva Voce</Typography>
            <Table sx={{ marginTop: '10px' }}>
              <TableBody>
                {/* Final Marks */}
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Final Marks</TableCell>
                  <TableCell align="center">{marksData.final_marks ? marksData.final_marks : '-'}</TableCell>
                  <TableCell align="center">{marksData.final_comment ? marksData.final_comment : '-'}</TableCell>
                </TableRow>
                {/* Viva Voce Marks */}
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>Viva Voce</TableCell>
                  <TableCell align="center">{marksData.viva_voce_marks ? marksData.viva_voce_marks : '-'}</TableCell>
                  <TableCell align="center">{marksData.viva_voce_comment ? marksData.viva_voce_comment : '-'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </>
            ) : (
              <Typography>No data available</Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
    </>
  );
};

export default ProjectBoard;
