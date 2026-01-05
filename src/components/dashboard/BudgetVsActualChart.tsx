import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { BudgetVsActual } from "../../types/dashboard";

const BudgetVsActualChart = ({ data }: { data: BudgetVsActual[] }) => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="category" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="budget" fill="#8884d8" />
    <Bar dataKey="actual" fill="#82ca9d" />
  </BarChart>
);

export default BudgetVsActualChart;
