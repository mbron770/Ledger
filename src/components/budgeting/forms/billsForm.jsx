import {useUser} from "@clerk/nextjs";
import Router from "next/router";
import {useState, useEffect, useCallback, useContext} from "react";
import {usePlaidLink} from "react-plaid-link";
import InfoContext from "../../../contexts/InfoContext";

export default function AddBillsForm() {

    const [addBill, setAddBill] = useState(false);
    const [billType, setBillType] = useState('')
    const [description, setDescription] = useState('')
    const [company, setCompany] = useState('')
    const [payFrequency, setPayFrequency] = useState('')
    const [billTotal, setBillTotal] = useState('')
    const {fetchedData, setFetchedData} = useContext(InfoContext);

    const {user} = useUser()

    const toggleButton = () => {
        setAddBill(!addBill);
    };


    // form change functions

    async function addBillToDB(e) {
        e.preventDefault()
        toggleButton()
        setBillType("");
        setDescription("");
        setCompany("");
        setPayFrequency("");
        setBillTotal("");
        setFetchedData()

        try {

            const response = await fetch("/api/bills/addBill", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify(
                    {
                        userID: user ?. id,
                        billType: billType,
                        description: description,
                        company: company,
                        payFrequency: payFrequency,
                        billTotal: billTotal,

                    }
                )
            })
            if (! response.ok) {
                throw new Error('failed to add bill to DB')
            }
            const newBill = await response.json()
            console.log(newBill)

        } catch (error) {
            console.error(error)

        }


    }

    function handleBillTypeChange(e) {
        setBillType(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleCompanyChange(e) {
        setCompany(e.target.value)
    }

    function handlePayFrequencyChange(e) {
        setPayFrequency(e.target.value)
    }

    function handleBillTotalChange(e) {
        setBillTotal(e.target.value)
    }

    return (<>
        <button onClick={toggleButton}
            className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-3"
            type="button">
            Add Bill
        </button>

        {addBill && (
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
                                                    <h3 className="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white">Add your bills</h3>
                                                    <form className="space-y-6" action="#" onSubmit={addBillToDB}>
                                                    <div>
                                                    <label for="incomeType" className="block  text-sm font-medium text-gray-900 dark:text-white">Select Bill Type</label>
                                                        <select id="incomeType" name='billType' value={billType} onChange={handleBillTypeChange}
                                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                        <option>Utility</option>
                                                                <option>Loan</option>
                                                                <option>Subscription</option>
                                                                <option>Phone</option>
                                                                <option>Other</option>
                                                        </select>
                                                    </div>
                            
                                                 
                        
                                                    <div>
                                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                    Description
                                                                </label>
                                                                <input type="text" 
                                                                id="description" 
                                                                value={description}
                                                                onChange={handleDescriptionChange}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Electric Bill" required/>
                                                            </div>
                            
                        
                                                    <div>
                                                                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                                    Company
                                                                </label>
                                                                <input type="text"
                                                                id="company"  
                                                                value={company}
                                                                onChange={handleCompanyChange}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="ConEdison" required/>
                                                            </div>
                        <div>
                                                            <label for="incomeType" className="block  text-sm font-medium text-gray-900 dark:text-white">How often is this bill due?</label>
                                                                <select id="payFrequency" value={payFrequency} onChange={handlePayFrequencyChange}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                >
                                                                    <option value="weekly">Weekly</option>
                                                                    <option value="biweekly">Bi-Weekly</option>
                                                                    <option value="monthly">Monthly</option>
                                                                    <option value="annually">Annually</option>
                                                                </select>
                                                            </div>
                            
                                                    <div>
                                                    <label htmlFor="billTotal" className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">How much is this bill?</label>
                                                        <input type="number" id="billTotal" value={billTotal} onChange={handleBillTotalChange} 
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                        />
                                                    </div>
                            
                                                    <div>
                                                    <button  type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                Add Bill
                                                            </button>
                                                    </div>
                            
                                                </form>
                                            </div>
                                        </div>
                                        </div>
                                                </div>
                                         
                                    )}
                                </>
    );


    }
