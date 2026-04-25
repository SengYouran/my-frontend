import React from "react";
import { useDataContext } from "../Context";

function Form_Teacher_Book() {
  const {
    teacherBook,
    handleChangeTeacherBook,
    listBook,
    teacher,
    showFormTeacherbook,
    setShowFormTeacherBook,
    getTeacherBook,
    handleTeacherBook,
  } = useDataContext();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form action="">
        <div className="bg-white rounded-xl p-4 w-[350px]">
          <h2 className="text-lg font-bold mb-3">Teacher Detail</h2>

          {/* Select Teacher */}
          <select
            name="teacher_id"
            value={teacherBook?.teacher_id}
            onChange={handleChangeTeacherBook}
            className="border px-3 py-2 w-full mb-2 outline-0"
          >
            <option value="">select teacher</option>
            {teacher?.map((t) => (
              <option key={t.employee_id} value={t.id}>
                {t.id} - {t.last_name} {t.first_name}
              </option>
            ))}
          </select>

          <select
            name="book_id"
            value={teacherBook?.book_id ?? ""}
            onChange={handleChangeTeacherBook}
            className="border px-3 py-2 w-full mb-2 outline-0"
          >
            <option value="">select book</option>
            {listBook?.map((bk, idx) => (
              <option
                key={idx}
                value={bk?.book_id}
                className="text-[14px] font-medium"
              >
                {bk?.student_id} - {bk?.book_name}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <div
              onClick={() => setShowFormTeacherBook(false)}
              className="w-full px-3 py-2 hover:bg-gray-200 cursor-pointer rounded-md text-black border"
            >
              <h2 className="text-center">Cencel</h2>
            </div>
            <div
              onClick={() => handleTeacherBook()}
              className="w-full px-3 py-2 hover:opacity-80 cursor-pointer rounded-md text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 "
            >
              <h2 className="text-center">Save</h2>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form_Teacher_Book;
