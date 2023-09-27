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
  "#F56565", // red-500
  "#ED8936", // orange-500
  "#ECC94B", // yellow-500
  "#4299E1", // blue-500
  "#ED64A6", // pink-500
  "#38B2AC", // teal-500
  "#667EEA", // indigo-500
  "#9F7AEA", // purple-500
  "#4A5568", // gray-600
];

const getMerchantTotals = (transactions) => {
  const totalsByMerchant = {};

  transactions?.forEach((transaction) => {
    if (!totalsByMerchant[transaction?.name]) {
      totalsByMerchant[transaction?.name] = 0;
    }
    totalsByMerchant[transaction?.name] += transaction?.amount;
  });

  const sortedMerchants = Object.keys(totalsByMerchant)
    .map((merchant) => ({ name: merchant, amount: totalsByMerchant[merchant] }))
    .sort((a, b) => b?.amount - a?.amount);

 

  return sortedMerchants;
};

const incomeDistribution = (totalIncomes) => {
  return [
    { name: '50% of Income on Necessities', amount: totalIncomes * 0.5 },
    { name: '30% of Income on Wants', amount: totalIncomes * 0.3 },
    { name: '20% of Income on Savings/Investments and Debt Repayment', amount: totalIncomes * 0.2 },
  ];
};





export const MerchantsHorizontalGraph = ({ transactions, investmentTransactions, totalIncomes }) => {
  
  let chartData

  if(transactions && transactions?.length > 0){
    chartData = getMerchantTotals(transactions)

  } else if(investmentTransactions && investmentTransactions?.length > 0){
    chartData = getMerchantTotals(investmentTransactions)
  } 
  else if(totalIncomes ){
    chartData = incomeDistribution(totalIncomes)
  }

  return (
    <div className="bg-custom-blue p-4">
    <ResponsiveContainer width="100%" height={300}> 
    <BarChart
  layout="vertical"
  width={500}
  data={chartData}
  margin={{ top: 5, right: 25, left: 25, bottom: 5 }}
  className="text-md font-thin font-goldman text-custom-purple"
>
      <XAxis type="number" tick={{ fill: '#21253e' }} stroke="#21253e" />
      <YAxis dataKey="name" type="category" width={0} tick={{ fill: '#21253e' }} stroke="#21253e" />
      <Tooltip 
    formatter={(value) => [`$${value}`, 'Amount']}
    contentStyle={{ 
        background: '#21253e', 
        border: 'none', 
        borderRadius: '0.5rem', 
        color: '#e9eff5'  
    }}
    cursor={{ fill: '#21253e', background: '#e9eff5' }}
    itemStyle={{ color: '#e9eff5', background: '#21253e' }}
/>
      <Bar dataKey="amount" barSize={30}>
        {chartData?.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={predefinedColors[index % predefinedColors.length]}
          />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
  </div>
  );
};
