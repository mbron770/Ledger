import Layout from "./layout";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import SavingsAccountLink from "../components/plaidLinks/bankAccounts/Savings/savingsAccountLink"
import {useUser} from "@clerk/nextjs";

import InfoContext from "../contexts/InfoContext"


export default function SavingsAccounts() {
    const [allSavingsAccounts, setAllSavingsAccounts] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedSavingsTransactions, setDisplayedSavingsTransactions] = useState([]);
    const [selectedSavingsAccount, setSelectedSavingsAccount] = useState(null);

    console.log(allSavingsAccounts);

    const fetchAllSavingsAccounts = async () => {
        try {
            const response = await fetch("/api/bankAccounts/savingsAccount/getAllSavingsAccounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(
                    {
                        userID: user?.id
                    }
                )
            });

            if (! response.ok) {
                throw new Error("failed to get all Savings accounts");
            }

            const fetchedSavingsAccounts = await response.json();
            setAllSavingsAccounts(fetchedSavingsAccounts);
            setFetchedData(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllSavingsAccounts();
    }, [user, fetchedData]);

    useEffect(() => {
        const allTransactions = allSavingsAccounts.flatMap((account) => account?.transactions);
        setDisplayedSavingsTransactions(allTransactions);
        setSelectedSavingsAccount(allSavingsAccounts[0]);
        setFetchedData(false);
    }, [allSavingsAccounts, setFetchedData]);

    console.log(allSavingsAccounts)

    const filteredTransactions = !searchTerm ? displayedSavingsTransactions : displayedSavingsTransactions.filter((transaction) => transaction.amount.toString().includes(searchTerm) || transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.date.toString().includes(searchTerm.toLowerCase()) || transaction.paymentChannel.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout className="bg-sky-500 min-h-[100vh]">
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[10vh] h-full   flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="w-full h-[95.5%] xl:w-[30vw] lg:w-[30vw] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-y-scroll max-h-[95.5%]">
                    <div className="flex flex-col justify-center-top items-center h-full">
                        <h5 className="mb-8 text-2xl text-center font-bold text-black">
                            Savings Accounts
                        </h5>
                        <SavingsAccountLink/>

                        <div className="flex flex-col lg:w-full md:w-[70vw]">
                            {
                            allSavingsAccounts && allSavingsAccounts?.map((account) => (
                                <div key={
                                        account?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedSavingsTransactions(account?.transactions);
                                            setSelectedSavingsAccount(account);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white w-full truncate whitespace-nowrap">
                                        {
                                        account?.name
                                    }
                                        {" "} </h2>
                                </div>
                            ))
                        }

                            <div className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                onClick={
                                    () => {
                                        const allTransactions = allSavingsAccounts?.flatMap((account) => account?.transactions);
                                        setDisplayedSavingsTransactions(allTransactions);
                                    }
                            }>
                                <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                    View All Savings Accounts
                                </h3>
                            </div>


                          










                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay transactions={filteredTransactions}
                    card={selectedSavingsAccount}/>
            </div>
            {/* </div> */}
            {" "} </Layout>
    );
}
