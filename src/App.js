import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import { Box, Container } from "@mui/material";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/Form/ExpenseForm";
import ExpenseFormEdit from "./components/Form/ExpenseFormEdit";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import { colorCombinations } from "./components/colorData";

const App = () => {
  const [filterDate, setFilterDate] = useState("");
  const [colorCombination, setColorCombination] = useState({});
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

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


  useEffect(() => {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * colorCombinations.length);
    // Set the random color combination
    setColorCombination(colorCombinations[randomIndex]);
  }, []);

  // Add Expenses
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    Swal.fire({
      icon: "success",
      title: "Expense Added",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  
  // Update Expenses
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
  
  // Delete Expenses
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }} >
      <Navbar setFilterDate={setFilterDate} expenses={expenses} backgroundColor={colorCombination.backgroundColor} color={colorCombination.color}/>
      <Container component="main" sx={{ flexGrow: 1, mt: 4, mb: 2 }}>
        <Routes>
          <Route  path="/add" element={<ExpenseForm addExpense={addExpense} backgroundColor={colorCombination.backgroundColor} color={colorCombination.color}/>} />
          <Route  path="/"  exact element={<ExpenseList expenses={expenses} updateExpense={updateExpense} deleteExpense={deleteExpense} filterDate={filterDate}  setFilterDate={setFilterDate} backgroundColor={colorCombination.backgroundColor} color={colorCombination.color}/> } />
          <Route  path="/edit/:id"  element={ <ExpenseFormEdit  expenses={expenses}  updateExpense={updateExpense} backgroundColor={colorCombination.backgroundColor} color={colorCombination.color}/>  } />
        </Routes>
      </Container>
      <Footer backgroundColor={colorCombination.backgroundColor} color={colorCombination.color}/>    
    </Box>
  );
};

export default App;
