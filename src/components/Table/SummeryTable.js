
const SummeryTable = ({todaySpent,weekSpent,monthSpent,yearSpent, totalSpent,numberWithCommas}) => {

  
  return (
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
  )
}

export default SummeryTable