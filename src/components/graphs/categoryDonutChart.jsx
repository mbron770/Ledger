import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const predefinedColors = [
    "#F56565", // red-500
    "#ED8936", // orange-500
    "#ECC94B", // yellow-500
    "#48BB78", // green-500
    "#38B2AC", // teal-500
    "#4299E1", // blue-500
    "#667EEA", // indigo-500
    "#9F7AEA", // purple-500
    "#ED64A6", // pink-500
    "#4A5568"  // gray-600
];

const getCategoryTotals = (transactions) => {
    const categoryTotals = {}
    // console.log('checking', transactions)

    transactions?.forEach(transaction => {
        const categoryValue = Math.abs(transaction?.amount)
        if(!categoryTotals[transaction?.category]){
            categoryTotals[transaction?.category] = 0
        }
        categoryTotals[transaction?.category] += categoryValue
    });
    console.log('checking', categoryTotals)

    return categoryTotals;
}

export const CategoryDonutChart = ({ transactions }) => {
    if (!Array.isArray(transactions)) {
        return <div className="text-center text-gray-500 my-5">No data available</div>;
    }

    const categoryTotals = getCategoryTotals(transactions);
    const categories = Object.keys(categoryTotals);

    const dynamicColors = {};
    categories.forEach((category, index) => {
        dynamicColors[category] = predefinedColors[index % predefinedColors.length];
    });

    const chartData = categories?.map(category => ({
        name: category,
        value: categoryTotals[category]
    }));
    console.log('actual', chartData)
    const chartData1 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        
      ];
      console.log('1', chartData1);
    

    return (
        
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={75} 
                        fill="#8884d8"
                    >
                        {
                            chartData?.map((entry, index) => (
                                <Cell key={index} fill={dynamicColors[entry?.name] || "#8884d8"} />
                            ))
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
       
    );
}
