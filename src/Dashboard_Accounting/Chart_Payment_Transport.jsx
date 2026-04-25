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
import { ArrowUp, ArrowDown } from "lucide-react";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";

function Chart_Payment_Transport() {
  const {
    chartTotalMonthlyYearly,
    lastMonthTotalAmount_transport_fee,
    thisMonthTotalAmount_transport_fee,
    percentAmountRegister_transport_fee,
  } = useDataContext();
  const getColor = () => {
    if (percentAmountRegister_transport_fee < 0) return "text-red-600";
    if (percentAmountRegister_transport_fee === 0) return "text-gray-500";
    return "text-green-600";
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  const transportRefs = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (transportRefs.current[0] = el)}
      style={{ transitionDelay: "0.3s" }}
      className="bg-white p-6 rounded-2xl bg-white shadow-[0_4px_10px_rgba(59,130,246,0.2)] mt-2 "
    >
      <h2 className="text-gray-700 text-2xl font-medium text-center">
        Transport Amount
      </h2>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[17px] font-semibold">Income This Year</h2>
          <p className="text-[14px] text-gray-600">
            This Month: {formatCurrency(thisMonthTotalAmount_transport_fee)}
          </p>
          <p className="text-[14px] text-gray-400">
            Last Month: {formatCurrency(lastMonthTotalAmount_transport_fee)}
          </p>
        </div>

        {/* 🔥 Percentage Display */}
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${getColor()}`}
        >
          {percentAmountRegister_transport_fee < 0 && <ArrowDown size={16} />}
          {percentAmountRegister_transport_fee > 0 && <ArrowUp size={16} />}
          {percentAmountRegister_transport_fee > 0 ? "+" : ""}
          {percentAmountRegister_transport_fee.toFixed(2)}%
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250} className="">
        <AreaChart data={chartTotalMonthlyYearly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(value) =>
              `$${value >= 1000 ? value / 1000 + "K" : value}`
            }
          />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Area
            type="monotone"
            dataKey="TotalAmountTransport_fee"
            stroke="#22C55E"
            fill="#22C55E"
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart_Payment_Transport;
