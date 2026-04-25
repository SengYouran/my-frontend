import React from "react";

function Student_Attendance_Form({
  activeStudnet,
  setShowAttendance,
  handleAttendance,
  formAttendance,
  handleChangeStudentAttendance,
  loading,
}) {
  const inputStyle =
    "w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-center justify-center p-3">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5">

          <h2 className="text-xl text-gray-700 font-medium mb-4">
            Add Student Attendance
          </h2>

          <form className="flex flex-col gap-4">
            {/* Student */}
            <div>
              <label className="text-sm font-medium">Student Name*</label>
              <select
                name="student_id"
                value={formAttendance?.student_id ?? ""}
                onChange={handleChangeStudentAttendance}
                className={inputStyle}
              >
                <option value="">Select student</option>
                {activeStudnet?.map((stu) => (
                  <option key={stu.student_id + stu.last_name} value={stu.student_id}>
                    {stu.student_id} - {stu.last_name} {stu.first_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium">Attendance Date*</label>
              <input
                type="date"
                name="attendance_date"
                value={formAttendance?.attendance_date ?? ""}
                onChange={handleChangeStudentAttendance}
                className={inputStyle}
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium">Attendance*</label>
              <select
                name="attendance_status"
                value={formAttendance?.attendance_status ?? ""}
                onChange={handleChangeStudentAttendance}
                className={inputStyle}
              >
                <option value="">Select attendance</option>
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium">Description*</label>
              <textarea
                name="description"
                value={formAttendance?.description ?? ""}
                onChange={handleChangeStudentAttendance}
                placeholder="Optional note..."
                className={`${inputStyle} min-h-[80px]`}
              />
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowAttendance(false)}
                className="border rounded-md py-2 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAttendance}
                className="rounded-md py-2 font-medium text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setShowAttendance(false)}
        className="fixed inset-0 bg-black/40 z-20"
      />
    </>
  );
}

export default Student_Attendance_Form;