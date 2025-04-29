import React, { useState } from 'react';

const AddCustomer = ({ addCustomer }) => {
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', registeredAt: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone || !newCustomer.registeredAt) {
      alert('すべてのフィールドを入力してください');
      return;
    }




    // 「顧客を追加しますか？」という確認メッセージ
    const isConfirmed = window.confirm('顧客を追加しますか？');
    if (isConfirmed) {
      // 新規顧客にIDを追加
      const newId = new Date().getTime(); // 一意なIDを生成
      const currentDate = new Date().toISOString().split('T')[0]; // 今日の日付を YYYY-MM-DD 形式で取得
      const newCustomerData = { ...newCustomer, id: newId, registeredAt: currentDate }; // 登録日を設定


      // 親コンポーネントのaddCustomer関数を呼び出して顧客を追加
      addCustomer(newCustomerData);
      setNewCustomer({ name: '', email: '', phone: '', registeredAt: '' }); // フォームをクリア
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>新規顧客追加</h2>
      <input
        type="text"
        name="name"
        value={newCustomer.name}
        onChange={handleInputChange}
        placeholder="顧客名"
        style={{ padding: '10px', margin: '5px', width: '100%' }}
      />
      <input
        type="email"
        name="email"
        value={newCustomer.email}
        onChange={handleInputChange}
        placeholder="メールアドレス"
        style={{ padding: '10px', margin: '5px', width: '100%' }}
      />
      <input
        type="text"
        name="phone"
        value={newCustomer.phone}
        onChange={handleInputChange}
        placeholder="電話番号"
        style={{ padding: '10px', margin: '5px', width: '100%' }}
      />
      <input
        type="date"
        name="registeredAt"
        value={newCustomer.registeredAt}
        onChange={handleInputChange}
        placeholder="登録日"
        style={{ padding: '10px', margin: '5px', width: '100%' }}
      />
      <button onClick={handleAddCustomer} style={{ padding: '10px 20px', marginTop: '10px' }}>
        顧客追加
      </button>
    </div>
  );
};

export default AddCustomer;


