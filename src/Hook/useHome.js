import { useEffect, useMemo } from "react";

function useHome({  dataStudentActiveDeactive, dataBook }) {
  
  const chartData = useMemo(() => {
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

    // init 12 months with 0
    const result = months.map((m) => ({
      month: m,
      Active: 0,
      Inactive: 0,
    }));
    dataStudentActiveDeactive?.forEach((row) => {
      if (!row.month) return; // month = "2026-01"

      const monthIndex = parseInt(row.month.split("-")[1], 10) - 1;
      if (monthIndex < 0 || monthIndex > 11) return;

      result[monthIndex].Active = row.total_active;
      result[monthIndex].Inactive = row.total_deactive;
    });

    return result;
  }, [dataStudentActiveDeactive]);
  const chartsLevel = useMemo(() => {
    const BOOK_LIST = [
      "Book 1 (Starter)",
      "Book 2 (Beginner)",
      "Book 3 (Elementary)",
      "Book 4 (Elementary)",
      "Book 5 (Pre-Intermediate)",
      "Book 6 (Pre-Intermediate)",
      "Book 7 (Intermediate)",
      "Book 8 (Intermediate)",
    ];

    // init array with 0
    const result = BOOK_LIST.map((b) => ({
      book: b,
      TotalBook: 0,
    }));
    // map dataBook to result
    dataBook?.forEach((b) => {
      if (!b.book_name) return;
      const idx = BOOK_LIST.indexOf(b.book_name);
      if (idx === -1) return; // book_name not in BOOK_LIST
      result[idx].TotalBook = b.total_students || 0;
    });

    return result;
  }, [dataBook]);

  return {
    
    chartData,
    chartsLevel,
  };
}
export { useHome };
