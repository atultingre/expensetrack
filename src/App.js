import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import { Container } from "@mui/material";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/Form/ExpenseForm";
import ExpenseFormEdit from "./components/Form/ExpenseFormEdit";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
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



  return (
    <>
      <Navbar setFilterDate={setFilterDate} expenses={expenses}/>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Routes>
          <Route  path="/add" element={<ExpenseForm addExpense={addExpense} />} />
          <Route  path="/"  exact element={<ExpenseList expenses={expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} filterDate={filterDate}  setFilterDate={setFilterDate} /> } />
          <Route  path="/edit/:id"  element={ <ExpenseFormEdit  expenses={expenses}  updateExpense={updateExpense} />  } />
        </Routes>
      </Container>
      <Footer/>
    </>
  );
};

export default App;
