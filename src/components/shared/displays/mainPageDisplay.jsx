import {useState, useEffect} from "react";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";
import {WeeklySpendingChart} from "../../../components/graphs/weeklySpendingChart"
import {CategoryDonutChart} from "../../../components/graphs/categoryDonutChart";
import {MerchantsHorizontalGraph} from "../../../components/graphs/merchantsHorizontalGraph";
import TransactionsDisplayTable from "./transactionsDisplayTable"
import LoanDisplayTable from "./loanDisplayTable"
export default function MainPageDisplay({transactions, card}) {
    console.log(card)


    return (
        <> {/* Main Cards Container */}
            <div className="flex-grow lg:flex-basis-0 w-full lg:w-2/3 flex flex-col space-y-4">
                {/* First Row */}
               { transactions && transactions.length > 0 ? <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-[50vh]">
                    <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                       Transactions
                    </h5>
                    <TransactionsDisplayTable transactions={transactions}/>
                    
                </div> : <div className="w-full p-4  text-white bg-black  rounded-lg shadow-2xl flex-col h-full">
                    <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                        Loan Details
                    </h5>
                    <LoanDisplayTable card={card}/>
                    
                </div> }



                {/* Second Row */}
                {transactions ? <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                        Weekly Spending
                    </h5>
                    {
                    < WeeklySpendingChart transactions = {
                        transactions
                    } />
                } </div> : null}

                {/* Third Row */}
               <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                    {transactions ? <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                            Spending Categories
                        </h5>
                        <CategoryDonutChart transactions={transactions}/>
                    </div> : null}


                    {transactions ? <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                            Account Info
                        </h5>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
        
        <tbody>
           
          
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white">
                    {card?.name}
                </th>
                
    
                
            </tr>
           {card?.currentBalance ? <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white">
                {`Current Balance: $${card?.currentBalance}`}
                </th>
                
              
    
                
            </tr> : null}
            {card?.creditLimit ? <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white">
                {`Credit Limit: $${card?.creditLimit}`}
                </th>
                
    
                
            </tr> : null}

           
            
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white">
                {`Date Added: ${new Date(
                        card?.dateAdded
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}`}
                </th>
                
    
                
            </tr>
        </tbody>
    </table>
</div>

 




                    </div> : null}
                </div>

                {/* Fourth Row */}
                {transactions ? <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                        Top Places
                    </h5>
                    <MerchantsHorizontalGraph transactions={transactions}/>
                </div> : null}
            </div>


        </>
    )

}
