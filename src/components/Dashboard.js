import React from 'react';
import { useDrop } from 'react-dnd';
import CustomerCard from './CustomerCard';

const Dashboard = ({ customers, setCustomers }) => {
  // ステータスごとにuseDropを使う
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
    drop: (item) => handleStatusChange(item.id, '注文済み'), // item.id を使用
  });

  const [{ isOver: isOverOrderConfirming }, dropOrderConfirming] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '注文確認中'), // item.id を使用
  });

  const [{ isOver: isOverShippingPreparation }, dropShippingPreparation] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '発送準備中'), // item.id を使用
  });

  const [{ isOver: isOverShipped }, dropShipped] = useDrop({
    accept: 'customer',
    drop: (item) => handleStatusChange(item.id, '発送済み'), // item.id を使用
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px' }}>
      {/* 注文済みのカラム */}
      <div
        ref={dropOrderReceived}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '10px',
          border: '1px solid #ccc',
          backgroundColor: isOverOrderReceived ? 'lightblue' : 'white',
        }}
      >
        <h2>注文済み</h2>
        {filterCustomersByStatus('注文済み').map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            handleStatusChange={handleStatusChange}
            status="注文済み"
          />
        ))}
      </div>

      {/* 注文確認中のカラム */}
      <div
        ref={dropOrderConfirming}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '10px',
          border: '1px solid #ccc',
          backgroundColor: isOverOrderConfirming ? 'lightblue' : 'white',
        }}
      >
        <h2>注文確認中</h2>
        {filterCustomersByStatus('注文確認中').map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            handleStatusChange={handleStatusChange}
            status="注文確認中"
          />
        ))}
      </div>

      {/* 発送準備中のカラム */}
      <div
        ref={dropShippingPreparation}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '10px',
          border: '1px solid #ccc',
          backgroundColor: isOverShippingPreparation ? 'lightblue' : 'white',
        }}
      >
        <h2>発送準備中</h2>
        {filterCustomersByStatus('発送準備中').map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            handleStatusChange={handleStatusChange}
            status="発送準備中"
          />
        ))}
      </div>

      {/* 発送済みのカラム */}
      <div
        ref={dropShipped}
        style={{
          flex: 1,
          minWidth: '200px',
          padding: '10px',
          border: '1px solid #ccc',
          backgroundColor: isOverShipped ? 'lightblue' : 'white',
        }}
      >
        <h2>発送済み</h2>
        {filterCustomersByStatus('発送済み').map(customer => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            handleStatusChange={handleStatusChange}
            status="発送済み"
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;



