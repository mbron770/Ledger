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

    useEffect(() => {
        getAllBills()
    }, [user, fetchedData])


    console.log(allBills)

    







    return (
        <>
            <NavBar />
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            <div className="relative bg-sky-100 pt-[25vh] h-full w-screen ">


            <div className="px-4  lg:px-[10vw] pt-[5vh] flex flex-col lg:flex-row items-start lg:space-x-16">

                    {/* Side Card */}
                    <div className="mb-8 w-full lg:w-[20vw] h-[70vh] p-6 mt-8 lg:mt-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <AddIncomeForm/>
                        <br></br>
                        <AddBillsForm/>

                    </div>

                    {/* Main Cards Container */}
                    <div className="w-full lg:w-[70vw] flex flex-col space-y-8  lg:h-[60vh]">
                        
                        {/* First Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                Accounts
                            </h5>
{allBills.map((bill) => (
<div>
    <p>{bill.dateAdded}</p>
    <p>{bill.billType}</p>
    <p>{bill.description}</p>
    <p>{bill.company}</p>
    <p>{bill.payFrequency}</p>
    <p>{bill.billTotal}</p>

</div>
))}
                            
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Second Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                New Card Title
                            </h5>
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Third Row - Two Cards Side by Side on Larger Screens */}
                        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                        </div>

                        {/* Fourth Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                Another Wide Card
                            </h5>
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Fifth Row - Two More Cards */}
                        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
