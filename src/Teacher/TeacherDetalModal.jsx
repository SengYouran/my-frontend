import React from "react";
import { useDataContext } from "../Context";

function TeacherDetailModal({ setDetailModal }) {
  const {
    TeacherDetailModal,
    handleChangeTeacher,
    formTeacher,
    teacher,
  } = useDataContext();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-4 w-[350px]">
        <h2 className="text-lg font-bold mb-3">Teacher Detail</h2>

        {/* Select Teacher */}
        <select
          name="employee_id"
          value={formTeacher?.employee_id}
          onChange={handleChangeTeacher}
          className="border px-3 py-2 w-full mb-2 outline-0"
        >
          <option value="">select teacher</option>
          {teacher?.map((t) => (
            <option key={t.employee_id} value={t.employee_id}>
              {t.employee_id} - {t.last_name} {t.first_name}
            </option>
          ))}
        </select>
       
        
        
        {/* Subject */}
        <input
          name="subject"
          placeholder="Subject"
          value={formTeacher?.subject}
          onChange={handleChangeTeacher}
          className="border p-2 w-full mb-2 outline-0"
        />

        {/* Qualification */}
        <input
          name="qualification"
          placeholder="e.g. Bachelor of Education (English) | TESOL Certified"
          value={formTeacher?.qualification}
          onChange={handleChangeTeacher}
          className="border p-2 w-full mb-2 outline-0"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => setDetailModal(false)}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={TeacherDetailModal}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetailModal;
