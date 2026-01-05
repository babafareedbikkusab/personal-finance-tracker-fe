import { PieChart, Pie, Tooltip, Cell } from "recharts";
import type { CategoryExpense } from "../../types/dashboard";


type Props = {
  data: CategoryExpense[];
};

export const CategoryExpenseChart: React.FC<Props> = ({ data }) => {
  const chartData: Array<Record<string, number | string>> =
    data.map((exp) => ({
      name: exp.category,
      value: exp.amount,
    }));

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
      >
        {chartData.map((_, index) => (
          <Cell key={index} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};
