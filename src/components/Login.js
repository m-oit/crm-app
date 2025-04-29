import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Alert } from '@mui/material';

const Login = ({ onLogin, onGuestLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('ユーザー名とパスワードは必須です');
      return;
    }


    if (username !== 'user' || password !== 'password123') {
      setError('ユーザー名またはパスワードが間違っています');
      return;
    }

    onLogin();
    navigate('/dashboard');
  };

  const handleGuestLogin = () => {
    onGuestLogin();
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="xs" style={{ paddingTop: '50px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          ログイン
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="ユーザー名"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="パスワード"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Alert severity="error" style={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginBottom: '10px' }}
          >
            ログイン
          </Button>
        </form>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleGuestLogin}
        >
          ゲストログイン
        </Button>
      </Box>
    </Container>
  );
};

export default Login;



