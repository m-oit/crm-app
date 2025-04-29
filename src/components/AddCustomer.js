import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const AddCustomer = ({ addCustomer }) => {
  const today = new Date().toISOString().split('T')[0];
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    registeredAt: today,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    const { name, email, phone, registeredAt } = newCustomer;
    if (!name || !email || !phone || !registeredAt) {
      alert('すべてのフィールドを入力してください');
      return;
    }

    const isConfirmed = window.confirm('顧客を追加しますか？');
    if (isConfirmed) {
      const newId = new Date().getTime();
      const newCustomerData = { ...newCustomer, id: newId };
      addCustomer(newCustomerData);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        registeredAt: today,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          新規顧客追加
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="顧客名"
            name="name"
            value={newCustomer.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="メールアドレス"
            name="email"
            type="email"
            value={newCustomer.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="電話番号"
            name="phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="登録日"
            name="registeredAt"
            type="date"
            value={newCustomer.registeredAt}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCustomer}
            sx={{ mt: 1 }}
          >
            顧客追加
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddCustomer;



