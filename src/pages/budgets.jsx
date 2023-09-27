import NavBar from "../components/shared/topbarnav";
import AddIncomeForm from "../components/budgeting/forms/incomeForm"
import AddBillsForm from "../components/budgeting/forms/billsForm"
import {useUser} from "@clerk/nextjs";
import { useState, useEffect, useContext } from "react";
import { WeeklySpendingChart } from "../components/graphs/weeklySpendingChart";
import { CategoryDonutChart } from "../components/graphs/categoryDonutChart";
import { MerchantsHorizontalGraph } from "../components/graphs/merchantsHorizontalGraph";
import InfoContext from "../contexts/InfoContext";

export default function Budgets() {
    const [showDropdown, setShowDropdown] = useState([]);
    const {user} = useUser()
    const [allBills, setAllBills] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const {fetchedData, setFetchedData, allRecentTransactions, setAllRecentTransactions} = useContext(InfoContext);
    const [totalIncomes, setTotalIncomes] = useState(0)
    console.log(allRecentTransactions)

    async function getAllBills(){
        try{

            const response = await fetch("/api/bills/getBills", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify({userID: user?.id})

            })

            if (! response.ok) {
                throw new Error('failed to get bills from DB')
            }
            
             const fetchedBills = await response.json()
             setAllBills(fetchedBills)
             setFetchedData(false)
            



        }catch (error){
            console.error(error)
        }
    }


    async function getAllIncomes(){
        try{

            const response = await fetch("/api/income/getIncome", {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify({userID: user?.id})

            })

            if (! response.ok) {
                throw new Error('failed to get bills from DB')
            }
            
             const fetchedIncomes = await response.json()
             setAllIncomes(fetchedIncomes)
             setFetchedData(false)
        }catch (error){
            console.error(error)
        }
    }

    function getTotalIncome(){
        let [totalHourlyIncome, totalSalaryIncome, totalIncome]  = [0, 0, 0]

    for(let income of allIncomes){
        let hourlyRate = Number(income['hourlyRate'])
        let hoursPerWeek = Number(income['hoursPerWeek'])
        let yearlySalary = Number(income['yearlySalary'])

        if(!isNaN(hourlyRate) && !isNaN(hoursPerWeek)){
            totalHourlyIncome += hourlyRate * hoursPerWeek
        }

        if(!isNaN(yearlySalary)) totalSalaryIncome += yearlySalary


        
        
        
    }
    totalIncome = totalHourlyIncome + totalSalaryIncome
    return totalIncome

    }
    

    

    function getTotalBillsAmount(){
        let totalBillsAmount = 0

    for(let bill of allBills){
        let billTotal = Number(bill['billTotal'])
        if(!isNaN(billTotal)) totalBillsAmount += billTotal
        
    }
    return totalBillsAmount
    }


    function getMonthlySpendingTotal(){
        let totalSpent = 0
        if(allRecentTransactions){
            for(let transaction of allRecentTransactions){
                let transactionAmount = Number(transaction['amount'])
                if(!isNaN(transactionAmount)) totalSpent += transactionAmount
                
            }
        }else{
            totalSpent = 15033
        }
    
    return totalSpent
    }

    useEffect(() => {
        getAllBills()
        getAllIncomes()
    }, [user, fetchedData])

    useEffect(() => {
        getTotalIncome()
        getTotalBillsAmount()
        setTotalIncomes(getTotalIncome())
    }, [allBills, allIncomes])


    return(
        <>
         <NavBar />
            

            
            <section className="bg-custom-purple h-[18vh] mt-[15vh]">

            <div className="container mx-auto mr-10 px-10 flex flex-col md:items-center lg:flex-row lg:justify-start">
            <div className="hidden lg:block lg:w-12"></div> 
            <AddIncomeForm className="mb-4 md:mb-4 lg:mb-0 lg:mr-8"/>
            <div className="hidden lg:block lg:w-8"></div> 
        <AddBillsForm className="pl-4 mb-4 md:mb-4 lg:mb-0 lg:mr-4"/>
    </div>


    
</section>


<div className="absolute bg-custom-blue w-full h-[screen]">


<div className="relative lg:mb-[5vh] px-4 lg:px-[10vw] pt-[5vh] h-full flex flex-col items-center justify-center space-y-8 lg:space-y-6">

<div className="w-full duration-300 hover:scale-105 hover:shadow-xl p-4 bg-white shadow-2xl overflow-y-auto">
    <div className="flex flex-col">

        <h5 className="mb-8 font-thin text-2xl text-center font-goldman text-custom-purple">
           Make Sure Everything's In Check 
        </h5>



        <div className="mb-8 relative overflow-y-auto shadow-2xl">
        <table className="min-w-full text-sm text-left border-collapse font-thin font-goldman text-custom-purple">
        <thead className="text-xs uppercase ">
            <tr>
                            <th scope="col" className="px-10 py-2 font-medium font-goldman text-custom-purple text-lg">Total Income</th>
                            <th scope="col" className="px-10 py-2 font-medium font-goldman text-custom-purple text-lg">Total Bills</th>
                            <th scope="col" className="px-10 py-2 font-medium font-goldman text-custom-purple text-lg">Total Spending</th>
                            <th scope="col" className="px-10 py-2 font-medium font-goldman text-custom-purple text-lg">Budget Status</th>
                        </tr>
            </thead>
            <tbody> 
                    
                            <tr className=" py-2 hover:shadow-xl">
                                <th scope="row" className="px-10 py-3 font-thin font-goldman text-green-700 text-lg"> {` $${totalIncomes}`}</th>
                                <td className="px-10 py-3 font-thin font-goldman text-green-700 text-lg"> {`$${getTotalBillsAmount()}`}</td>
                                <td className="px-10 py-3 font-thin font-goldman text-green-700 text-lg"> {` $${getMonthlySpendingTotal()}`}</td>
                                {
  totalIncomes <= getTotalBillsAmount() + getMonthlySpendingTotal()
  ? <td className="px-10 py-3 font-thin font-goldman text-green-700 text-lg">Your Budget is Balanced!</td>
  : <td className="px-10 py-3 font-thin font-goldman text-red-500 text-lg">{`Deficit - $${totalIncomes - getTotalBillsAmount() + getMonthlySpendingTotal()}`}</td>
}
                                
                                
                            </tr>
                      
                    </tbody>
        </table>
              </div>


       

               
            

 
        </div>
    </div>
<div className="flex flex-col lg:flex-row w-full space-y-8 lg:space-y-0 lg:space-x-8">

<div className="duration-300 hover:scale-105 hover:shadow-xl w-full lg:w-[50vw] p-6 bg-white shadow-2xl overflow-y-auto">
            <div className="flex max-h-[100vh] flex-col">
            <h5 className="mb-2 font-thin text-2xl text-left font-goldman text-custom-purple">
                    My Total Income
                </h5>
                <h5 className="mb-2 font-thin text-xl text-left font-goldman text-custom-purple">
                    {`$${totalIncomes}`}
                </h5>
                <CategoryDonutChart allIncomes={allIncomes} />
                <AddIncomeForm className="mb-4 md:mb-4 lg:mb-0 lg:mr-8"/>
            </div>
        </div>

        <div className="duration-300 hover:scale-105 hover:shadow-xl w-full lg:w-[50vw] p-6 bg-white shadow-2xl overflow-y-auto">
            <div className="flex max-h-[100vh] flex-col">
                <h5 className="mb-2 font-thin text-2xl text-left font-goldman text-custom-purple">
                    My Total Bills
                </h5>
                <h5 className="mb-2 font-thin text-xl text-left font-goldman text-custom-purple">
                    {`$${getTotalBillsAmount()}`}
                </h5>
                
                <CategoryDonutChart allBills={allBills} />
                <AddBillsForm className="pl-4 mb-4 md:mb-4 lg:mb-0 lg:mr-4"/>
            </div>
        </div>

    </div>

    




    <div className="w-full duration-300 hover:scale-105 hover:shadow-xl p-4 bg-white shadow-2xl overflow-y-auto">
    <div className="flex flex-col">

        <h5 className="mb-2 font-thin text-2xl text-left font-goldman text-custom-purple">
           Balance the 50/30/20
        </h5>
        <h5 className="mb-2 font-thin text-l text-left font-goldman text-custom-purple">
             50% Necessities || 30% Wants || 20% Savings/Investments and Debt Repayment
                </h5>
            
                <MerchantsHorizontalGraph totalIncomes={totalIncomes} />

                
        </div>
    </div>



   







   
    <div className="w-full duration-300 hover:scale-105 hover:shadow-xl p-4 bg-white shadow-2xl overflow-y-auto">
    <div className="flex flex-col">
    
        <h5 className="mb-2 font-thin text-2xl text-left font-goldman text-custom-purple">
           My Income Sources
        </h5>
            <table className="min-w-full text-sm text-left border-collapse font-thin font-goldman text-custom-purple">
        <thead className="text-xs uppercase bg-custom-blue">
            <tr>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Job</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Income Type</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Pay Type</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Pay Amount</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Take Home</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Pay Schedule</th>
                            <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Date Added</th>

                        </tr>
            </thead>
            <tbody> 
                    {
                        (allIncomes?.length === 0) ? 
                        (
                            <tr className="bg-custom-blue py-2 hover:shadow-xl">
                            <td colSpan="6" className="text-center py-4">No transactions available.</td>
                        </tr>
                        ) : 
                        allIncomes?.map((income) => (
                            <tr key={income.dateAdded} className="bg-custom-blue py-2 hover:shadow-xl">
                                <th scope="row" className="px-3 py-3 font-thin font-goldman text-custom-purple ">{`${income.jobTitle} at ${income.company}`}</th>
                                <td className="px-3 py-3 font-thin font-goldman text-custom-purple ">{income.incomeType}</td>
                                <td className="px-3 py-3 font-thin font-goldman text-custom-purple ">{income.payType}</td>
                                <td className="px-3 py-3 font-thin font-goldman text-green-700 ">${income.yearlySalary ? income.yearlySalary : income.hourlyRate*income.hoursPerWeek}</td>
                                <td className="px-3 py-3 font-thin font-goldman text-green-700 ">${income.takeHomePay}</td>
                                <td className="px-3 py-3 font-thin font-goldman text-custom-purple ">{income.paySchedule}</td>
                                
                                <td className="px-3 py-3 font-thin font-goldman text-custom-purple ">{new Date(income.dateAdded).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric"
                                })}</td>
                            </tr>
                        ))
                    }
                    </tbody>
        </table>


                
        </div>
    </div>


     <div className="w-full duration-300 hover:scale-105 hover:shadow-xl p-4 bg-white shadow-2xl overflow-y-auto">
    <div className="flex flex-col">

        <h5 className="mb-2 font-thin text-2xl text-left font-goldman text-custom-purple">
           All My Bills
        </h5>
        
        <table className="min-w-full text-sm text-left border-collapse font-thin font-goldman text-custom-purple">
        <thead className="text-xs uppercase bg-custom-blue">
            <tr>

                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Bill Type</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">From</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Description</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Frequency</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Bill Total</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Date Added</th>
                    <th scope="col" className="px-3 py-3 font-medium font-goldman text-custom-purple">Date Due</th>

                        </tr>
            </thead>
           
                    <tbody>
                {
                    (allBills?.length === 0) ? 
                    (
                        <tr className="bg-custom-blue py-2 hover:shadow-xl">
                            <td colSpan="6" className="text-center py-4">No bills available.</td>
                        </tr>
                    ) : 
                    allBills?.map((bill) => (
                        <tr key={bill.dateAdded} className="bg-custom-blue py-2 hover:shadow-xl" >
                            <td className="px-3 py-3 font-thin font-goldman text-custom-purple">{bill.billType}</td>
                            <td className="px-3 py-3 font-thin font-goldman text-custom-purple">{bill.company}</td>
                            <td className="px-3 py-3 font-thin font-goldman text-custom-purple">{bill.description}</td>
                            <td className="px-3 py-3 font-thin font-goldman text-red-700">{bill.payFrequency}</td>
                            <td className="px-3 py-3 font-thin font-goldman text-green-700">{`$${bill.billTotal}`}</td>
                            <td className="ppx-3 py-3 font-thin font-goldman text-custom-purple">{new Date(bill.dateAdded).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</td>
                             <td className="ppx-3 py-3 font-thin font-goldman text-custom-purple">{new Date(bill.dateAdded).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>

    </div>
</div>







   

    



</div>





            
            </div>
        </>

    )
};
