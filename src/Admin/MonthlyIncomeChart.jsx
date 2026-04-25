import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";

function MonthlyIncomeChart() {
  const {
    lastMonthTotalAmount_register_transport_fee,
    thisMonthTotalAmount_register_transport_fee,
    percentAmountRegister_register_transport_fee,
    chartTotalMonthlyYearly,
  } = useDataContext();

  // 🎯 Color Logic
  const getColor = () => {
    if (percentAmountRegister_register_transport_fee < 0) return "text-red-600";
    if (percentAmountRegister_register_transport_fee === 0)
      return "text-gray-500";
    return "text-green-600";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const chartRef = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (chartRef.current[0] = el)}
      style={{ transitionDelay: `${1.5 * 0.25}s` }}
      className="bg-white rounded-xl p-5 shadow-[0_4px_10px_rgba(75,85,99,.2)]"
    >
      <h2 className="text-xl font-medium text-gray-700 text-center">
        Register and Transport
      </h2>
      {/* 🔥 Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">Income This Year</h2>
          <p className="text-sm text-gray-500">
            This Month:{" "}
            {formatCurrency(thisMonthTotalAmount_register_transport_fee)}
          </p>
          <p className="text-xs text-gray-400">
            Last Month:{" "}
            {formatCurrency(lastMonthTotalAmount_register_transport_fee)}
          </p>
        </div>

        {/* 🔥 Percentage Display */}
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${getColor()}`}
        >
          {percentAmountRegister_register_transport_fee < 0 && (
            <ArrowDown size={16} />
          )}
          {percentAmountRegister_register_transport_fee > 0 && (
            <ArrowUp size={16} />
          )}
          {percentAmountRegister_register_transport_fee > 0 ? "+" : ""}
          {percentAmountRegister_register_transport_fee.toFixed(2)}%
        </div>
      </div>

      {/* 📊 Chart Section */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartTotalMonthlyYearly}>
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
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

          <Area
            type="monotone"
            dataKey="TotalAmount_Register_Transport_Fee"
            stroke="#3b82f6"
            fill="url(#incomeGradient)"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyIncomeChart;
