import Report_Header from "../Reports/Report_Header";
import List_Report_Accounting from "../Reports/List_Report_Accounting";
import { useDataContext } from "../Context";
import List_Expenses_Report from "../Reports/List_Expenses_Report";
import Pagination from "../Pagination/Pagination";
import List_Attendance_student from "../Reports/List_Attendance_student";
import List_Ranks_student from "../Reports/List_Ranks_student";
import Skeleton_attendance_report from "../Reports/Skeleton_attendance_report";

function Reports() {
  const {
    typeNameReport,
    pages,
    paginateReport,
    storeReportData,
    loadingReport,
  } = useDataContext();
  const page = pages?.reporting?.page || storeReportData.length;
  const limit = paginateReport?.limit || storeReportData.length;
  const total = paginateReport?.totalItems || storeReportData.length;

  const start = storeReportData?.length === 0 ? 0 : (page - 1) * limit + 1;

  const end = Math.min(page * limit, total);

  // clean render logic
  function renderReport() {
    if (loadingReport) {
      return <Skeleton_attendance_report />;
    }

    if (typeNameReport === "Income" || typeNameReport === "Unpaid") {
      return <List_Report_Accounting />;
    }
    if (typeNameReport === "Expenses") {
      return <List_Expenses_Report />;
    }

    if (typeNameReport === "Attendance") {
      return <List_Attendance_student />;
    }

    if (typeNameReport === "Score") {
      return <List_Ranks_student />;
    }

    return null;
  }

  return (
    <div className="bg-white p-2 m-2 xl:mr-4 flex flex-col gap-4">
      <Report_Header />

      {renderReport()}

      <div className="flex justify-between items-center gap-4 mt-2">
        <p className="text-sm text-gray-600">
          Showing {start} - {end} of {total} {typeNameReport}
        </p>

        <div className="md:mr-4">
          <Pagination
            module="reporting"
            totalPages={paginateReport?.totalPages || 1}
          />
        </div>
      </div>
    </div>
  );
}

export default Reports;
