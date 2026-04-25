import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDataContext } from "../Context";

function SearchStudentPayment() {
  const [search, setSearch] = useState("");

  const {
    searchPaidUnpaid,
    setSearchPaidUnpaid,
    searchStudentPaidUnpaid,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterByDate,
  } = useDataContext();
  return (
    <div className="bg-gradient-to-l rounded-md from-red-50 via-blue-50 to-blue-100 p-2">
      <form className="flex justify-between items-center flex-wrap md:flex-nowrap gap-4 md:gap-6">
        {/* Search Input */}
        <div className="flex items-center gap-2 border border-gray-300 p-1 w-full rounded-md bg-white">
          <input
            type="search"
            value={searchPaidUnpaid}
            onChange={(e) => setSearchPaidUnpaid(e.target.value)}
            onClick={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            className="outline-0 pl-1 w-full"
            placeholder="Search Student ..."
          />
          <h2
            onClick={() => searchStudentPaidUnpaid()}
            className="text-[13px] cursor-pointer font-medium text-blue-600"
          >
            Search
          </h2>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-3 w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            withPortal
            dateFormat="dd-MM-yyyy"
            placeholderText="Start Date"
            className="border w-full px-2 py-1 rounded-md"
          />

          <span>to</span>

          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate} // prevent selecting before start
            dateFormat="dd-MM-yyyy"
            withPortal
            placeholderText="End Date"
            wrapperClassName="w-auto"
            className="border w-full px-2 py-1 rounded-md outline-0 bg-white"
          />

          <h2
            onClick={() => handleFilterByDate()}
            className="text-white cursor-pointer font-medium text-[14px] bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600 px-4 py-1 rounded-md hover:opacity-80 transition"
          >
            Apply
          </h2>
        </div>
      </form>
    </div>
  );
}

export default SearchStudentPayment;
