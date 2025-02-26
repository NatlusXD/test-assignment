import React, { useState } from "react";
import "./TransactionForm.css";

const ExpenseForm = () => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [comment, setComment] = useState("");

  const categories = ["Food", "Transport", "Entertainment"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const expense = { date, amount: parseFloat(amount), category, comment };

    const response = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });

    if (response.ok) {
      alert("Expense added successfully!");
      setDate("");
      setAmount("");
      setCategory("Food");
      setComment("");
    } else {
      alert("Error adding expense");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">Date:</label>
        <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} required />

        <label className="input-label">Amount:</label>
        <input type="number" className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} required />

        <label className="dropdown-label">Category:</label>
        <select className="dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className="input-label">Comment:</label>
        <textarea className="input-field" value={comment} onChange={(e) => setComment(e.target.value)} />

        <div className="buttons">
          <button type="submit" className="next">Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
