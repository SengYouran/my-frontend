import { useEffect, useMemo, useState } from "react";

function useDashboardAccounting({
  chartStudentPaymentAmount,
  storeChartExpenses,
}) {
  const {
    lastMonthTotalAmount,
    thisMonthTotalAmount,
    percentAmountRegister,
    lastMonthTotalAmount_transport_fee,
    thisMonthTotalAmount_transport_fee,
    percentAmountRegister_transport_fee,
    lastMonthTotalAmount_register_transport_fee,
    thisMonthTotalAmount_register_transport_fee,
    percentAmountRegister_register_transport_fee,

    lastMonthExpesesAmount,
    thisMonthExpensesAmount,
    percentExpensesAmount,
  } = useMemo(() => {
    let thisMonthAmount = 0;
    let lastMonthAmount = 0;
    let percentRegister = 0;
    let thisMonthAmountTransport_fee = 0;
    let lastMonthAmountTransport_fee = 0;
    let percentRegisterTransport_fee = 0;
    let thisMonthAmount_Register_Transport_fee = 0;
    let lastMonthAmount_Register_Transport_fee = 0;
    let percentRegister_Register_Transport_fee = 0;
    let lastMonth_Expenses = 0;
    let thisMonth_Expenses = 0;
    let percentExpense = 0;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const lastMonthDate = new Date(currentYear, currentMonth - 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();
    chartStudentPaymentAmount?.forEach((p) => {
      const date = new Date(p.month + "-01");
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const amount = parseFloat(p.total_amount || 0);
      const amount_transport_fee = parseFloat(p.total_transport_fee || 0);
      const amount_transport_fee_register = parseFloat(
        p?.total_register_transport_fee || 0,
      );
      if (year === currentYear && monthIndex === currentMonth) {
        thisMonthAmount += amount;
      }
      if (year === lastMonthYear && monthIndex === lastMonth) {
        lastMonthAmount += amount;
      }
      if (year === currentYear && monthIndex === currentMonth) {
        thisMonthAmountTransport_fee += amount_transport_fee;
      }
      if (year === lastMonthYear && monthIndex === lastMonth) {
        lastMonthAmountTransport_fee += amount_transport_fee;
      }
      if (year === currentYear && monthIndex === currentMonth) {
        thisMonthAmount_Register_Transport_fee += amount_transport_fee_register;
      }
      if (year === lastMonthYear && monthIndex === lastMonth) {
        lastMonthAmount_Register_Transport_fee += amount_transport_fee_register;
      }
    });
    storeChartExpenses?.forEach((ex) => {
      const date = new Date(ex.month + "-01");
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      const expense_amount = parseFloat(ex?.total_amount);
      if (year === currentYear && monthIndex === currentMonth) {
        thisMonth_Expenses += expense_amount;
      }
      if (year === lastMonthYear && monthIndex === lastMonth) {
        lastMonth_Expenses += expense_amount;
      }
    });
    if (lastMonthAmount > 0) {
      percentRegister =
        ((thisMonthAmount - lastMonthAmount) / lastMonthAmount) * 100;
    }
    if (lastMonthAmountTransport_fee > 0) {
      percentRegisterTransport_fee =
        ((thisMonthAmountTransport_fee - lastMonthAmountTransport_fee) /
          lastMonthAmountTransport_fee) *
        100;
    }
    if (lastMonthAmount_Register_Transport_fee > 0) {
      percentRegister_Register_Transport_fee =
        ((thisMonthAmount_Register_Transport_fee -
          lastMonthAmount_Register_Transport_fee) /
          lastMonthAmount_Register_Transport_fee) *
        100;
    }
    if (lastMonth_Expenses > 0) {
      percentExpense =
        ((thisMonth_Expenses - lastMonth_Expenses) / lastMonth_Expenses) * 100;
    }
    return {
      lastMonthTotalAmount: lastMonthAmount,
      thisMonthTotalAmount: thisMonthAmount,
      percentAmountRegister: percentRegister,
      lastMonthTotalAmount_transport_fee: lastMonthAmountTransport_fee,
      thisMonthTotalAmount_transport_fee: thisMonthAmountTransport_fee,
      percentAmountRegister_transport_fee: percentRegisterTransport_fee,
      thisMonthTotalAmount_register_transport_fee:
        thisMonthAmount_Register_Transport_fee,
      lastMonthTotalAmount_register_transport_fee:
        lastMonthAmount_Register_Transport_fee,
      percentAmountRegister_register_transport_fee:
        percentRegister_Register_Transport_fee,
      lastMonthExpesesAmount: lastMonth_Expenses,
      thisMonthExpensesAmount: thisMonth_Expenses,
      percentExpensesAmount: percentExpense,
    };
  }, [chartStudentPaymentAmount, storeChartExpenses]);
  const chartTotalMonthlyYearly = useMemo(() => {
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
    const results = months.map((m) => ({
      month: m,
      TotalAmount: 0,
      TotalAmountTransport_fee: 0,
      TotalAmount_Register_Transport_Fee: 0,
      Amount_Expenses: 0,
    }));
    chartStudentPaymentAmount?.forEach((p) => {
      if (!p.month) return;
      // Convert "2026-01" -> Date
      const date = new Date(p.month + "-01");
      const monthIndex = date.getMonth();
      results[monthIndex].TotalAmount += parseFloat(p?.total_amount || 0);
      results[monthIndex].TotalAmountTransport_fee += parseFloat(
        p?.total_transport_fee || 0,
      );
      results[monthIndex].TotalAmount_Register_Transport_Fee += parseFloat(
        p?.total_register_transport_fee || 0,
      );
    });
    storeChartExpenses?.forEach((ex) => {
      if (!ex.month) return;
      const date = new Date(ex.month + "-01");
      const monthIndex = date.getMonth();
      const expenses_amount = parseFloat(ex?.total_amount);
      results[monthIndex].Amount_Expenses += expenses_amount || 0;
    });
    return results;
  }, [chartStudentPaymentAmount]);
  return {
    chartTotalMonthlyYearly,
    lastMonthTotalAmount,
    thisMonthTotalAmount,
    percentAmountRegister,
    lastMonthTotalAmount_transport_fee,
    thisMonthTotalAmount_transport_fee,
    percentAmountRegister_transport_fee,
    lastMonthTotalAmount_register_transport_fee,
    thisMonthTotalAmount_register_transport_fee,
    percentAmountRegister_register_transport_fee,
    lastMonthExpesesAmount,
    thisMonthExpensesAmount,
    percentExpensesAmount,
  };
}
export { useDashboardAccounting };
