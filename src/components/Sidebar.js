import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  return (
    <div style={{ width: '220px', background: '#f4f4f4', padding: '20px', height: '100vh' }}>
      <h3>メニュー</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>

        <li style={{ marginBottom: '10px' }}>
          <Link to="/dashboard">ダッシュボード</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/customers">顧客一覧</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/add-customer">新規顧客登録</Link>
        </li>

        <li style={{ marginBottom: '10px' }}>
          <button onClick={onLogout}>ログアウト</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
