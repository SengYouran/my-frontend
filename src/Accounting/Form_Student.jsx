import React, { useRef, useMemo } from "react";
import { useDataContext } from "../Context";

const start_time = [
  { value: "07:00:00", text: "7:00 AM" },
  { value: "09:00:00", text: "9:00 AM" },
  { value: "01:00:00", text: "1:00 PM" },
  { value: "03:00:00", text: "3:00 PM" },
  { value: "06:00:00", text: "6:00 PM" },
];

const end_time = [
  { value: "09:00:00", text: "9:00 AM" },
  { value: "11:00:00", text: "11:00 AM" },
  { value: "03:00:00", text: "3:00 PM" },
  { value: "05:00:00", text: "5:00 PM" },
  { value: "08:00:00", text: "8:00 PM" },
];

function Form_Student() {
  const refStudet = useRef(null);
  const refStudetCreatedAt = useRef(null);

  const {
    formStudent,
    setFormStudent,
    handleChangeStudent,
    handleInsertStudent,
    className,
    listEmployee,
    listBook,
    loading,
  } = useDataContext();
  const inputStyle =
    "w-full border rounded px-2 py-1 outline-none focus:ring-2 focus:ring-purple-400";

  const teachers = useMemo(() => {
    return listEmployee?.results?.filter((emp) => emp.roles === "Teacher");
  }, [listEmployee]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h2 className="text-xl font-bold mb-3">Add new Student</h2>

      <form className="flex flex-col gap-4">
        {/* Gender */}
        <div>
          <label className="text-sm font-medium">Gender*</label>
          <div className="flex gap-6 mt-1">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender ?? ""}
                  checked={formStudent?.gender === gender}
                  onChange={handleChangeStudent}
                  className="w-5 h-5 accent-black"
                />
                {gender}
              </label>
            ))}
          </div>
        </div>

        {/* Class Teacher Book */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-sm font-medium">Class*</label>
            <select
              name="class_id"
              value={formStudent?.class_id ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">Select Class</option>
              {className?.map((cls) => (
                <option key={cls.class_id} value={cls.class_id}>
                  {cls.class_id} - {cls.class_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Teacher*</label>
            <select
              name="employee_id"
              value={formStudent?.employee_id ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">Select Teacher</option>
              {teachers?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id} - {t.last_name} {t.first_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Book*</label>
            <select
              name="book_id"
              value={formStudent?.book_id ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">Select Book</option>
              {listBook?.map((b) => (
                <option key={b.book_id} value={b.book_id}>
                  {b.book_id} - {b.book_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">ID Card*</label>
            <input
              name="id_card"
              type="text"
              value={formStudent?.id_card ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
              placeholder="ID student crad"
            >
              
            </input>
          </div>
        </div>

        {/* Shift Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium">Shift*</label>
            <select
              name="shift"
              value={formStudent?.shift ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Start Time*</label>
            <select
              name="start_time"
              value={formStudent?.start_time ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">Start Time</option>
              {start_time.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">End Time*</label>
            <select
              name="end_time"
              value={formStudent?.end_time ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            >
              <option value="">End Time</option>
              {end_time.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.text}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Name Telephone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-sm font-medium">First Name*</label>
            <input
              type="text"
              name="first_name"
              placeholder="First name"
              value={formStudent?.first_name ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Last Name*</label>
            <input
              type="text"
              name="last_name"
              placeholder="Last name"
              value={formStudent?.last_name ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Telephone*</label>
            <input
              type="text"
              name="telephone"
              placeholder="Telephone"
              value={formStudent?.telephone ?? ""}
              onChange={handleChangeStudent}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">DOB*</label>
            <input
              ref={refStudet}
              type="date"
              name="dob"
              value={formStudent?.dob ?? ""}
              onChange={handleChangeStudent}
              onClick={() => refStudet.current?.showPicker?.()}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Register*</label>
            <input
              ref={refStudetCreatedAt}
              type="date"
              name="createdAt"
              value={formStudent?.createdAt ?? ""}
              onChange={handleChangeStudent}
              onClick={() => refStudetCreatedAt.current?.showPicker?.()}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium">Address*</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formStudent?.address ?? ""}
            onChange={handleChangeStudent}
            className={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Description*</label>
          <textarea
            name="description"
            placeholder="Description..."
            value={formStudent?.description ?? ""}
            onChange={handleChangeStudent}
            className="w-full border rounded px-2 py-2 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={() => {
            handleInsertStudent();
          }}
          className="cursor-pointer bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 text-white py-2 rounded-md font-medium"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}

export default Form_Student;
