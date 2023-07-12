import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Typography, TextField, Button, Container, Box } from "@mui/material";

const ExpenseForm = ({ addExpense }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      date: new Date(date),
    };
    addExpense(expense);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
          />
        </div>
        <div>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
          />
        </div>
        <div>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            fullWidth
            sx={{ mt: 2 }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2, mr: 2 }}
        >
          Add
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          variant="outlined"
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default ExpenseForm;