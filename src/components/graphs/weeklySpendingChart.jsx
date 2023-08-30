import { BarChart, LabelList, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function weeklySpending(transactions) {
  const weeklyTotals = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);  

    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    const month = startOfWeek.toLocaleDateString("en-US", { month: "short" });
    
    const weekRange = `${month} ${startDay} - ${endDay}`;

    if (!weeklyTotals[weekRange]) {
      weeklyTotals[weekRange] = 0;
    }

    weeklyTotals[weekRange] += transaction.amount;
  });

  return Object.entries(weeklyTotals).map(([weekRange, amount]) => {
    return { name: weekRange, amount };
  });
}

export const WeeklySpendingChart = ({ transactions, investmentTransactions }) => {
  let chartData
  if (transactions && transactions?.length > 0){
    chartData = weeklySpending(transactions)
  }else if(investmentTransactions && investmentTransactions?.length > 0){
    chartData = weeklySpending(investmentTransactions)
  }else{
    chartData = []
  }
 
  

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
  ];

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    const radius = 10;

    return (
      <text x={x + width / 2} y={y - radius} fill="white" textAnchor="middle" dominantBaseline="middle">
        {value}
      </text>
    );
  };

  return (
    <div className="bg-custom-blue p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="text-md font-thin font-goldman text-custom-purple"
        >
          <XAxis dataKey="name" tick={{ fill: '#21253e' }} stroke="#21253e" />
          <YAxis tick={{ fill: '#21253e' }} stroke="#21253e" />
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


        <Bar dataKey="amount" fill="#21253e">
    <LabelList dataKey="amount" fill="#21253e" position="top" />
    {chartData?.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={predefinedColors[index % predefinedColors.length]} />
    ))}
</Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


