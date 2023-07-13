import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = ({ setFilterDate, expenses,backgroundColor,color }) => {
  return (
    <Grid container>
      <AppBar className="AppBar "
        position="static"
        style={ { backgroundColor: backgroundColor, color: color }}
        >
        <Toolbar>
          <Grid item xs={7}>
            <Link 
              className="logo"
              exact
              to="/"
              onClick={() => setFilterDate("")}>
              SpendAnalyzer
            </Link>
          </Grid>
          {expenses.length === 0 ? (
            <Navigate exact to="/add" />
          ) : (
            <Grid item xs={5}>
              <Button variant="outlined" 
              className="addButton "
              // color="secondary" 
              // sx={{ color: "white", backgroundColor:'#4caf50' }}
        // style={{ backgroundColor: "#3f51b5", color: "white" }}
        style={{color: "white" }}
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
