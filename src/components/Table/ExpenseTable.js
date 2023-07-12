import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ExpenseTable = ({sortedExpenses,numberWithCommas, deleteExpense,totalSpent}) => {
  return (
    <div>
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
    </div>
  )
}

export default ExpenseTable