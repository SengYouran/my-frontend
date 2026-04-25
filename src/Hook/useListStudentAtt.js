import { useMemo } from "react";

function useListStudentAttendance({ chart_attendance_student }) {
  const chartDataAtt = useMemo(() => {
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
      attendance_student: 0,
    }));

    chart_attendance_student?.forEach((att) => {
      const date = new Date(att.month + "-01");
      const month_index = date.getMonth();
      results[month_index].attendance_student += att?.total_Adsent_student;
    });

    return results;
  }, [chart_attendance_student]);
  return { chartDataAtt };
}
export { useListStudentAttendance };
