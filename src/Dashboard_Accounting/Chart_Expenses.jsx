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

function Chart_Expenses() {
  const {
    chartTotalMonthlyYearly,
    lastMonthExpesesAmount,
    thisMonthExpensesAmount,
    percentExpensesAmount,
  } = useDataContext();
  // 🎯 Color Logic
  const getColor = () => {
    if (percentExpensesAmount < 0) return "text-red-600";
    if (percentExpensesAmount === 0) return "text-gray-500";
    return "text-green-600";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const expenseRefs = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (expenseRefs.current[0] = el)}
      style={{ transitionDelay: "0.2s" }}
      className="bg-white p-6 rounded-2xl bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] mt-2"
    >
      <h2 className="text-gray-700 text-2xl font-medium text-center">
        Expenses Amount
      </h2>
      {/* 🔥 Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[17px] font-semibold">Expenses This Year</h2>
          <p className="text-[14px] text-gray-600">
            This Month: {formatCurrency(thisMonthExpensesAmount)}
          </p>
          <p className="text-[13px] text-gray-500">
            Last Month: {formatCurrency(lastMonthExpesesAmount)}
          </p>
        </div>

        {/* 🔥 Percentage Display */}
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${getColor()}`}
        >
          {percentExpensesAmount < 0 && <ArrowDown size={16} />}
          {percentExpensesAmount > 0 && <ArrowUp size={16} />}
          {percentExpensesAmount > 0 ? "+" : ""}
          {percentExpensesAmount.toFixed(2)}%
        </div>
      </div>

      {/* 📊 Chart Section */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={chartTotalMonthlyYearly || []}>
          <defs>
            {/* Income Gradient */}
            <linearGradient id="incomeColorRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
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
            dataKey="Amount_Expenses"
            stroke="#EF4444"
            fill="url(#incomeColorRed)"
            strokeWidth={2}
            dot={{ r: 2 }}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart_Expenses;
