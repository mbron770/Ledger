import { useContext, useState, useEffect } from "react";
import InfoContext from "../../../contexts/InfoContext"




export default function TransactionsDisplayTable({transactions}) {
    
    const {
        searchTerm, setSearchTerm
       } = useContext(InfoContext);

    return (
        <>
            <div className="overflow-y-auto flex-grow shadow-md sm:rounded-lg">
                <div className=" pt-3 pl-3 pr-3 flex justify-center items-center pb-4 bg-white w-full">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full mt-0">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input 
                        type="text" 
                        onChange={(e) => {setSearchTerm(e.target.value)}}
                        id="table-search" 
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search..."/>
                    </div>
                </div>

                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">


                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" className="px-3 py-2">
                                Transaction
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Amount
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Method
                            </th>
                            <th scope="col" className="px-3 py-2">
                                Pending
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody> {
                        transactions.map((transaction) => (

                            <tr key={
                                    transaction.date
                                }
                                className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                <th scope="row" className="px-3 py-3 font-medium text-gray-900  dark:text-white">
                                    {
                                    transaction.name
                                } </th>
                                <td className="px-3 py-3">
                                    {
                                    `$${
                                        transaction.amount
                                    }`
                                }</td>
                                <td className="px-3 py-3">
                                    {
                                    transaction.category
                                }</td>
                                <td className="px-3 py-3">
                                    {
                                    transaction.paymentChannel
                                }</td>
                                <td className="px-3 py-3">
                                    {
                                    transaction.pending
                                }</td>
                                <td className="px-3 py-3">
                                    {
                                    new Date(transaction.date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    })
                                }</td>

                            </tr>


                        ))
                    } </tbody>
                </table>
            </div>
        </>
    );
}
