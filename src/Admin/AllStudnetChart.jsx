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

function AllStudentChart() {
  const { chartData } = useDataContext();

  const chartRef = useInViewAnime("active", 50);

  return (
    <div
      ref={(el) => (chartRef.current[0] = el)}
      style={{ transitionDelay: "0.2s" }}
      className="bg-white rounded-xl p-2 md:p-6 shadow-[0_4px_10px_rgba(75,85,99,.2)]"
    >
      <h3 className="font-medium text-xl text-gray-700 mb-4">
        Analysis Students
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData}>
          {/* Gradient colors */}
          <defs>
            <linearGradient id="activeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="inactiveColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* Axis */}
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} domain={[0, "dataMax"]} />

          {/* Tooltip */}
          <Tooltip />

          {/* Legend */}
          <Legend />

          {/* Inactive Students */}
          <Area
            type="monotone"
            dataKey="Inactive"
            stroke="#EF4444"
            fill="url(#inactiveColor)"
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 6 }}
            animationDuration={900}
          />

          {/* Active Students */}
          <Area
            type="monotone"
            dataKey="Active"
            stroke="#22C55E"
            fill="url(#activeColor)"
            strokeWidth={2}
            dot={{ r: 2}}
            activeDot={{ r: 6 }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AllStudentChart;
