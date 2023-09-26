import NavBar from "../components/shared/topbarnav";
import AddIncomeForm from "../components/budgeting/forms/incomeForm"
import AddBillsForm from "../components/budgeting/forms/billsForm"
import {useUser} from "@clerk/nextjs";
import { useState, useEffect, useContext } from "react";
import InfoContext from "../contexts/InfoContext";

export default function Budgets() {
    const [showDropdown, setShowDropdown] = useState([]);
    const {user} = useUser()
    const [allBills, setAllBills] = useState([])
    const [allIncomes, setAllIncomes] = useState([])
    const {fetchedData, setFetchedData} = useContext(InfoContext);

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
        let [totalHourlyIncome, totalSalaryIncome, totalIncomes]  = [0, 0, 0]

    for(let income of allIncomes){
        let hourlyRate = Number(income['hourlyRate'])
        let hoursPerWeek = Number(income['hoursPerWeek'])
        let yearlySalary = Number(income['yearlySalary'])

        if(!isNaN(hourlyRate) && !isNaN(hoursPerWeek)){
            totalHourlyIncome += hourlyRate * hoursPerWeek
        }

        if(!isNaN(yearlySalary)) totalSalaryIncome += yearlySalary


        
        
        
    }
    totalIncomes = totalHourlyIncome + totalSalaryIncome
    // setFetchedData(false)
    return totalIncomes

    }

    function getTotalBillsAmount(){
        let totalBillsAmount = 0

    for(let bill of allBills){
        let billTotal = Number(bill['billTotal'])
        if(!isNaN(billTotal)) totalBillsAmount += billTotal
        
    }
    return totalBillsAmount
    }

    useEffect(() => {
        getAllBills()
        getAllIncomes()
    }, [user, fetchedData])

    useEffect(() => {
        getTotalIncome()
        getTotalBillsAmount()
    }, [allBills, allIncomes])


    return(
        <>
         <NavBar />
            

            <div className="absolute bg-custom-blue w-full h-[100]">
            <section className="bg-custom-purple h-[18vh] mt-[15vh]">

            <div className="container mx-auto mr-10 px-10 flex flex-col md:items-center lg:flex-row lg:justify-start">
            <div className="hidden lg:block lg:w-12"></div> 
            <AddIncomeForm className="mb-4 md:mb-4 lg:mb-0 lg:mr-8"/>
            <div className="hidden lg:block lg:w-8"></div> 
        <AddBillsForm className="pl-4 mb-4 md:mb-4 lg:mb-0 lg:mr-4"/>
    </div>


    
</section>






            




            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[12vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white shadow-2xl overflow-y-auto">
                <div className="flex max-h-[100vh] flex-col lg:w-full md:w-full">
              <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Recent Transactions
              </h5>

            </div>
            </div>


            <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[20vw]lg:w-[20vw] p-6 bg-white shadow-2xl overflow-y-auto">
                <div className="flex max-h-[100vh] flex-col lg:w-[50vw] md:w-[50vw]">
              <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Recent Transactions
              </h5>

            </div>
            </div>
            </div>
            </div>
        </>

    )
};
