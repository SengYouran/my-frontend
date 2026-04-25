import { useEffect, useState } from "react";

function useReport({ url, auth, pages, book_id }) {
  const [typeNameReport, setTypeNameReport] = useState(null);
  useEffect(() => {
    if (!auth) return;

    const defaultType = auth?.role === "Accounting" ? "Income" : "Attendance";

    // only set if empty or invalid
    if (!typeNameReport) {
      setTypeNameReport(defaultType);
    }
  }, [auth?.role]);
  const [loadingReport, setLoadingReport] = useState(true);
  const [storeReportData, setStoreReportData] = useState([]);
  const [paginateReport, setPaginateReport] = useState({});
  const [startDateRP, setStartDateRP] = useState(null);
  const [endDateRP, setEndDateRP] = useState(null);

  async function getReporting() {
    try {
      const { page, limit } = pages.reporting;
      setLoadingReport(true);

      // ✅ build query string
      let query = `${url}/reports?typeReport=${typeNameReport}&page=${page}&limit=${limit}&employee_id=${auth?.employee_id}&book_id=${book_id}`;

      if (startDateRP && endDateRP) {
        query += `&start=${startDateRP}&end=${endDateRP}`;
      }

      const res = await fetch(query);

      if (!res.ok) throw new Error("Fail to fetch reporting");

      const data = await res.json();
      setStoreReportData(data.results || data);
      setPaginateReport(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReport(false);
    }
  } //score check if type = score show class under header

  // ✅ download Excel
  const downloadExcel = () => {
    let link = `${url}/reports/excel?typeReport=${typeNameReport}&employee_id=${auth?.employee_id}&book_id=${book_id}`;
    if (startDateRP && endDateRP) {
      link += `&start=${startDateRP}&end=${endDateRP}`;
    }

    window.open(link, "_blank");
  };

  // ✅ download PDF
  const downloadPDF = () => {
    let link = `${url}/reports/pdf?typeReport=${typeNameReport}&employee_id=${auth?.employee_id}&book_id=${book_id}`;
    if (startDateRP && endDateRP) {
      link += `&start=${startDateRP}&end=${endDateRP}`;
    }

    window.open(link, "_blank");
  };

  useEffect(() => {
    if (!auth || (typeNameReport === "Teacher" && !book_id) || !typeNameReport)
      return;
    getReporting();
  }, [
    location.pathname,
    typeNameReport,
    pages.reporting.page,
    pages.reporting.limit,
    book_id,
  ]);

  return {
    typeNameReport,
    setTypeNameReport,
    storeReportData,
    loadingReport,
    downloadExcel,
    downloadPDF,
    paginateReport,
    startDateRP,
    setStartDateRP,
    endDateRP,
    setEndDateRP,
    getReporting,
  };
}

export { useReport };
