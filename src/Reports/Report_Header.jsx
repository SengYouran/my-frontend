import { useState, useEffect } from "react";
import Type_Report from "./Type_Report";
import { useDataContext } from "../Context";
import View_Download from "./View_Download";

const type_name = [
  { id: 1, Tname: "Income" },
  { id: 2, Tname: "Expenses" },
  { id: 3, Tname: "Unpaid" },
];

const type_teacher_report = [
  { id: 4, Tname: "Attendance" },
  { id: 5, Tname: "Score" },
];

function Report_Header() {
  const {
    typeNameReport,
    getReporting,
    startDateRP,
    setStartDateRP,
    endDateRP,
    setEndDateRP,
    auth,
  } = useDataContext();

  const [typeReport, setTypeReport] = useState(false);
  const [bgType, setBgType] = useState(1);
  const [show, setShow] = useState(false);

  // 🔹 Determine types based on role

  const admin_type = [...type_name, ...type_teacher_report];
  let type_dynamic = [];
  if (auth?.role === "Accounting") {
    type_dynamic = type_name;
  } else if (auth?.role === "Admin") {
    type_dynamic = admin_type;
  }else
  {
    type_dynamic = type_teacher_report;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Date Inputs */}
        <input
          type="date"
          value={startDateRP ?? ""}
          onChange={(e) => setStartDateRP(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDateRP ?? ""}
          onChange={(e) => setEndDateRP(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={getReporting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
        >
          Apply
        </button>

        {/* Dropdown */}
        <div
          className="relative w-40 cursor-pointer"
          onClick={() => {
            setTypeReport(!typeReport);
            setStartDateRP(null);
            setEndDateRP(null);
          }}
        >
          <div className="flex border border-purple-600 rounded-lg overflow-hidden shadow-sm">
            <h2 className="w-2/3 px-2 py-2 text-center">{typeNameReport}</h2>
            <div className="w-1/3 bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 flex justify-center items-center text-white hover:bg-yellow-700">
              <i
                className={`fa-solid fa-angle-down text-sm transition-all duration-500 transform ${
                  typeReport ? "rotate-180" : "rotate-0"
                }`}
              ></i>
            </div>
          </div>

          {/* Always mounted Type_Report for hook safety */}
          <Type_Report
            setTypeReport={setTypeReport}
            typeReport={typeReport}
            bgType={bgType}
            setBgType={setBgType}
            type_dynamic={type_dynamic}
          />
        </div>
      </div>

      <View_Download show={show} setShow={setShow} />
    </div>
  );
}

export default Report_Header;
