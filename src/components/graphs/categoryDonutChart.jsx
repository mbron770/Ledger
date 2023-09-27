import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const predefinedColors = [
    "#F56565", // red-500
    "#4299E1", // blue-500
    "#48BB78", // green-700
    "#ED8936", // orange-500
    "#ECC94B", // yellow-500
    "#38B2AC", // teal-500
    "#667EEA", // indigo-500
    "#9F7AEA", // purple-500
    "#ED64A6", // pink-500
];

const getCategoryTotals = (transactions) => {
    const categoryTotals = {}


    transactions ?. forEach(transaction => {
        const categoryValue = Math.abs(transaction ?. amount)
        if (! categoryTotals[transaction ?. category]) {
            categoryTotals[transaction ?. category] = 0
        }
        categoryTotals[transaction ?. category] += categoryValue
    });

    return categoryTotals;
}

const getTypeTotals = (investmentTransactions) => {
    const typeTotals = {}

    investmentTransactions ?. forEach(investmentTransaction => {
        const typeValue = Math.abs(investmentTransaction ?. amount)
        if (! typeTotals[investmentTransaction ?. type]) {
            typeTotals[investmentTransaction ?. type] = 0
        }
        typeTotals[investmentTransaction ?. type] += typeValue
    });

    return typeTotals;
}

const getSecuritiesTypeTotals = (securities) => {
    const typeTotals = {}

    securities ?. forEach(security => {
        const typeKey = security ?. type
        if (! typeTotals[typeKey]) {
            typeTotals[typeKey] = 0
        }
        typeTotals[typeKey] += 1
    });

    return typeTotals;
}

const getAllIncomes = (allIncomes) => {
    const incomeTotals = {}

    allIncomes ?.forEach(income => {
        const typeValue  = Math.abs(income?.takeHomePay)
        if(!incomeTotals[income?.incomeType]){
            incomeTotals[income?.incomeType] = 0
        }
        incomeTotals[income?.incomeType] += typeValue
    }) 
    return incomeTotals
}


const getAllBills = (allBills) => {
    const billTotals = {}

    allBills ?.forEach(bill => {
        const typeValue  = Math.abs(bill?.billTotal)
        if(!billTotals[bill?.billType]){
            billTotals[bill?.billType] = 0
        }
        billTotals[bill?.billType] += typeValue
    }) 
    return billTotals
}

export const CategoryDonutChart = ({transactions, investmentTransactions, securities, allIncomes, allBills}) => {
    let categoryTotals
    let categories

    if (transactions) {
        categoryTotals = getCategoryTotals(transactions);
        categories = Object.keys(categoryTotals)
    } else if (investmentTransactions) {
        categoryTotals = getTypeTotals(investmentTransactions);
        categories = Object.keys(categoryTotals)

    } else if (securities) {
        categoryTotals = getSecuritiesTypeTotals(securities);
        categories = Object.keys(categoryTotals)
    } else if (allIncomes){
        categoryTotals = getAllIncomes(allIncomes)
        categories = Object.keys(categoryTotals)
    } else if (allBills){
        categoryTotals = getAllBills(allBills)
        categories = Object.keys(categoryTotals)
    }

    const dynamicColors = {};
    categories?.forEach((category, index) => {
        dynamicColors[category] = predefinedColors[index % predefinedColors.length];
    });

    const chartData = categories ?. map(category => ({name: category, value: categoryTotals[category]}));


    return (
        <div className="bg-custom-blue p-4">
            <ResponsiveContainer width="100%"
                height={250}>
                <PieChart>
                    <Pie data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={75}
                        fill="#8884d8"
                        className="text-md font-thin font-goldman text-custom-purple">
                        {
                        chartData ?. map((entry, index) => (
                            <Cell key={index}
                                fill={
                                    dynamicColors[entry ?. name] || "#8884d8"
                                }/>
                        ))
                    } </Pie>
                    <Tooltip formatter={
                            (value, name) => [`${name} - $${value}`]
                        }
                        contentStyle={
                            {
                                background: '#21253e',
                                border: 'none',
                                borderRadius: '0.5rem',
                                color: '#e9eff5'
                            }
                        }
                        cursor={
                            {
                                fill: '#21253e',
                                background: '#e9eff5'
                            }
                        }
                        itemStyle={
                            {
                                color: '#e9eff5',
                                background: '#21253e'
                            }
                        }/>
                </PieChart>
            </ResponsiveContainer>
        </div>

    );
}
