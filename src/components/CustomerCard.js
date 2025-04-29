import React from 'react';
import { useDrag } from 'react-dnd';

const CustomerCard = ({ customer, handleStatusChange }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'customer',
    item: { id: customer.id, orderStatus: customer.orderStatus },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        borderRadius: '5px',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <h3>{customer.name}</h3>
      <p>Email: {customer.email}</p>
      <p>Phone: {customer.phone}</p>
      <p>登録日: {customer.registeredAt}</p>
      <strong>ステータス: {customer.orderStatus}</strong>
    </div>
  );
};

export default CustomerCard;
