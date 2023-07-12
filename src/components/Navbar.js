import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ setFilterDate, expenses }) => {
  return (
    <Grid container>
      <AppBar
        position="static"
        // style={{ backgroundColor: "#ff9800", color: "black" }}
        >
        <Toolbar>
          <Grid item xs={8}>
            <Link
              className="logo"
              exact
              to="/"
              onClick={() => setFilterDate("")}>
              CashFlowTracker
            </Link>
          </Grid>
          {expenses.length === 0 ? (
            <Navigate exact to="/add" />
          ) : (
            <Grid item xs={4}>
              <Button variant="outlined"
              // color="secondary" 
              sx={{ color: "white" }}
              >
                <Link exact to="/add">
                  Add Expense
                </Link>
              </Button>
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Navbar;
