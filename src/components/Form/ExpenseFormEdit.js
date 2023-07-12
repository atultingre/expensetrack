import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from "@mui/material";

const ExpenseFormEdit = ({ expenses, updateExpense }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expense, setExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundExpense = expenses.find((expense) => expense.id === id);
    if (foundExpense) {
      setExpense(foundExpense);
      setTitle(foundExpense.title);
      setAmount(foundExpense.amount.toString());
      setDate(moment(foundExpense.date).format("YYYY-MM-DD"));
    } else {
      setExpense(null);
    }
  }, [id, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = {
      ...expense,
      title,
      amount: parseFloat(amount),
      date,
    };
    updateExpense(id, updatedExpense);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (!expense) {
    return <div>Expense not found</div>;
  }

  return (
    // <Paper sx={{p:3}}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Expense
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
          <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}>
            Save
          </Button>
          <Button
            type="button"
            onClick={handleCancel}
            variant="outlined"
            sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      </Container>
    // </Paper>
  );
};

export default ExpenseFormEdit;
