import React, { useEffect, useMemo, useState } from "react";
import { useDataContext } from "../Context";

function ListStudentPoint({ auth }) {
  const {
    listStudentPoint,
    listBook,
    storeTeacherBook,
    OneEmp,
    setBook_id,
    book_id,
  } = useDataContext();
  const [classBG, setClassBG] = useState(0);
  const teacherBooks = [...new Set(listBook.map((item) => item.book_name))];
  const bookUnderTeacher = storeTeacherBook?.filter(
    (check) => check.id === OneEmp?.id,
  );
  const filteredBooks = bookUnderTeacher.filter((book) =>
    teacherBooks.includes(book.book_name),
  );
  // ❌ REMOVE classBG state → derive from book_id instead
  const activeIndex = useMemo(() => {
    return filteredBooks.findIndex((b) => b.book_id === book_id);
  }, [filteredBooks, book_id]);
  useEffect(() => {
    if (filteredBooks.length > 0 && !book_id) {
      setBook_id(filteredBooks[0].book_id);
    }
  }, [filteredBooks]);

  return (
    <div className="overflow-x-auto mt-3">
      {auth?.role === "Teacher" && (
        <div className="flex items-center flex-wrap gap-2 my-4">
          {filteredBooks?.map((render, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={idx}
                className={`${
                  isActive
                    ? "text-white bg-gradient-to-r from-purple-400 via-blue-500 to-blue-600"
                    : "text-black border border-gray-400 hover:bg-gray-200"
                } rounded-md px-3 p-1 cursor-pointer`}
                onClick={() => {
                  setBook_id(render.book_id);
                }}
              >
                <h2 className="text-[14px] font-medium">{render?.book_name}</h2>
              </div>
            );
          })}
        </div>
      )}
      {listStudentPoint?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 min-h-[60vh]">
          <h2 className="text-3xl text-gray-700 font-bold">
            No score records found.
          </h2>
          <p className="text-[17px] text-gray-600 font-medium">
            Student ranking list is currently empty.
          </p>
        </div>
      ) : (
        <table className="border border-gray-200 min-w-full text-sm xl:text-[15px]">
          <thead className="bg-gray-200">
            <tr>
              <th className="xl:px-3 xl:py-2 p-1 text-left border-l-2">Name</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left">Attendance</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left">Question</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left">Subject</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left">Total</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left">Rank</th>
              <th className="xl:px-3 xl:py-2 p-1 text-left hidden xl:table-cell">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {listStudentPoint.map((point, idx) => (
              <tr
                key={idx}
                className={
                  idx === 0
                    ? "bg-green-100 font-bold"
                    : idx % 2 === 0
                      ? "bg-white"
                      : "bg-blue-50"
                }
              >
                <td className="xl:px-3 xl:py-2 p-1 border-l-2">
                  {point.last_name} {point.first_name}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 text-left">
                  {point.total_attendance_points}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 text-left">
                  {point.total_question_points}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 text-left">
                  {point.subject_points}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 text-left text-green-600 font-semibold">
                  {point.total_points}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 text-left">
                  {point.ranking}
                </td>
                <td className="xl:px-3 xl:py-2 p-1 hidden xl:table-cell">
                  {point.remark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListStudentPoint;
