import React, { useState, useEffect } from 'react';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3000/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    setFilteredTransactions([...filteredTransactions, newTransaction]);
  };

  const filterTransactions = (searchTerm) => {
    const filtered = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  const deleteTransaction = (id) => {
    // Filter out the deleted transaction from both transactions and filteredTransactions
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    const updatedFilteredTransactions = filteredTransactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
    setFilteredTransactions(updatedFilteredTransactions);
  };

  const sortTransactionsByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => transaction.category === category);
      setFilteredTransactions(filtered);
    }
  };

  return (
    <div className="App">
      <h1>Transaction Tracker</h1>
      <div className="input">

      <input
        type="text"
        placeholder="Search by Description"
        onChange={(e) => filterTransactions(e.target.value)}
      />
      <div className="select">
      <select
        value={selectedCategory}
        onChange={(e) => sortTransactionsByCategory(e.target.value)}
      >
        <option value="All">All</option>
        {Array.from(new Set(transactions.map((transaction) => transaction.category)).values()).map(
          (category) => (
            <option key={category} value={category}>
              {category}
            </option>
          )
        )}
      </select>
      </div>
      </div>

      <TransactionForm addTransaction={addTransaction} />

      <TransactionList className="table" transactions={filteredTransactions} onDeleteTransaction={deleteTransaction} />
    </div>
  );
}

export default App;
