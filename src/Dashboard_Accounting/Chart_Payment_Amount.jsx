import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
function Chart_Payment_Amount() {
  const {
    chartTotalMonthlyYearly,
    lastMonthTotalAmount,
    thisMonthTotalAmount,
    percentAmountRegister,
  } = useDataContext();
  // 🎯 Color Logic
  const getColor = () => {
    if (percentAmountRegister < 0) return "text-red-600";
    if (percentAmountRegister === 0) return "text-gray-500";
    return "text-green-600";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const amountRef = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (amountRef.current[0] = el)}
      style={{ transitionDelay: "0.2s" }}
      className="bg-white p-6 rounded-2xl bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] mt-2 "
    >
      <h2 className="text-gray-700 text-2xl font-medium text-center">
        Register Amount
      </h2>
      {/* 🔥 Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[17px] font-semibold">Income This Year</h2>
          <p className="text-[14px] text-gray-600">
            This Month: {formatCurrency(thisMonthTotalAmount)}
          </p>
          <p className="text-[13px] text-gray-500">
            Last Month: {formatCurrency(lastMonthTotalAmount)}
          </p>
        </div>

        {/* 🔥 Percentage Display */}
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${getColor()}`}
        >
          {percentAmountRegister < 0 && <ArrowDown size={16} />}
          {percentAmountRegister > 0 && <ArrowUp size={16} />}
          {percentAmountRegister > 0 ? "+" : ""}
          {percentAmountRegister.toFixed(2)}%
        </div>
      </div>

      {/* 📊 Chart Section */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartTotalMonthlyYearly || []}>
          <defs>
            {/* Income Gradient */}
            <linearGradient id="incomeColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) =>
              `$${value >= 1000 ? value / 1000 + "K" : value}`
            }
          />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />

          {/* Income */}
          <Area
            type="monotone"
            dataKey="TotalAmount"
            stroke="#3b82f6"
            fill="url(#incomeColor)"
            strokeWidth={2}
            dot={{ r: 2 }}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart_Payment_Amount;
