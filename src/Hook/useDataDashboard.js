import { useEffect, useState } from "react";


function useDataDashboard({ setTotalPaidUnpaid, url, auth }) {
  const [amount, setAmount] = useState(0);
  const [summaryTotal_active_student, setSummaryTotal_active_student] =
    useState({});
  const [chartStudentPaymentAmount, setchartStudentPaymentAmount] = useState(
    [],
  );

  const [dataStudentActiveDeactive, setDataStudentActiveDeactive] = useState(
    [],
  );
  const [dataBook, setDataBook] = useState([]);
  const [chart_attendance_student, setChart_attendance_student] = useState([]);
  const [storeChartExpenses, setStoreChartExpenses] = useState([]);
  const [total_expenses, set_total_expense] = useState({});
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  async function getDataDashboard() {
    try {
      setLoadingDashboard(true);
      const res = await fetch(`${url}/dashboard`, { credentials: "include" });
       if (!res.ok) {
        console.log("Dashboard fetch failed:", res.status);
        return;
      }
      const data = await res.json();
      setTotalPaidUnpaid(
        data.totalPaidUnpaid || data.total_paid_unpaid_student,
      );
      console.log(data.summary)
      setAmount(data.summary || data.total_month_year_register_transport);
      setchartStudentPaymentAmount(
        data.chartAmount || data.chart_total_student_amount,
      );
      setSummaryTotal_active_student(data.total_active_student);
      setDataStudentActiveDeactive(
        data.chart_Active_Deactive || data.summaryTotalActiveDeactive,
      );
      setDataBook(data.chart_level_book || []);
      setChart_attendance_student(data.summaryAtt_student);
      set_total_expense(data.total_expenses);
      setStoreChartExpenses(data.chart_total_expenses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDashboard(false);
    }
  }
  useEffect(() => {
    if (!location.pathname.startsWith("/dashboard")) return;
    getDataDashboard();
  }, [location.pathname]);
  return {
    amount,
    chartStudentPaymentAmount,
    setchartStudentPaymentAmount,
    summaryTotal_active_student,
    setDataStudentActiveDeactive,
    dataStudentActiveDeactive,
    dataBook,
    setDataBook,
    chart_attendance_student,
    total_expenses,
    storeChartExpenses,
    loadingDashboard,
  };
}
export { useDataDashboard };
