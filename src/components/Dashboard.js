import React from 'react';
import { useDrop } from 'react-dnd';
import CustomerCard from './CustomerCard';

const Dashboard = ({ customers, setCustomers }) => {
  const handleStatusChange = (customerId, newStatus) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === customerId
          ? { ...customer, orderStatus: newStatus }
          : customer
      )
    );
  };

  const filterCustomersByStatus = (status) => {
    return customers.filter(customer => customer.orderStatus === status);
  };

  const [{ isOver: isOverOrderReceived }, dropOrderReceived] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '注文済み'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverOrderConfirming }, dropOrderConfirming] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '注文確認中'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverShippingPreparation }, dropShippingPreparation] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '発送準備中'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const [{ isOver: isOverShipped }, dropShipped] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '発送済み'),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const renderColumn = (title, status, ref, isOver) => (
    <div
      ref={ref}
      style={{
        flex: '1 1 0',
        minWidth: '0',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: isOver ? '#e3f2fd' : '#fafafa',
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        border: '1px solid #ddd',
        transition: 'background-color 0.2s ease',
        margin: '5px',
      }}
    >
      <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>{title}</h3>
      {filterCustomersByStatus(status).map(customer => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          handleStatusChange={handleStatusChange}
          status={status}
        />
      ))}
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '10px',
        gap: '10px',
        justifyContent: 'space-between',
      }}
    >
      {renderColumn('注文済み', '注文済み', dropOrderReceived, isOverOrderReceived)}
      {renderColumn('注文確認中', '注文確認中', dropOrderConfirming, isOverOrderConfirming)}
      {renderColumn('発送準備中', '発送準備中', dropShippingPreparation, isOverShippingPreparation)}
      {renderColumn('発送済み', '発送済み', dropShipped, isOverShipped)}
    </div>
  );
};

export default Dashboard;







