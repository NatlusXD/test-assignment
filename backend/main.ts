const express = require("express");
const cors = require("cors");
const sql = require("mssql");

const app = express();
app.use(cors());
app.use(express.json());

const config = {
  user: "root",
  password: "root",
  server: "localhost",
  database: "EXPENSES",
  options: {
    trustedConnection: true,
    enableArithAbort: true,
    trustServerCertificate: true
  },
  port: 1433
};


sql.connect(config)
  .then(() => console.log("Connected to SQL Server"))
  .catch((err) => console.error("Database connection failed", err));

app.post("/api/expenses", async (req, res) => {
  try {
    const { date, amount, category, comment } = req.body;

    if (!date || !amount || !category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const request = new sql.Request();
    request.input("date", sql.Date, date);
    request.input("amount", sql.Decimal(10, 2), amount);
    request.input("category", sql.NVarChar(50), category);
    request.input("comment", sql.NVarChar(255), comment || "");

    await request.query(`
      INSERT INTO Expenses (date, amount, category, comment)
      VALUES (@date, @amount, @category, @comment)
    `);

    res.status(201).json({ message: "Expense added" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
