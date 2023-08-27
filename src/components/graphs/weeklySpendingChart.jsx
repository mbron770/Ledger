import { BarChart, LabelList, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

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

export const WeeklySpendingChart = ({ transactions }) => {
  const chartData = transactions ? weeklySpending(transactions) : [];

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
    <div className="bg-gray-50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="text-gray-600"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="gray-200" />
          <XAxis dataKey="name" tick={{ fill: 'gray-500' }} stroke="gray-300" />
          <YAxis tick={{ fill: 'gray-500' }} stroke="gray-300" />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
            contentStyle={{ background: 'white', border: 'none', borderRadius: '0.5rem' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            itemStyle={{ color: 'gray-600' }}
          />
          <Bar dataKey="amount" fill="#2563EB">
            <LabelList dataKey="amount" content={renderCustomizedLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


