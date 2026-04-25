import { useEffect, useState } from "react";

function useGrand_Total_Income({ chartStudentPaymentAmount }) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);

  const [thisMonthIncome, setThisMonthIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  // 🔥 Chart Data State
  const [monthlyChartData, setMonthlyChartData] = useState([]);

  useEffect(() => {
    if (!chartStudentPaymentAmount) return;

    let income = 0;
    let paid = 0;
    let unpaid = 0;
    let overdue = 0;

    let thisMonthTotal = 0;
    let lastMonthTotal = 0;

    const monthlyIncome = Array(12).fill(0);

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const lastMonthDate = new Date(currentYear, currentMonth - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    chartStudentPaymentAmount.forEach((item) => {
      const amount = parseFloat(item?.amount || 0);
      const transport_fee = parseFloat(item?.transport_fee || 0);
      const pay_status = item?.pay_status;
      const period_end = new Date(item?.period_end);
      const paymentDate = new Date(item?.period_start);

      const totalAmount = amount + transport_fee;

      if (pay_status === "Paid") {
        income += totalAmount;
        paid++;

        // 🔥 12 Month Chart
        if (paymentDate.getFullYear() === currentYear) {
          const monthIndex = paymentDate.getMonth();
          monthlyIncome[monthIndex] += totalAmount;
        }

        // 🔥 Monthly Compare
        if (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        ) {
          thisMonthTotal += totalAmount;
        }

        if (
          paymentDate.getMonth() === lastMonth &&
          paymentDate.getFullYear() === lastMonthYear
        ) {
          lastMonthTotal += totalAmount;
        }
      }

      if (pay_status === "Unpaid") {
        unpaid++;
        if (period_end < today) {
          overdue++;
        }
      }
    });

    // % Change
    let percent = 0;
    if (lastMonthTotal > 0) {
      percent = ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const chartData = months.map((month, index) => ({
      month,
      income: monthlyIncome[index],
    }));

    setTotalIncome(income);
    setTotalPaid(paid);
    setTotalUnpaid(unpaid);
    setTotalOverdue(overdue);

    setThisMonthIncome(thisMonthTotal);
    setLastMonthIncome(lastMonthTotal);
    setPercentageChange(percent);

    setMonthlyChartData(chartData);
  }, [chartStudentPaymentAmount]);

  return {
    totalIncome,
    totalPaid,
    totalUnpaid,
    totalOverdue,
    thisMonthIncome,
    lastMonthIncome,
    percentageChange,
    monthlyChartData, // 🔥 use this for chart
  };
}

export { useGrand_Total_Income };
