import { useMemo } from "react";
import { useDataContext } from "../Context";

function Skeleton_attendance_report() {
  const { storeReportData, typeNameReport } = useDataContext();

  const indexArray = useMemo(() => {
    const columnMap = {
      Attendance: 5,
      Score: 7,
      Income: 10,
      Expenses: 5,
    };
    return columnMap[typeNameReport] || 10;
  }, [typeNameReport]);

  const rows = useMemo(() => storeReportData || [], [storeReportData]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <table className="min-w-full">
        <thead className="bg-gray-200">
          <tr>
            {Array.from({ length: indexArray }).map((_, idx) => (
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
              className={
                idx % 2 === 0
                  ? "bg-white"
                  : "bg-gradient-to-r from-blue-50 via-blue-100 to-blue-100"
              }
            >
              {Array.from({ length: indexArray }).map((__, colIdx) => (
                <td key={colIdx} className="p-4">
                  <div className="h-6 w-full rounded bg-gray-300 animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Skeleton_attendance_report;