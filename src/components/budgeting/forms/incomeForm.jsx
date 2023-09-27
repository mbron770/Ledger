import {useUser} from "@clerk/nextjs";
import Router from "next/router";
import {useState, useEffect, useCallback, useContext} from "react";
import {usePlaidLink} from "react-plaid-link";
import InfoContext from "../../../contexts/InfoContext";

export default function AddIncomeForm() {

    const [addJob, setAddJob] = useState(false);
    const [jobType, setJobType] = useState('')
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [payType, setPayType] = useState('')
    const [yearlySalary, setYearlySalary] = useState('')
    const [payFrequency, setPayFrequency] = useState('')
    const [payAmount, setPayAmount] = useState('')
    const [takeHome, setTakeHome] = useState('')

    const [hourlyRate, setHourlyRate] = useState('')
    const [hoursWorked, setHoursWorked] = useState('')
    const {user} = useUser()
    const {fetchedData, setFetchedData} = useContext(InfoContext);

    const toggleButton = () => {
        setAddJob(!addJob);
    };


    // form change functions

    async function addJobToDB(e) {
        e.preventDefault()
        toggleButton()
        setJobType("");
        setTitle("");
        setCompany("");
        setPayType("");
        setYearlySalary("");
        setHourlyRate("");
        setHoursWorked("");
        setPayFrequency("");
        setTakeHome("");
        setFetchedData();

        try {

            const response = await fetch("/api/income/addIncome", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                },
                body: JSON.stringify(
                    {
                        userID: user ?. id,
                        incomeType: jobType,
                        jobTitle: title,
                        company: company,
                        payType: payType,
                        paySchedule: payFrequency,
                        takeHomePay: takeHome,
                        yearlySalary: yearlySalary,
                        hourlyRate: hourlyRate,
                        hoursPerWeek: hoursWorked


                    }
                )
            })
            if (! response.ok) {
                throw new Error('failed to add job to DB')
            }
            const newJob = await response.json()
            console.log(newJob)

        } catch (error) {
            console.error(error)

        }


    }

    function handleJobTypeChange(e) {
        setJobType(e.target.value)
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleCompanyChange(e) {
        setCompany(e.target.value)
    }

    function handlePayTypeChange(e) {
        setPayType(e.target.value)
    }

    function handleYearlySalaryChange(e) {
        setYearlySalary(e.target.value)
    }

    function handlePayFrequencyChange(e) {
        setPayFrequency(e.target.value)
    }

    function handlePayAmountChange(e) {
        setPayAmount(e.target.value)
    }

    function handleHourlyRateChange(e) {
        setHourlyRate(e.target.value)
    }

    function handleHoursWorkedChange(e) {
        setHoursWorked(e.target.value)
    }

    function handleTakeHomeChange(e) {
        setTakeHome(e.target.value)
    }

    return (<>
        <button onClick={toggleButton}
            className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-10 py-2.5 mb-3"
            type="button">
            Add Job
        </button>

        {addJob && (
                                                    <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 p-4 flex items-center justify-center md:px-8 lg:px-12">
                                                      <div className="relative w-full max-w-3xl max-h-full bg-custom-blue shadow overflow-y-auto">

                                                        <div className="relative bg-custom-blue  shadow ">
                                                            <button type="button"
                                                                    onClick={toggleButton}
                                                                    className="absolute top-3 right-2.5 text-custom-purple bg-transparent hover:bg-gray-200 hover:text-gray-900 text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                                    </svg>
                                                                    <span className="sr-only">Close modal</span>
                                                                </button>
                                                                 <div className="px-6 py-6 lg:px-8">
                                                                 <h3 className="text-xl text-center font-medium text-custom-purple font-goldman">Add your job or side hustle</h3>
                                                                 <form className="space-y-6 md:space-y-0 grid md:grid-cols-1 lg:grid-cols-2 gap-6" action="#" onSubmit={addJobToDB}>

                                                                <div className="space-y-6">
                                                                <div>
                                                                <label for="incomeType" className="block  text-sm font-medium text-custom-purple font-goldman mb-1">Select Income Type</label>
                                                                    <select id="incomeType" name='jobType' value={jobType} onChange={handleJobTypeChange}
                                                                     className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 ">
                                                                    <option>W2 Job</option>
                                                                            <option>1099 Job</option>
                                                                            <option>Side Hustle</option>
                                                                            <option>Other</option>
                                                                    </select>
                                                                </div>
        
            
                                                                 <div>
                                                                            <label htmlFor="title" className="block text-sm font-medium text-custom-purple font-goldman mb-1">
                                                                                Job Title
                                                                            </label>
                                                                            <input type="text" 
                                                                            id="title" 
                                                                            value={title}
                                                                            onChange={handleTitleChange}
                                                                            className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 " placeholder="Software Engineer" required/>
                                                                        </div>
            
            
            
            
                                                                <div>
                                                                            <label htmlFor="company" className="block text-sm font-medium text-custom-purple font-goldman mb-1">
                                                                                Company
                                                                            </label>
                                                                            <input type="text"
                                                                            id="company"  
                                                                            value={company}
                                                                            onChange={handleCompanyChange}
                                                                            className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 " placeholder="Ledger Personal Finance" required/>
                                                                        </div>
            
            
            
            
                                                                </div>
            
            
            
            <div className="space-y-6">
                <div>
                <label htmlFor="payType" className="block text-sm font-medium text-custom-purple font-goldman  mb-1 ">
                        How do you get paid?
                    </label>
                    <select 
                        id="payType" 
                        value={payType}
                        onChange={(e) => setPayType(e.target.value)}
                        className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 "
                    >
                        <option value="Salary">Salary</option>
                        <option value="Hourly">Hourly</option>
                    </select>
                </div>
            
                {payType === 'Salary' && (
                    <div>
                        <label htmlFor="yearlySalary" className="block mt-2 text-sm font-medium text-custom-purple font-goldman mb-1">
                            Yearly Salary ($)
                        </label>
                        <input 
                            type="number" 
                            id="yearlySalary" 
                            value={yearlySalary} 
                            onChange={handleYearlySalaryChange}
                            className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 "
                        />
                    </div>
                )}
            
                {payType === 'Hourly' && (
                    <>
                        <div>
                            <label htmlFor="hourlyRate" className="block mt-2 text-sm font-medium text-custom-purple font-goldman mb-1">
                                Hourly Rate ($)
                            </label>
                            <input 
                                type="number" 
                                id="hourlyRate" 
                                value={hourlyRate} 
                                onChange={handleHourlyRateChange} 
                                className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 "
                            />
                        </div>
            
                        <div>
                            <label htmlFor="hoursWorked" className="block mt-2 text-sm font-medium text-custom-purple font-goldman mb-1">
                                How many hours do you work per week?
                            </label>
                            <input 
                                type="number" 
                                id="hoursWorked" 
                                value={hoursWorked} 
                                onChange={handleHoursWorkedChange}
                                className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 " 
                            />
                        </div>
                    </>
                )}
            </div>
            
            
            
            <div className="space-y-6 lg:col-span-2">

            <div>
                                                                         <label htmlFor="incomeType" className="block text-sm font-medium text-custom-purple font-goldman mb-1">How often to you get paid?</label>
                                                                           <select id="payFrequency" value={payFrequency} onChange={handlePayFrequencyChange} className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 ">
                                                                                <option value="weekly">Weekly</option>
                                                                                <option value="biweekly">Bi-Weekly</option>
                                                                                <option value="monthly">Monthly</option>
                                                                                <option value="annually">Annually</option>
                                                                            </select>
                                                                        </div>
            
                                                                    <div> 
                    <label htmlFor="takeHome" className="block mt-2 text-sm font-medium text-custom-purple font-goldman mb-1 -mt-2">What's your take home pay?</label>
                    <input type="number" id="takeHome" value={takeHome} onChange={handleTakeHomeChange} className="bg-custom-purple  text-white text-sm font-goldman  block w-full p-2.5 " />
                </div>
                <div>
                    <button type="submit" className="w-full text-custom-blue font-goldman bg-custom-purple hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center">
                        Add
                    </button>
                </div>
                                                             
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
