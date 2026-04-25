import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
function Student_Charts() {
  const { chartData } = useDataContext();
  const studentRefs = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (studentRefs.current[0] = el)}
      style={{ transitionDelay: "0.2s" }}
      className="bg-white rounded-xl p-5 shadow-[0_4px_10px_rgba(75,85,99,.2)]"
    >
      <h3 className="font-medium text-xl text-gray-700 mb-4">
        Analaysis Students
      </h3>

      <ResponsiveContainer width="100%" height={250} className="">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          {/*domain={[1, "dataMax"]}*/}
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="Inactive"
            stroke="#EF4444"
            fill="#EF4444"
            strokeWidth={2}
            dot={{ r: 2 }}
            fillOpacity={0.25}
          />
          <Area
            type="monotone"
            dataKey="Active"
            stroke="#22C55E"
            fill="#22C55E"
            strokeWidth={2}
            dot={{ r: 2 }}
            fillOpacity={0.25}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Student_Charts;
