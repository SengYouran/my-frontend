import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";

function Attendance_Chart() {
  const { chartDataAtt } = useDataContext();
  const attendanceRefs = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (attendanceRefs.current[0] = el)}
      style={{ transitionDelay: "0.4s" }}
      className="bg-white p-5 rounded-xl shadow-[0_4px_10px_rgba(59,130,246,0.2)]"
    >
      <h3 className="text-xl text-gray-700 font-medium mb-4">
        Students Attendances
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartDataAtt}>
          {/* 👇 month */}
          <XAxis dataKey="month" />

          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />

          {/* 👇 បង្ហាញ 2 bars */}
          <Bar dataKey="attendance_student" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Attendance_Chart;
