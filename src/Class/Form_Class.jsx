import { useDataContext } from "../Context";
const Start_time = [
  { label: "7:00 AM", value: "07:00:00" },
  { label: "9:00 AM", value: "09:00:00" },
  { label: "1:00 PM", value: "13:00:00" },
  { label: "3:00 PM", value: "15:00:00" },
  { label: "6:00 PM", value: "18:00:00" },
];

const End_time = [
  { label: "9:00 AM", value: "09:00:00" },
  { label: "11:00 AM", value: "11:00:00" },
  { label: "3:00 PM", value: "15:00:00" },
  { label: "5:00 PM", value: "17:00:00" },
  { label: "8:00 PM", value: "20:00:00" },
];

function Form_Class({ setFormClass }) {
  const { classs, handleChangeClass, teacher, handleInsertClass } =
    useDataContext();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form className="bg-white p-4 w-[30rem] h-full flex flex-col justify-center items-center gap-2">
        <div className="w-full">
          <h2 className="text-[14px] font-medium">Teacher ID*</h2>
          <select
            name="employee_id" // must match backend
            value={classs?.employee_id || ""}
            onChange={handleChangeClass}
            className="border px-3 w-full py-2 mb-2 outline-0 cursor-pointer"
          >
            <option value="">Select Teacher</option>
            {teacher?.map((t) => (
              <option key={t.employee_id} value={t.employee_id}>
                {t.employee_id} - {t.last_name} {t.first_name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <h2 className="text-[14px] font-medium">Class Name*</h2>
          <input
            type="text"
            name="class_name"
            value={classs?.class_name || ""}
            onChange={handleChangeClass}
            className="border px-3 py-2 w-full mb-2 outline-0 cursor-pointer"
            placeholder="Class name: A-100"
          />
        </div>
        <div className="w-full">
          <h2 className="text-[14px] font-medium">Book Name*</h2>
          <input
            type="text"
            name="books"
            value={classs?.books || ""}
            onChange={handleChangeClass}
            placeholder="Book name: Book 1"
            className="border px-3 py-2 w-full mb-2 outline-0 cursor-pointer"
          />
        </div>
        <div className="w-full">
          <h2 className="text-[14px] font-medium">Shift*</h2>
          <select
            name="shift"
            value={classs?.shift || ""}
            onChange={handleChangeClass}
            className="border px-3 py-2 w-full mb-2 outline-0 cursor-pointer"
          >
            <option value="">Select Shift</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>
        <div className="w-full">
          <h2 className="text-[14px] font-medium">Start Time*</h2>
          <select
            name="start_time"
            value={classs?.start_time || ""}
            onChange={handleChangeClass}
            className="border px-3 py-2 w-full mb-2 outline-0 cursor-pointer"
          >
            <option value="">Start Time</option>
            {Start_time?.map((st, idx) => (
              <option key={idx} value={st.value}>
                {st.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <h2 className="text-[14px] font-medium">End Time*</h2>
          <select
            name="end_time"
            value={classs?.end_time || ""}
            onChange={handleChangeClass}
            className="border px-3 py-2 w-full mb-2 outline-0 cursor-pointer"
          >
            <option value="">End Time</option>
            {End_time?.map((st, idx) => (
              <option key={idx} value={st?.value}>
                {st?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center gap-2 w-full">
          <h2
            onClick={() => {
              setFormClass(false);
            }}
            className="text-center font-medium border w-full py-2 bg-white hover:bg-gray-50 cursor-pointer"
          >
            Cencel
          </h2>
          <h2
            onClick={() => {
              handleInsertClass();
            }}
            className="text-center text-white font-medium border border-gray-500 w-full py-2 bg-green-500 hover:bg-green-600 cursor-pointer"
          >
            Save
          </h2>
        </div>
      </form>
    </div>
  );
}

export default Form_Class;
