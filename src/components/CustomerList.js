import React, { useState } from 'react';

const CustomerList = () => {
  // サンプル顧客データ
  const customersData = [
    { id: 1, name: '佐藤 太郎', email: 'taro.sato@example.com', phone: '090-1234-5678', registeredAt: '2023-01-15' },
    { id: 2, name: '鈴木 花子', email: 'hanako.suzuki@example.com', phone: '080-2345-6789', registeredAt: '2022-12-20' },
    { id: 3, name: '田中 一郎', email: 'ichiro.tanaka@example.com', phone: '070-3456-7890', registeredAt: '2023-02-05' },
    { id: 4, name: '山田 さくら', email: 'sakura.yamada@example.com', phone: '090-4567-8901', registeredAt: '2022-11-10' },
  ];

  // 検索用の状態と顧客データの状態を管理
  const [searchTerm, setSearchTerm] = useState(''); // 検索ワード
  const [customers, setCustomers] = useState(customersData); // 顧客データ

  // 検索ワードが変更されたときの処理
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 検索結果を絞り込む処理
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) // 顧客名で検索
  );

  return (
    <div>
      <h2>顧客一覧</h2>
      {/* 検索ボックス */}
      <input
        type="text"
        placeholder="顧客名で検索"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>顧客名</th>
            <th>メールアドレス</th>
            <th>電話番号</th>
            <th>登録日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.length === 0 ? (
            <tr>
              <td colSpan="4">該当する顧客がありません</td>
            </tr>
          ) : (
            filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.registeredAt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;