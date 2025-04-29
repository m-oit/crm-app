import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Login from './components/Login';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: '佐藤 太郎', email: 'taro.sato@example.com', phone: '090-1234-5678', registeredAt: '2023-01-15', orderStatus: '注文済み' },
    { id: 2, name: '鈴木 花子', email: 'hanako.suzuki@example.com', phone: '080-2345-6789', registeredAt: '2022-12-20', orderStatus: '注文確認中' },
    { id: 3, name: '田中 一郎', email: 'ichiro.tanaka@example.com', phone: '070-3456-7890', registeredAt: '2023-02-05', orderStatus: '発送準備中' },
    { id: 4, name: '山田 さくら', email: 'sakura.yamada@example.com', phone: '090-4567-8901', registeredAt: '2022-11-10', orderStatus: '発送済み' },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addCustomer = (newCustomer) => {
    setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
  };

  const handleDeleteCustomer = (id) => {
    const isConfirmed = window.confirm('本当に削除しますか？');
    if (isConfirmed) {
      setCustomers(customers.filter((customer) => customer.id !== id));
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleGuestLogin = () => {
    setIsLoggedIn(true);
  };

  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId
          ? { ...customer, orderStatus: newStatus }
          : customer
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} />} />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <div style={{ display: 'flex' }}>
                  <Sidebar onLogout={handleLogout} />
                  <div style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                    <Route
                      path="dashboard"
                      element={
                        <Dashboard 
                          customers={customers}
                          setCustomers={setCustomers}
                          handleStatusChange={handleStatusChange}
                        />
                      }
                    />
                      <Route
                        path="customers"
                        element={
                          <CustomerList
                            customers={customers}
                            setCustomers={setCustomers} // ← 追加
                            handleDeleteCustomer={handleDeleteCustomer}
                            handleStatusChange={handleStatusChange} // ← 追加（必要であれば）
                          />
                        }
                      />
                      <Route
                        path="add-customer"
                        element={<AddCustomer addCustomer={addCustomer} />}
                      />
                    </Routes>
                  </div>
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default App;





