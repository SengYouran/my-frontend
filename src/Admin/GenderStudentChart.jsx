import React, { useMemo, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";

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

function GenderStudentChart() {
  const { listStudent } = useDataContext();

  const chartData = useMemo(() => {
    const male = Array(12).fill(0);
    const female = Array(12).fill(0);

    listStudent?.forEach((s) => {
      if (!s.createdAt) return;
      const m = new Date(s.createdAt).getMonth();

      if (s.gender === "Male") male[m]++;
      if (s.gender === "Female") female[m]++;
    });

    return months.map((month, i) => ({
      month,
      Male: male[i],
      Female: female[i],
    }));
  }, [listStudent]);

  const genderRef = useInViewAnime("active", 50);

  return (
    <div
      className="bg-white rounded-xl p-5 shadow fade-in"
      ref={(el) => (genderRef.current[0] = el)}
    >
      <h3 className="font-semibold mb-4">Students by Gender</h3>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Area
            type="monotone"
            dataKey="Male"
            stroke="#1E40AF"
            fill="#1E40AF"
            fillOpacity={0.25}
          />

          <Area
            type="monotone"
            dataKey="Female"
            stroke="#DB2777"
            fill="#DB2777"
            fillOpacity={0.25}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenderStudentChart;
