import { Box, Button, Card, CardActions, CardContent, Fab, Modal, Paper, Typography } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import axios from 'axios';
import { red } from "@mui/material/colors";
import { StudentContext } from "./StudentProvider";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ projects, setProjects ] = useState(null);
    const [ overlay, setOverlay ] = useState(null);
    const [ confirmModal, setConfirmModal ] = useState(false);
    // const [ student, setStudent ] = useState (null);
    const { student, setStudent } = useContext (StudentContext);
    const navigate = useNavigate();

      const handleCardClick = (index) => {
        setSelectedCard(prevSelected => prevSelected === index ? null : index);
      }

      const handleLearnMoreClick = (project) => {
        setOverlay(project);
      }

      const handleCloseOverlay = () => {
        setOverlay(null);
      }

      useEffect(() => {
        async function fetchProject () {
            const res = await axios.get(`http://localhost:3000/project/all`);
            try {
                setProjects(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProject();
      }, []);

      const handleSubmit = () => {
        setConfirmModal(true);
      }

      async function handleConfirmSubmit () {
        try {
            const selectedProjectId = projects[selectedCard].p_id;
            const studentId = student?.s_id;
            const response1 = await axios.put(`http://localhost:3000/student/selectProject`, {
                s_id: studentId,
                p_id: selectedProjectId
            });

            await axios.post(`http://localhost:3000/submission/initial`, {
                s_id: studentId,
                p_id: selectedProjectId
            })

            const updatedData = response1.data.data;
            setStudent((prevStudent) => ({
                ...prevStudent,
                selectedProject: updatedData?.selectedProject,
                projectSelectedAt: updatedData?.projectSelectedAt
            }))

            setConfirmModal(false);
            navigate('/project-dashboard')
            } catch (error) {
                console.error(`Error selecting project: ${error}`);
            }
        }

      const handleCancelSubmit = () => {
        setConfirmModal(false);
      }

  return (
    <>
        <Box sx={{
            backgroundColor: '#f4f4f4',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2
        }}>
            <Paper
                elevation={6}
                sx={{
                    paddingX: 10,
                    paddingY: 5,
                    backgroundColor: '#ffffff',
                    position: 'relative'
                }}
            >
                <Box>
                    <Typography sx={{fontSize: 30, mb: 2, color: '#333333', fontWeight: '500' }}>Projects</Typography>
                </Box>
                <Box sx={{maxWidth: '50rem'}}>
                    {projects && projects.map((project, index) => (
                        <Card
                            key={index}
                            variant='outlined'
                            sx={{
                                backgroundColor: selectedCard === index ? '#f0f9ff' : '#ffffff',
                                borderWidth: 1,
                                borderRadius: '1rem',
                                borderColor: selectedCard === index ? 'green' : '#cccccc',
                                pointerEvents: selectedCard !== null && selectedCard !== index ? 'none' : 'auto',
                                marginBottom: 2,
                                transition: 'all 0.3s',
                                opacity: selectedCard !== null && selectedCard !== index ? '0.2': '1',
                                cursor: selectedCard !== null && selectedCard !== index ? 'not-allowed' : 'pointer'
                            }}
                            onClick={() => handleCardClick(index)}
                        >
                            <React.Fragment>
                                <CardContent>
                                    <Typography gutterBottom sx={{ color: '#555555', fontSize: 14, userSelect: 'none' }}>
                                        {project.p_type}
                                    </Typography>
                                    <Typography variant="h5" component="div" sx={{ color: '#333333', userSelect: 'none' }}>
                                        {project.p_name}
                                    </Typography>
                                    <Typography sx={{ color: '#555555', mb: 1.5, userSelect: 'none' }}>
                                    {project.p_dur}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#333333', userSelect: 'none' }}>
                                        {project.p_desc}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="medium"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLearnMoreClick(project)
                                        }}
                                        sx={{ userSelect: 'none', color: '#0078d7'}}
                                    >Learn More</Button>
                                </CardActions>
                            </React.Fragment>
                        </Card>
                    ))}
                </Box>
                <Fab
                    variant="extended"
                    onClick={handleSubmit}
                    disabled={selectedCard === null}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: '#ffffff',
                        backgroundColor: red[500],
                        '&:hover': { backgroundColor: 'red' }
                    }}
                >
                    Confirm Project
                </Fab>
                <Modal
                    open={confirmModal}
                    onClose={handleCancelSubmit}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            padding: 4,
                            borderRadius: '8px',
                            maxWidth: '400px',
                            boxShadow: 24,
                            textAlign: "center"
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ mb: 3 }}
                        >
                            Confirm Project
                        </Typography>
                        <Typography
                            sx={{
                                mb: 3,
                            }}
                        >
                            Are you sure you want to select this project? This action cannot be undone.
                        </Typography>
                        <Typography
                            sx={{
                                mb: 3,
                                fontSize: 20
                            }}
                        >
                            <strong>{selectedCard !== null ? projects[selectedCard].p_name: ""}</strong>
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <Button
                                onClick={handleCancelSubmit}
                                sx={{
                                    color: '#ff6666'
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirmSubmit}
                                sx={{
                                    color: '#5cb85c'
                                }}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Paper>
            <Modal
                open={!!overlay}
                onClose={handleCloseOverlay}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'center',
                    padding: 4
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#ffffff',
                        color: '#333333',
                        padding: 4,
                        borderRadius: '8px',
                        maxWidth: '600px',
                        boxShadow: 24,
                        outline: 'none'
                    }}
                >
                    {overlay && (
                        <React.Fragment>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{ marginBottom: 2, fontWeight: 'bold'}}
                            >
                                {overlay.p_name}
                            </Typography>
                            <Typography
                                sx={{ marginBottom: 2}}
                            >
                                <strong>Type:</strong> {overlay.p_type}
                            </Typography>
                            <Typography
                                sx={{ marginBottom: 2}}
                            >
                                <strong>Duration:</strong> {overlay.p_dur}
                            </Typography>
                            <Typography>
                                <strong>Details:</strong> {overlay.p_det}
                            </Typography>
                            <Box
                                sx={{
                                    marginTop: 3,
                                    textAlign: "right"
                                }}>
                                    <Button
                                        onClick={handleCloseOverlay}
                                        sx={{ color: '#0078d7' }}
                                    >
                                        Close
                                    </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Modal>
        </Box>
    </>
  )
}
export default StudentDashboard