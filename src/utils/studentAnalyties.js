import { useDataContext } from "../Context";

// src/utils/studentAnalytics.js
export function calculateStudentTrend() {
  const { listStudent } = useDataContext();
  const months = Array(12).fill(0);

  listStudent?.forEach((s) => {
    const month = new Date(s.createdAt).getMonth();

    if (s.status === 1) months[month] += 1;
    if (s.status === 0) months[month] -= 1;
  });

  for (let i = 1; i < months.length; i++) {
    months[i] += months[i - 1];
  }

  return months;
}
