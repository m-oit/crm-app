import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Box,
  IconButton,
  Drawer,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './components/Login';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CustomerDetail from './components/CustomerDetail';

const App = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: '佐藤 太郎', email: 'taro.sato@example.com', phone: '090-1234-5678', registeredAt: '2023-01-15', orderStatus: '注文済み' },
    { id: 2, name: '鈴木 花子', email: 'hanako.suzuki@example.com', phone: '080-2345-6789', registeredAt: '2022-12-20', orderStatus: '注文確認中' },
    { id: 3, name: '田中 一郎', email: 'ichiro.tanaka@example.com', phone: '070-3456-7890', registeredAt: '2023-02-05', orderStatus: '発送準備中' },
    { id: 4, name: '山田 さくら', email: 'sakura.yamada@example.com', phone: '090-4567-8901', registeredAt: '2022-11-10', orderStatus: '発送済み' },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 180;

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

  const handleCustomerUpdate = (customerId, updatedData) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId
          ? { ...customer, ...updatedData } 
          : customer
      )
    );
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

  const drawer = (
    <Box sx={{ width: drawerWidth }}>
      <Sidebar onLogout={handleLogout} />
    </Box>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} onGuestLogin={handleGuestLogin} />} />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
                  {isMobile && (
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                      <Toolbar>
                        <IconButton
                          color="inherit"
                          aria-label="open drawer"
                          edge="start"
                          onClick={handleDrawerToggle}
                          sx={{ mr: 2 }}
                        >
                          <MenuIcon />
                        </IconButton>
                        CRM管理アプリ
                      </Toolbar>
                    </AppBar>
                  )}

                  {isMobile ? (
                    <Drawer
                      variant="temporary"
                      open={mobileOpen}
                      onClose={handleDrawerToggle}
                      ModalProps={{ keepMounted: true }}
                      sx={{
                        '& .MuiDrawer-paper': { width: drawerWidth },
                      }}
                    >
                      {drawer}
                    </Drawer>
                  ) : (
                    <Drawer
                      variant="permanent"
                      open
                      sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                          width: drawerWidth,
                          boxSizing: 'border-box',
                        },
                      }}
                    >
                      {drawer}
                    </Drawer>
                  )}

                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      p: 2,
                      mt: isMobile ? 8 : 0,
                      overflow: 'auto',
                    }}
                  >
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
                            setCustomers={setCustomers}
                            handleDeleteCustomer={handleDeleteCustomer}
                            handleStatusChange={handleStatusChange}
                          />
                        }
                      />
                      <Route
                        path="add-customer"
                        element={<AddCustomer addCustomer={addCustomer} />}
                      />
                      <Route
                        path="customers/:id"
                        element={
                          <CustomerDetail
                            customers={customers}
                            handleStatusChange={handleStatusChange}
                            handleCustomerUpdate={handleCustomerUpdate}
                          />
                        }
                      />
                    </Routes>
                  </Box>
                </Box>
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







