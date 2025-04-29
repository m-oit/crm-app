import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート

const Login = ({ onLogin, onGuestLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigateのフック

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('ユーザー名とパスワードは必須です');
      return;
    }

    // サンプルの認証処理
    if (username !== 'user' || password !== 'password123') {
      setError('ユーザー名またはパスワードが間違っています');
      return;
    }

    onLogin(); // ログイン成功
    navigate('/dashboard'); // ダッシュボードに遷移
  };

  const handleGuestLogin = () => {
    onGuestLogin(); // ゲストログイン成功
    navigate('/dashboard'); // ダッシュボードに遷移
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ユーザー名</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
      <button onClick={handleGuestLogin}>ゲストログイン</button> {/* ゲストログインボタン */}
    </div>
  );
};

export default Login;


