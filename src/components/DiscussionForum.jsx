import { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography, Grid, Box } from '@mui/material';

const DiscussionForum= () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'User1',
      content: 'This is a sample message.',
      likes: 0,
      comments: [{ user: 'User2', content: 'Nice message!' }],
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [comment, setComment] = useState('');

  const postMessage = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      id: Date.now(),
      user: 'User1',
      content: newMessage,
      likes: 0,
      comments: [],
    };
    setMessages([newMsg, ...messages]);
    setNewMessage('');
  };

  const likeMessage = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  const addComment = (id) => {
    if (comment.trim() === '') return;
    setMessages(
      messages.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              comments: [...msg.comments, { user: 'User1', content: comment }],
            }
          : msg
      )
    );
    setComment('');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Weekly Submission
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          variant="outlined"
          label="Write a message"
          fullWidth
          sx={{ maxWidth: '600px' }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: '10px' }}
          onClick={postMessage}
        >
          Post
        </Button>
      </Box>
      <Grid container spacing={2}>
        {messages.map((msg) => (
          <Grid item xs={12} key={msg.id}>
            <Card sx={{ maxWidth: '600px', margin: 'auto' }}>
              <CardContent>
                <Typography variant="body1">{msg.content}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  By: {msg.user}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => likeMessage(msg.id)}
                >
                  Like ({msg.likes})
                </Button>
                <Box sx={{ marginTop: '10px' }}>
                  <Typography variant="subtitle2">Comments:</Typography>
                  {msg.comments.map((c, index) => (
                    <Typography key={index} variant="body2" sx={{ marginLeft: '20px' }}>
                      {c.content} - <em>{c.user}</em>
                    </Typography>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', marginTop: '10px' }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ marginLeft: '10px' }}
                    onClick={() => addComment(msg.id)}
                  >
                    Comment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DiscussionForum;

