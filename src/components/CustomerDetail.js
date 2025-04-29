import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';

const statusOptions = ['注文確認中', '注文済み', '発送準備中', '発送済み'];

const CustomerDetail = ({ customers, handleStatusChange, handleCustomerUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = customers.find((c) => c.id === parseInt(id));

  const [tempStatus, setTempStatus] = useState(customer?.orderStatus || '');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
  });

  if (!customer) {
    return <Typography>顧客が見つかりません</Typography>;
  }

  const handleSave = () => {
    handleStatusChange(customer.id, tempStatus);
    handleCustomerUpdate(customer.id, formData);
    setIsEditing(false);
    navigate('/customers');
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        顧客詳細
      </Typography>

      {!isEditing ? (
        <>
          <Typography variant="subtitle1">名前: {customer.name}</Typography>
          <Typography variant="subtitle1">メール: {customer.email}</Typography>
          <Typography variant="subtitle1">電話: {customer.phone}</Typography>
          
          <Typography variant="subtitle1">ステータス: {customer.orderStatus}</Typography>
        </>
      ) : (
        <>
          <TextField
            label="名前"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="メール"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="電話番号"
            variant="outlined"
            fullWidth
            margin="normal"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>ステータス</InputLabel>
            <Select
              value={tempStatus}
              label="ステータス"
              onChange={(e) => setTempStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}

      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            保存
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEditToggle}>
            編集
          </Button>
        )}
        <Button variant="outlined" onClick={() => navigate(-1)}>
          戻る
        </Button>
      </Box>
    </Box>
  );
};

export default CustomerDetail;



