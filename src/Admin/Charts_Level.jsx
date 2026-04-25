import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useDataContext } from "../Context";
import useInViewAnime from "../Hook/useInViewAnime";
const COLORS = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F59E0B", // amber
  "#EC4899", // pink
  "#0EA5E9", // sky
  "#8B5CF6", // violet
  "#14B8A6", // teal
  "#EF4444", // red
];

function Charts_Level() {
  const { chartsLevel } = useDataContext();
  const levelRefs = useInViewAnime("active", 50);
  return (
    <div
      ref={(el) => (levelRefs.current[0] = el)}
      style={{ transitionDelay: "0.3s" }}
      className="bg-white rounded-xl p-2 md:p-7 shadow-[0_4px_10px_rgba(75,85,99,.2)] "
    >
      <h3 className="text-xl text-gray-700 font-medium mb-4">
        Analaysis Books
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartsLevel}>
          <XAxis
            dataKey="book"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Bar dataKey="TotalBook">
            {chartsLevel.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts_Level;
