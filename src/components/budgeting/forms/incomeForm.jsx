import {useUser} from "@clerk/nextjs";
import Router from "next/router";
import {useState, useEffect, useCallback, useContext} from "react";
import {usePlaidLink} from "react-plaid-link";
// import InfoContext from "../../../contexts/InfoContext";

export default function AddIncomeForm() {

    const [addJob, setAddJob] = useState(false);
    const [jobType, setJobType] = useState('')
    const [payType, setPayType] = useState('')
    // const [payAmount, payAmount] = useState('')

    const toggleButton = () => {
        setAddJob(!addJob);
    };

    return (
        <>
            <button onClick={toggleButton}
                className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mb-3"
                type="button">
                Add Job
            </button>

            {
            addJob && (
                <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-20 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto flex items-center justify-center">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                onClick={toggleButton}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white">Add your job or side hustle</h3>
                                <form className="space-y-6" action="#">

                                    <label for="incomeType" className="block  text-sm font-medium text-gray-900 dark:text-white">Select Income Type</label>
                                    <select id="incomeType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option>W2 Job</option>
                                        <option>1099 Job</option>
                                        <option>Side Hustle</option>
                                        <option>Other</option>
                                    </select>


                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Job Title
                                        </label>
                                        <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Software Engineer" required/>
                                    </div>

                                    <div>
                                        <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Company
                                        </label>
                                        <input type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Ledger Personal Finance" required/>
                                    </div>

                                    <label for="payType" className="block  text-sm font-medium text-gray-900 dark:text-white">How do you get paid?</label>
                                    <select 
                                    id="payType" 
                                    onChange={(e) => setPayType(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value="">Select pay type</option>
                                        <option>Salary</option>
                                        <option>Hourly</option>
                                    </select>

                                    {payType === 'Salary' && (
                                      <div>
                                      <label htmlFor="yearlySalary" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Yearly Salary ($)</label>
                                      <input 
                                        id="yearlySalary" 
                                        type="text" 
                                        // value={payAmount} 
                                        // onChange={handleAmountChange}
                                        placeholder="Enter yearly salary"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    
                                    <label for="incomeType" className="block  text-sm font-medium text-gray-900 dark:text-white">How often to you get paid?</label>
                                    <select id="incomeType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option>Biweekly</option>
                                        <option>Twice Per Month</option>
                                        <option>Monthly</option>
                                        <option>Weekly</option>
                                        <option>Anually</option>
                                    </select>

                                    <label htmlFor="takeHome" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">What's your take home pay?</label>
                                      <input 
                                        id="takeHome" 
                                        type='integer'
                                        // value={payAmount} 
                                        // onChange={handleAmountChange}
                                        placeholder="5000"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    
                                    
                                      </div>

                                    
                                    )

                                    }

{payType === 'Hourly' && (
                                      <div>
                                      <label htmlFor="hourlyRate" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Hourly Rate ($)</label>
                                      <input 
                                        id="hourlyRate" 
                                        type="text" 
                                        // value={payAmount} 
                                        // onChange={handleAmountChange}
                                        placeholder="Enter yearly salary"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    
                                    <label htmlFor="hourlyRate" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">How many hours do you work per week?</label>
                                      <input 
                                        id="hoursWorked" 
                                        type='integer'
                                        // value={payAmount} 
                                        // onChange={handleAmountChange}
                                        placeholder="40"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    
                                    <label for="incomeType" className="block  text-sm font-medium text-gray-900 dark:text-white">How often to you get paid?</label>
                                    <select id="incomeType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option>Biweekly</option>
                                        <option>Twice Per Month</option>
                                        <option>Monthly</option>
                                        <option>Weekly</option>
                                        <option>Anually</option>
                                    </select>

                                    <label htmlFor="takeHome" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">What's your take home pay?</label>
                                      <input 
                                        id="takeHome" 
                                        type='integer'
                                        // value={payAmount} 
                                        // onChange={handleAmountChange}
                                        placeholder="5000"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                                    
                                    </div>
                                    )

                                    }


                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } </>
    );
}