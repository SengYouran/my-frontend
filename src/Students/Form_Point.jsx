import React, { useEffect, useRef, useState } from "react";
import { useDataContext } from "../Context";

function Form_Point({ activeStudnet, setShowPoint }) {

  const {
    handleChangeStudentPoint,
    handleInsertStudentPoint,
    formStudentPoint,
    loading,
    listBook,
  } = useDataContext();

  const refPointDate = useRef(null);
  const refStudent = useRef(null);

  const [search, setSearch] = useState("");
  const [showDropDown, setShowDropdown] = useState(false);

  const inputStyle =
    "w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400";

  const filteredStudent = activeStudnet?.filter((sr) =>
    `${sr?.last_name}${sr?.first_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (refStudent.current && !refStudent.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // sync search text when student selected
  useEffect(() => {
    if (formStudentPoint?.student_id) {

      const selected = activeStudnet?.find(
        (s) => s.student_id === formStudentPoint.student_id
      );

      if (selected) {
        setSearch(
          `${selected.student_id} - ${selected.last_name} ${selected.first_name}`
        );
      }

    } else {
      setSearch("");
    }
  }, [formStudentPoint?.student_id, activeStudnet]);

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 z-30 flex items-center justify-center p-3">

        <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-5">

          <form className="flex flex-col gap-4">

            {/* Student Search */}
            <div className="relative" ref={refStudent}>
              <label className="text-sm font-medium">Student Name*</label>

              <input
                type="text"
                placeholder="Search student..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className={inputStyle}
              />

              {showDropDown && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-md max-h-44 overflow-y-auto shadow-lg z-50">

                  {filteredStudent?.length > 0 ? (
                    filteredStudent.map((stu) => (
                      <div
                        key={stu.student_id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => {

                          setSearch(
                            `${stu.student_id} - ${stu.last_name} ${stu.first_name}`
                          );

                          setShowDropdown(false);

                          handleChangeStudentPoint({
                            target: {
                              name: "student_id",
                              value: stu.student_id,
                            },
                          });
                        }}
                      >
                        {stu.student_id} - {stu.last_name} {stu.first_name}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-400 text-sm">
                      No student found
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Book */}
            <div>
              <label className="text-sm font-medium">Book Name*</label>

              <select
                name="book_id"
                value={formStudentPoint?.book_id ?? ""}
                onChange={handleChangeStudentPoint}
                className={inputStyle}
              >
                <option value="">Select book</option>

                {listBook?.map((bk) => (
                  <option key={bk.book_id} value={bk.book_id}>
                    {bk.book_id} - {bk.book_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Attendance */}
            <input
              type="text"
              name="attendance_point"
              placeholder="Attendance point"
              value={formStudentPoint?.attendance_point ?? ""}
              onChange={handleChangeStudentPoint}
              className={inputStyle}
            />

            {/* Question Homework */}
            <input
              type="text"
              name="question_point"
              placeholder="Homework question point"
              value={formStudentPoint?.question_point ?? ""}
              onChange={handleChangeStudentPoint}
              className={inputStyle}
            />

            {/* Total */}
            <input
              type="text"
              name="total_point"
              placeholder="Total point"
              value={formStudentPoint?.total_point ?? ""}
              onChange={handleChangeStudentPoint}
              className={inputStyle}
            />

            {/* Date */}
            <div className="relative">
              <label className="text-sm font-medium">Point Date*</label>

              <input
                ref={refPointDate}
                type="date"
                name="point_date"
                value={formStudentPoint?.point_date ?? ""}
                onChange={handleChangeStudentPoint}
                onClick={() => refPointDate.current?.showPicker?.()}
                className={inputStyle}
              />
            </div>

            {/* Remark */}
            <textarea
              name="remark"
              placeholder="Remark..."
              value={formStudentPoint?.remark ?? ""}
              onChange={handleChangeStudentPoint}
              className={`${inputStyle} min-h-[80px]`}
            />

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() => setShowPoint(false)}
                className="cursor-pointer border rounded-md py-2 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleInsertStudentPoint}
                className="cursor-pointer rounded-md py-2 font-medium text-white bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600"
              >
                {loading ? "Saving..." : "Save"}
              </button>

            </div>

          </form>
        </div>

      </div>

      {/* backdrop */}
      <div
        onClick={() => setShowPoint(false)}
        className="fixed inset-0 bg-black/40 z-20"
      />
    </>
  );
}

export default Form_Point;