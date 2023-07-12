import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Grid,
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
    <Container maxWidth="md" sx={{ mt: 10, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Edit Expense
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={1} rowGap={1}>
          <Grid item xs={12} >
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              color="warning"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              color="warning"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              fullWidth
              color="warning"
            />
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Save
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              onClick={handleCancel}
              variant="outlined"
              fullWidth>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ExpenseFormEdit;
