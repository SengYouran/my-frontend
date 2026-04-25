import React from "react";
import { useDataContext } from "../Context";

function SearchStudent() {
  const { searchStudentAt, setSearchStudentAt, handleSearchStudents } =
    useDataContext();
  return (
    <div className="flex items-center gap-2 md:border w-full md:w-65 border-2 border-gray-300 p-1 rounded-md bg-white">
      <input
        type="search"
        value={searchStudentAt}
        onChange={(e) => setSearchStudentAt(e.target.value)}
        className="outline-0 pl-1 w-full"
        placeholder="Search Student ..."
      />
      <h2
        onClick={() => handleSearchStudents()}
        className="text-[13px] text-center text-red-600 font-medium  cursor-pointer"
      >
        Search
      </h2>
    </div>
  );
}

export default SearchStudent;
