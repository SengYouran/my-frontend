import { useMemo } from "react";
import { useDataContext } from "../Context";

const SkeletonStudentTable = ({ active }) => {
  const { auth, listStudentPoint, dataStudent, listStudentAtt } =
    useDataContext();
  const arrayIndex = useMemo(() => {
    const column = {
      Students: 8,
      Ranks: 7,
      Attendances: 4,
    };
    return column[active] || 9;
  }, [active]);
  const rows = useMemo(() => {
    let row = [];
    if (active === "Students") {
      row = dataStudent;
    } else if (active === "Ranks") {
      row = listStudentPoint;
    } else row = listStudentAtt;
    return row;
  }, [dataStudent, listStudentPoint, listStudentAtt]);
  return (
    <div className="flex flex-col gap-4 mt-4">
      {auth?.role === "Admin" && active === "Students" && (
        <>
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className=" bg-gray-300 w-24 h-8 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className=" bg-gray-300 h-24 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        </>
      )}
      <table
        className={`min-w-full mt-2 ${active === "Attendances" && "mt-6"}`}
      >
        <thead className="bg-gray-200">
          <tr>
            {Array.from({ length: arrayIndex }).map((_, idx) => (
              <th
                key={idx}
                className="px-4 py-2 text-left border-l border-gray-500"
              >
                &nbsp;
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((_, idx) => (
            <tr
              key={idx}
              className={`${
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
              }`}
            >
              {/* Columns */}
              {Array.from({ length: arrayIndex }).map((__, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <div className="p-4 w-full rounded bg-gray-300 animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonStudentTable;
