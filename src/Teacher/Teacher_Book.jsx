import React from "react";
import Form_Teacher_Book from "./Form_Teacher_Book";
import { useDataContext } from "../Context";

function Teacher_Book() {
  const {
    showFormTeacherbook,
    setShowFormTeacherBook,
    getTeacherBook,
    storeTeacherBook,
  } = useDataContext();
  return (
    <div className="mt-2">
      <table className="min-w-full overflow-hidden border border-gray-100">
        <thead className="bg-gray-200">
          <tr>
            <th className="md:px-4 md:py-2 p-1 text-left border-l-2">Teacher Name</th>
            <th className="md:px-4 md:py-2 p-1 text-left">Book Name</th>
            <th className="md:px-4 md:py-2 p-1 text-left">Subject</th>
          </tr>
        </thead>
        <tbody>
          {storeTeacherBook?.map((book, idx) => (
            <tr
              key={idx}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-blue-50 via-blue-100  to-blue-100"}`}
            >
              <td className="md:px-4 md:py-2 p-1 border-l-2">
                {book.last_name} {book.first_name}
              </td>

              <td className="md:px-4 md:py-2 p-1">{book.book_name}</td>

              <td className="md:px-4 md:py-2 p-1">
                <span className="text-blue-600 font-medium">
                  {book.subject}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teacher_Book;
