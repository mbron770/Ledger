import {useContext, useState, useEffect} from "react";
import InfoContext from "../../../contexts/InfoContext";

export default function InvestmentHoldingsDisplayTable({holdings}) {
    const {searchTerm, setSearchTerm} = useContext(InfoContext);

    return (
        <>


            <div className="overflow-y-auto flex-grow">
                <div className=" pt-3 pl-3 pr-3 flex justify-center items-center pb-4 bg-custom-blue w-full">
                    <label htmlFor="table-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full mt-0">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill='#e9eff5' viewBox="0 0 20 20">
                                <path stroke='#21253e' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text"
                            onChange={
                                (e) => {
                                    setSearchTerm(e.target.value)
                                }
                            }
                            id="table-search"
                            className="block p-2 pl-10 text-sm font-thin text-custom-purple  w-full bg-custom-blue focus:ring-custom-purple border-custom-purple"
                            placeholder="Search..."/>
                    </div>
            </div>

            <table className="w-full text-sm text-left font-thin font-goldman text-custom-purple">
                <thead className="text-xs uppercase bg-custom-blue">
                    <tr>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Cost Basis</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Institution Price</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Institution Value</th>
                        <th scope="col" className="px-3 py-2 font-medium font-goldman text-custom-purple">Quantity</th>
                    </tr>
                </thead>
                <tbody> {
                    holdings ?. map((holding) => (
                        <tr key={
                                holding.cost_basis
                            }
                            className="bg-custom-blue py-2 duration-300 hover:scale-105 hover:shadow-xl">
                            <th scope="row" className="px-3 py-2 font-thin font-goldman text-blue-700">
                                {
                                `${
                                    holding.cost_basis
                                }`
                            } </th>
                            <td className="px-3 py-2 font-thin font-goldman text-green-700">
                                {
                                `$${
                                    holding.institution_price
                                }`
                            }</td>
                            <td className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                {
                                `${
                                    holding.institution_value
                                }`
                            }</td>
                            <td className="px-3 py-2 font-thin font-goldman text-custom-purple">
                                {
                                `${
                                    holding.quantity
                                }`
                            }</td>
                        </tr>
                    ))
                } </tbody>
            </table>

        </div>
    </>
    );
}
