import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CustomerList from './components/CustomerList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/customers" element={<CustomerList />} /> {/* ★ 顧客一覧 */}
      </Routes>
    </Router>
  );
};

export default App;