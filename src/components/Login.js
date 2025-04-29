import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // エラーメッセージをリセット
    setError('');

    // ユーザー名またはパスワードが空の場合、エラーを表示
    if (!username || !password) {
      setError('ユーザー名とパスワードは必須です');
      return;
    }

    // サンプルの認証処理
    if (username !== 'user' || password !== 'password123') {
      setError('ユーザー名またはパスワードが間違っています');
      return;
    }

    console.log('ログイン成功');
    // ログイン後の処理をここに追加できます
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
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージを表示 */}
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;