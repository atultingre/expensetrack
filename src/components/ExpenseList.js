import { useEffect, useState } from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SimCardDownloadIcon from "@mui/icons-material/SimCardDownload";

import "./Table.css";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";

const ExpenseList = ({
  expenses,
  deleteExpense,
  filterDate,
  onFilterChange,
}) => {
  const [sortType, setSortType] = useState(""); // Track the sort type

  const handleChange = (e) => {
    onFilterChange(e);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  const sortExpenses = (data, type) => {
    const sortedData = [...data]; // Create a copy of the data array

    switch (type) {
      case "dateAsc":
        sortedData.sort((a, b) => moment(a.date) - moment(b.date));
        break;
      case "dateDesc":
        sortedData.sort((a, b) => moment(b.date) - moment(a.date));
        break;
      case "amountAsc":
        sortedData.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        sortedData.sort((a, b) => b.amount - a.amount);
        break;
      case "titleAsc":
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return sortedData;
  };

  useEffect(() => {
    setSortType("dateAsc");
  }, []);

  const filteredExpenses = filterDate
    ? expenses.filter(
        (expense) => moment(expense.date).format("YYYY-MM") === filterDate
      )
    : expenses;

  const sortedExpenses = sortExpenses(filteredExpenses, sortType);

  const todaySpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "day"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const weekSpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "week"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthSpent = sortedExpenses
    .filter((expense) => moment(expense.date).isSame(moment(), "month"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const currentDate = moment();
  const yearStart = moment().startOf("year");
  const yearSpent = sortedExpenses
    .filter((expense) =>
      moment(expense.date).isBetween(yearStart, currentDate, "year", "[]")
    )
    .reduce((sum, expense) => sum + expense.amount, 0);

  const totalSpent = sortedExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleDownload = () => {
    const data = [
      ["Expenses Spent"],
      ["Duration", "Amount"],
      ["Today", todaySpent],
      ["Week", weekSpent],
      ["Month", monthSpent],
      ["Year", yearSpent],
      ["Total Spent", totalSpent],
      [],
      ["Date", "Title", "Amount"],
      ...sortedExpenses.map((expense) => [
        moment(expense.date).format("DD-MM-YYYY"),
        expense.title,
        expense.amount,
      ]),
      ["Total Spent", "", totalSpent],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    const excelData = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = "expenses.xlsx";
    const excelFile = new Blob([excelData], {
      type: "application/octet-stream",
    });
    saveAs(excelFile, fileName);
  };

  function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <Container maxWidth="md" className="w-full" sx={{ mt: 4, mb: 5 }}>
      <table className="w-full border border-gray-300 table1">
        <thead className="border-gray-300">
          <tr>
            <th
              colSpan={2}
              className="border-b-2 border-gray-300 px-4 py-2 text-center">
              Expenses Summery
            </th>
          </tr>
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2 text-center">
            Duration
            </th>
            <th className="border-b-2 border-gray-300 px-4 py-2 text-center">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <th className="border-b-2 border-gray-300 px-4 py-2 ">Today</th>
            <td className="border-b-2 border-gray-300 px-4 py-2 ">
              ₹ {numberWithCommas(todaySpent)}
            </td>
          </tr>
          <tr className="text-center">
            <th className="border-b-2 border-gray-300 px-4 py-2 ">Weekely</th>
            <td className="border-b-2 border-gray-300 px-4 py-2 ">
              ₹ {numberWithCommas(weekSpent)}
            </td>
          </tr>
          <tr className="text-center">
            <th className="border-b-2 border-gray-300 px-4 py-2 ">Monthly</th>
            <td className="border-b-2 border-gray-300 px-4 py-2 ">
              ₹ {numberWithCommas(monthSpent)}
            </td>
          </tr>
          <tr className="text-center">
            <th className="border-b-2 border-gray-300 px-4 py-2 ">Yearly </th>
            <td className="border-b-2 border-gray-300 px-4 py-2 ">
              ₹ {numberWithCommas(yearSpent)}
            </td>
          </tr>
          <tr className="text-center">
            <th className="border-b-2 border-gray-300 px-4 py-2 ">Total</th>
            <td className="border-b-2 border-gray-300 px-4 py-2 ">
              ₹ {numberWithCommas(totalSpent)}
            </td>
          </tr>
        </tbody>
      </table>
      <Grid container spacing={2} sx={{ mb: 1, mt: 3 }}>
        <Grid item xs={4}>
          <TextField
            type="month"
            label="Filter by month"
            value={filterDate}
            onChange={handleChange}
            size="medium"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="Sort">Sort by</InputLabel>
            <Select
              labelId="Sort"
              id="demo-simple-select"
              value={sortType}
              onChange={handleSortChange}
              label="Sort by"
              size="medium"
              fullWidth>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="dateAsc">Date Ascending</MenuItem>
              <MenuItem value="dateDesc">Date Descending</MenuItem>
              <MenuItem value="amountAsc">Amount Ascending</MenuItem>
              <MenuItem value="amountDesc">Amount Descending</MenuItem>
              <MenuItem value="titleAsc">Expenses A-Z</MenuItem>
              <MenuItem value="titleDesc">Expenses Z-A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ p: 1.7 }}
            onClick={handleDownload}
            fullWidth>
            Excel <SimCardDownloadIcon />
          </Button>
        </Grid>
      </Grid>
      <table className="w-full border border-gray-300 table mt-2">
        <thead className="text-left">
          <tr>
            <th className="border-b-2 border-gray-300 px-4 py-2">Date</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Expense</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Amount</th>
            <th className="border-b-2 border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedExpenses.map((expense) => (
            <>
              <tr key={expense.id}>
                <td className=" border-b border-gray-300 px-4 py-2">
                  {moment(expense.date).format("DD-MM-YYYY")}
                </td>
                <td className=" border-b border-gray-300 px-4 py-2">
                  {expense.title}
                </td>
                <td className=" border-b border-gray-300 px-4 py-2">
                  ₹ {numberWithCommas(expense.amount)}
                </td>

                <td className="flex items-center my-auto">
                  <Link
                    to={`/edit/${expense.id}`}
                    className="text-blue-700 border-gray-300  mr-2 items-center">
                    <ModeEditIcon />
                  </Link>
                  <Link
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 border-gray-300 items-center">
                    <DeleteOutlineIcon />
                  </Link>
                </td>
              </tr>
            </>
          ))}
          <tr>
            <th colSpan={2} className="aic">
              Total Spent
            </th>
            <th
              colSpan={2}
              className="border-b border-gray-300 px-4 py-2  text-left">
              ₹ {numberWithCommas(totalSpent)}
            </th>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default ExpenseList;
