import { AppBar, Box, Toolbar } from "@mui/material";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ setFilterDate, expenses }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link
          className="logo"
          exact
          to="/"
          style={{ marginRight: "30px" }}
          onClick={() => setFilterDate("")}>
          CashFlowTracker
        </Link>
        {expenses.length === 0 ? (
          <Navigate exact to="/add" />
        ) : (
          <Box display="flex">
            <Link exact to="/add">
              Add Expense
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
