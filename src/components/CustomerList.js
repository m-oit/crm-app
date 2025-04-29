import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  Typography,
  useMediaQuery
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const CustomerList = ({ customers, handleDeleteCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        顧客一覧
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="検索（名前・メール・電話）"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>顧客名</TableCell>
              <TableCell>メールアドレス</TableCell>
              {!isMobile && <TableCell>電話番号</TableCell>}
              {!isMobile && <TableCell>登録日</TableCell>}
              <TableCell align="center">削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 3 : 5} align="center">
                  該当する顧客がありません
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell
                    onClick={() => navigate(`/customers/${customer.id}`)}
                    sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
                  >
                    {customer.name}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  {!isMobile && <TableCell>{customer.phone}</TableCell>}
                  {!isMobile && <TableCell>{customer.registeredAt}</TableCell>}
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDeleteCustomer(customer.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomerList;







