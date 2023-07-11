import React, { useState, useEffect } from "react";
import { Route, Link, Routes, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { AppBar, Toolbar, Container } from "@mui/material";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseFormEdit from "./components/ExpenseFormEdit";
import './index.css';
const App = () => {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [filterDate, setFilterDate] = useState("");
  // Save expenses to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Load expenses from local storage on initial render
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    Swal.fire({
      icon: "success",
      title: "Expense Added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const updateExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    Swal.fire({
      icon: "success",
      title: "Expense Updated",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const deleteExpense = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);
        Swal.fire({
          icon: "success",
          title: "Expense Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const handleHomeClick = () => {
    setFilterDate("");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <NavLink className="logo" to='/'>CashFlowTracker</NavLink>
          <nav>
            <Link
              to="/"
              onClick={handleHomeClick}
              style={{ marginLeft: "20px", color: "white" }}>
              Home
            </Link>
            <Link to="/add" style={{ marginLeft: "20px", color: "white" }}>
              Add Expense
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Routes>
          <Route
            path="/add"
            element={<ExpenseForm addExpense={addExpense} />}
          />
          <Route
            path="/"
            exact
            element={
              <ExpenseList
                expenses={expenses}
                updateExpense={updateExpense}
                deleteExpense={deleteExpense}
                filterDate={filterDate}
                onFilterChange={handleFilterChange}
              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ExpenseFormEdit
                expenses={expenses}
                updateExpense={updateExpense}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
