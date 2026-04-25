import React, { useState } from "react";
import { useDataContext } from "../Context";
import TeacherDetailModal from "./TeacherDetalModal";
import Form_Teacher_Book from "./Form_Teacher_Book";

function List_teacher() {
  const {
    teacher,
    detaiModal,
    setDetailModal,
    showFormTeacherbook,
    loadingTeacher,
  } = useDataContext();
  if (loadingTeacher) {
    return (
      <div className="flex justify-center flex-col items-center gap-2 min-h-[74vh]">
        <div className="flex justify-center items-center gap-2 ">
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 rounded-md loader "></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 rounded-md loader "></div>
          <div className="w-4 h-4 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 rounded-md loader "></div>
        </div>
        <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full overflow-hidden border border-gray-100">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-1.5 md:px-4 md:py-2 text-left border-l-2">Name</th>
            <th className="p-1.5 md:px-4 md:py-2 text-left hidden xl:table-cell">
              Teacher ID
            </th>
            <th className="p-1.5 md:px-4 md:py-2 text-left">Role</th>
            <th className="p-1.5 md:px-4 md:py-2 text-left">Subject</th>
            <th className="p-1.5 md:px-4 md:py-2 text-left hidden md:table-cell">
              Book
            </th>
            <th className="p-1.5 md:px-4 md:py-2 text-left hidden xl:table-cell">
              Qualification
            </th>
            <th className="p-1.5 md:px-4 md:py-2 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {teacher?.map((t, index) => (
            <tr
              key={t.employee_id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gradient-to-r from-blue-50 via-blue-100  to-blue-100"}`}
            >
              <td className="p-1.5 md:px-4 md:py-2 border-l-2">
                {t.last_name} {t.first_name}
              </td>

              <td className="p-1.5 md:px-4 md:py-2 hidden xl:table-cell">
                {t.emp_id}
              </td>

              <td className="p-1.5 md:px-4 md:py-2">
                <span className="text-blue-600 font-medium">{t.roles}</span>
              </td>

              <td className="p-1.5 md:px-4 md:py-2">{t.subject || "N/A"}</td>
              <td className="p-1.5 md:px-4 md:py-2 hidden md:table-cell">
                {t.book_name || "N/A"}
              </td>
              <td className="p-1.5 md:px-4 md:py-2 hidden xl:table-cell">
                {t.qualification || "N/A"}
              </td>
              <td>
                <h2
                  onClick={() => {
                    setDetailModal(true);
                  }}
                  className="mr-2 px-3 py-1 text-center text-[14px] font-medium bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
                >
                  Add Detail
                </h2>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {detaiModal ? (
        <TeacherDetailModal
          detaiModal={detaiModal}
          setDetailModal={setDetailModal}
        />
      ) : null}
      {showFormTeacherbook && <Form_Teacher_Book />}
    </div>
  );
}

export default List_teacher;
