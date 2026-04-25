import { useEffect, useRef } from "react";
import { useDataContext } from "../Context";

function FormEmployee({
  employees,
  handleChangeEmployee,
  handleCrateEmployee,
  update,
  handleUpdateEmployee,
  profile,
  setProfile,
  loadingEmployee,
}) {
  const refData = useRef(null);
  const { setEmployees, initialEmployee } = useDataContext();
  const ref_Hire_Data = useRef(null);
  useEffect(() => {
    if (update) {
      setEmployees(initialEmployee);
    }
  }, [update]);
  return (
    <form
      className="w-full mx-auto p-4 bg-white shadow-md rounded-md space-y-2"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold">
        {profile ? "Edit" : "Add New"} Employee
      </h2>
      {/* Gender */}
      <div className="flex flex-col">
        <label className="mb-1 text-[14px] font-medium">Gender*</label>
        <div className="flex gap-6 mt-2">
          <label className="flex items-center gap-2">
            <input
              className="w-6 h-6 accent-black cursor-pointer"
              type="radio"
              name="gender"
              value="Male"
              checked={employees?.gender === "Male"}
              onChange={handleChangeEmployee}
              required
            />
            Male
          </label>
          <label className="flex items-center gap-2">
            <input
              className="w-6 h-6 accent-black cursor-pointer"
              type="radio"
              name="gender"
              value="Female"
              checked={employees?.gender === "Female"}
              onChange={handleChangeEmployee}
            />
            Female
          </label>
        </div>
      </div>
      {/* First Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">First Name*</label>
          <input
            type="text"
            name="first_name"
            value={employees?.first_name ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            required
            placeholder="example: Smit"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Last Name*</label>
          <input
            type="text"
            name="last_name"
            value={employees?.last_name ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            required
            placeholder="example: Jonh"
          />
        </div>
        {/* Telephone */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Employee ID*</label>
          <input
            type="text"
            name="emp_id"
            value={employees?.emp_id ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            placeholder="example: EMP-001"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {/* Role */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Role*</label>
          <input
            type="text"
            name="roles"
            value={employees?.roles ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            required
            placeholder="example: Teacher"
          />
        </div>
        {/* Salary */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Salary*</label>
          <input
            type="text"
            name="salary"
            value={employees?.salary ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            placeholder="example: $3xx"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Experience*</label>
          <input
            type="text"
            name="experience"
            value={employees?.experience ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            placeholder="example: 10"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Email */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Email*</label>
          <input
            type="email"
            name="email"
            value={employees?.email ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            required
            placeholder="example: jonhsmit001@gmail.com"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Password*</label>
          <input
            type="password"
            name="password"
            value={employees?.password ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            required
            placeholder="example: Your***Passd"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="mb-1 text-[14px] font-medium">Telephone*</label>
          <input
            type="text"
            name="telephone"
            value={employees?.telephone ?? ""}
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0"
            placeholder="example: 013-000-000"
          />
        </div>
      </div>
      {/* Hire date*/}
      <div className="flex flex-col relative">
        <label className="mb-1 text-[14px] font-medium">Hire Date*</label>
        <input
          onClick={() => ref_Hire_Data.current?.showPicker?.()}
          onMouseEnter={(e) => e.target.focus()}
          ref={ref_Hire_Data}
          type="date"
          name="hire_date"
          value={employees?.hire_date ?? ""}
          onChange={handleChangeEmployee}
          className="custom-class border px-3 py-1.5 outline-0 cursor-pointer appearance-none"
        />
        <i
          className="fa-solid fa-calendar-days text-xl text-black absolute top-[50%] right-3 cursor-pointer"
          onClick={() => ref_Hire_Data.current?.showPicker?.()}
        ></i>
      </div>
      {/* Profile Picture */}
      {profile ? (
        <div>
          <h2 className="mb-1 text-[14px] font-medium">Profile Picture*</h2>
          <img
            src={`http://localhost:3000/uploads/${employees?.profile}`}
            alt="Profile employee"
            className="w-36 h-36 border mb-4"
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <label className="mb-1 text-[14px] font-medium">
            Profile Picture*
          </label>
          <input
            type="file"
            name="profile"
            accept="image/*"
            onChange={handleChangeEmployee}
            className="border px-3 py-1.5 outline-0 cursor-pointer"
          />
          {employees?.profile && (
            <img
              src={
                employees.profile instanceof File
                  ? URL.createObjectURL(employees.profile)
                  : `/uploads/${employees.profile.replace(/^\d+-/, "")}`
              }
              alt="preview"
              className="mt-2 w-32 h-32 object-cover rounded border"
              onLoad={(e) => {
                if (employees.profile instanceof File) {
                  URL.revokeObjectURL(e.target.src);
                }
              }}
            />
          )}
        </div>
      )}

      {/* DOB */}
      <div className="flex flex-col relative">
        <label className="mb-1 text-[14px] font-medium">Date of Birth*</label>
        <input
          onClick={() => refData.current?.showPicker?.()}
          onMouseEnter={(e) => e.target.focus()}
          ref={refData}
          type="date"
          name="dob"
          value={employees?.dob ?? ""}
          onChange={handleChangeEmployee}
          className="custom-class border px-3 py-1.5 outline-0 cursor-pointer appearance-none"
        />
        <i
          className="fa-solid fa-calendar-days text-xl text-black absolute top-[40%] right-3 cursor-pointer"
          onClick={() => refData.current?.showPicker?.()}
        ></i>
        <p className="text-xs text-green-600">
          Add your birthday to unlock additional offering/reward! 07/12/2001
        </p>
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label className="mb-1 text-[14px] font-medium">Address*</label>
        <input
          type="text"
          name="address"
          value={employees?.address ?? ""}
          onChange={handleChangeEmployee}
          className="border px-3 py-1.5 outline-0"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="mb-1 text-[14px] font-medium">Status*</label>
        <select
          name="status"
          value={employees?.status ?? ""}
          onChange={handleChangeEmployee}
          className="border px-3 py-1.5 outline-0 cursor-pointer"
        >
          <option value="Single">Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 text-[14px] font-medium">Description</label>
        <textarea
          name="description"
          value={employees?.description ?? ""}
          onChange={handleChangeEmployee}
          className="border px-3 py-1.5 outline-0"
          rows={3}
        />
      </div>

      {update ? (
        <div className="bg-blue-500 py-1.5 hover:bg-blue-600">
          {loadingEmployee ? (
            <div className="flex justify-center items-end gap-2">
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
            </div>
          ) : (
            <h2
              className="w-full text-center cursor-pointer  text-white "
              onClick={() => {
                handleCrateEmployee();
                setProfile(false);
              }}
            >
              Submit
            </h2>
          )}
        </div>
      ) : (
        <div className="bg-blue-500 py-1.5 hover:bg-blue-600">
          {loadingEmployee ? (
            <div className="flex justify-center items-end gap-2">
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
              <div className="w-1.5 h-2 bg-white rounded-xl loader "></div>
            </div>
          ) : (
            <h2
              className="w-full text-center cursor-pointer text-white "
              onClick={(e) => {
                handleUpdateEmployee(employees?.id);
                setProfile(false);
              }}
            >
              Update
            </h2>
          )}
        </div>
      )}
    </form>
  );
}

export default FormEmployee;
