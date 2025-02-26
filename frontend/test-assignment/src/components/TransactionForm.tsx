import React, { useState } from "react";
import "./TransactionForm.css";

const TransactionForm = () => {
  const [dateTime, setDateTime] = useState("");
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("Food");
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("Guest");

  const categories = ["Food", "Transport", "Entertainment"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const transaction = {
      dateTime,
      sum: parseFloat(sum),
      category,
      comment,
      author,
    };

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error("Error adding transaction");
      }

      alert("Transaction added successfully!");
      setDateTime("");
      setSum("");
      setCategory("Food");
      setComment("");
      setAuthor("Guest");
    } catch (error) {
      alert("Failed to add transaction");
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="input-label">Date & Time:</label>
        <input type="datetime-local" className="input-field" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />

        <label className="input-label">Amount:</label>
        <input type="number" className="input-field" value={sum} onChange={(e) => setSum(e.target.value)} required />

        <label className="dropdown-label">Category:</label>
        <select className="dropdown" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className="input-label">Comment:</label>
        <textarea className="input-field" value={comment} onChange={(e) => setComment(e.target.value)} />

        <label className="input-label">Author:</label>
        <input type="text" className="input-field" value={author} onChange={(e) => setAuthor(e.target.value)} required />

        <div className="buttons">
          <button type="submit" className="next">Add Transaction</button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
