// TransactionList.js
// TransactionList.js
import React from 'react';

const TransactionList = ({ transactions, onDeleteTransaction }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>
              <button className='dlt' onClick={() => onDeleteTransaction(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionList;
