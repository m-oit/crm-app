import React, { useState, useEffect } from 'react';

const CustomerList = ({ customers, handleDeleteCustomer, handleStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedCustomers, setSortedCustomers] = useState(customers);
  const [sortDirection, setSortDirection] = useState('asc'); // asc: 昇順、desc: 降順
  const [sortedColumn, setSortedColumn] = useState(null);

  // 検索機能
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // フィルタリングとソート
  useEffect(() => {
    // 検索フィルター: 顧客名、メールアドレス、電話番号のいずれかに一致するかチェック
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );

    // ソート
    const sortedList = [...filtered].sort((a, b) => {
      if (sortedColumn) {
        // ソート対象のデータ型を判別
        let compareA = a[sortedColumn];
        let compareB = b[sortedColumn];

        // 日付の場合
        if (sortedColumn === 'registeredAt') {
          compareA = new Date(compareA);
          compareB = new Date(compareB);
        }

        // 文字列の場合
        if (typeof compareA === 'string') {
          compareA = compareA.toLowerCase();
          compareB = compareB.toLowerCase();
        }

        if (compareA < compareB) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (compareA > compareB) {
          return sortDirection === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });

    setSortedCustomers(sortedList);
  }, [searchTerm, customers, sortedColumn, sortDirection]);

  // ソート機能
  const handleSort = (column) => {
    const direction = sortedColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(direction);
    setSortedColumn(column);
  };

  // ステータス変更機能
  const handleStatusChangeClick = (customerId, newStatus) => {
    handleStatusChange(customerId, newStatus);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2>顧客一覧</h2>
      <input
        type="text"
        placeholder="顧客名、メールアドレス、電話番号で検索"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '5px',
          border: '1px solid #ddd',
        }}
      />

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', border: '1px solid #ddd' }}>
          <thead>
            <tr>
              <th style={{ width: '20%', border: '1px solid #ddd', padding: '10px' }}>
                <span onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                  顧客名 {sortedColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
              </th>
              <th style={{ width: '30%', border: '1px solid #ddd', padding: '10px' }}>
                <span onClick={() => handleSort('email')} style={{ cursor: 'pointer' }}>
                  メールアドレス {sortedColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
              </th>
              <th style={{ width: '20%', border: '1px solid #ddd', padding: '10px' }}>
                <span onClick={() => handleSort('phone')} style={{ cursor: 'pointer' }}>
                  電話番号 {sortedColumn === 'phone' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
              </th>
              <th style={{ width: '15%', border: '1px solid #ddd', padding: '10px' }}>
                <span onClick={() => handleSort('registeredAt')} style={{ cursor: 'pointer' }}>
                  登録日 {sortedColumn === 'registeredAt' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
              </th>
              <th style={{ width: '10%', border: '1px solid #ddd', padding: '10px' }}>
                ステータス
              </th>
              <th style={{ width: '15%', border: '1px solid #ddd', padding: '10px' }}>削除</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>該当する顧客がありません</td>
              </tr>
            ) : (
              sortedCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{customer.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{customer.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{customer.phone}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>{customer.registeredAt}</td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <select
                      value={customer.orderStatus}
                      onChange={(e) => handleStatusChangeClick(customer.id, e.target.value)}
                      style={{
                        padding: '5px',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                      }}
                    >
                      <option value="注文済み">注文済み</option>
                      <option value="注文確認中">注文確認中</option>
                      <option value="発送準備中">発送準備中</option>
                      <option value="発送済み">発送済み</option>
                    </select>
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                      }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;





