import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const predefinedColors = [
  "#48BB78", // green-500
  "#38B2AC", // teal-500
  "#4299E1", // blue-500
  "#667EEA", // indigo-500
  "#F56565", // red-500
  "#ED8936", // orange-500
  "#ECC94B", // yellow-500
  "#9F7AEA", // purple-500
  "#ED64A6", // pink-500
  "#4A5568", // gray-600
];

const getMerchantTotals = (transactions) => {
  const totalsByMerchant = {};

  transactions.forEach((transaction) => {
    if (!totalsByMerchant[transaction.name]) {
      totalsByMerchant[transaction.name] = 0;
    }
    totalsByMerchant[transaction.name] += transaction.amount;
  });

  const sortedMerchants = Object.keys(totalsByMerchant)
    .map((merchant) => ({ name: merchant, amount: totalsByMerchant[merchant] }))
    .sort((a, b) => b.amount - a.amount);

  return sortedMerchants;
};

export const MerchantsHorizontalGraph = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <div>No data available</div>;
  }
  const chartData = getMerchantTotals(transactions);



 

  return (
    <ResponsiveContainer width="100%" height={300}> 
    <BarChart
  layout="vertical"
  width={500}
  data={chartData}
  margin={{ top: 5, right: 25, left: 25, bottom: 5 }}
>
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" width={0} />
      <Tooltip
        formatter={(value) => [`$${value.toFixed(2)}`, "Amount"]}
        contentStyle={{
          background: "white",
          border: "none",
          borderRadius: "0.5rem",
        }}
        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        itemStyle={{ color: "gray-600" }}
      />
      <Bar dataKey="amount" barSize={30}>
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={predefinedColors[index % predefinedColors.length]}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
  );
};
