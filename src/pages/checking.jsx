import Layout from "./layout";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import CheckingAccountLink from "../components/plaidLinks/bankAccounts/checking/checkingAccountLink"
import {useUser} from "@clerk/nextjs";

import InfoContext from "../contexts/InfoContext"


export default function CheckingAccounts() {
    const [allCheckingAccounts, setAllCheckingAccounts] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedCheckingTransactions, setDisplayedCheckingTransactions] = useState([]);
    const [selectedCheckingAccount, setSelectedCheckingAccount] = useState(null);

    console.log(allCheckingAccounts);

    const fetchAllCheckingAccounts = async () => {
        try {
            const response = await fetch("/api/bankAccounts/checkingAccount/getAllCheckingAccounts", {
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
                throw new Error("failed to get all checking accounts");
            }

            const fetchedCheckingAccounts = await response.json();
            setAllCheckingAccounts(fetchedCheckingAccounts);
            setFetchedData(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllCheckingAccounts();
    }, [user, fetchedData]);

    useEffect(() => {
        const allTransactions = allCheckingAccounts.flatMap((account) => account?.transactions);
        setDisplayedCheckingTransactions(allTransactions);
        setSelectedCheckingAccount(allCheckingAccounts[0]);
        setFetchedData(false);
    }, [allCheckingAccounts, setFetchedData]);

    console.log(allCheckingAccounts)

    const filteredTransactions = !searchTerm ? displayedCheckingTransactions : displayedCheckingTransactions.filter((transaction) => transaction.amount.toString().includes(searchTerm) || transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.date.toString().includes(searchTerm.toLowerCase()) || transaction.paymentChannel.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout className="bg-sky-100 min-h-[100vh]">
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[30vh] h-full   flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="w-full h-[95.5%] xl:w-[30vw] lg:w-[30vw] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-y-scroll max-h-[95.5%]">
                <div className="flex flex-col lg:w-full md:w-[70vw]">
                        <h5 className="mb-8 text-2xl text-center font-bold text-black">
                            Checking Accounts
                        </h5>
                        <CheckingAccountLink/>
                        <div className="flex flex-col lg:w-full md:w-[70vw]">
                            {
                            allCheckingAccounts && allCheckingAccounts?.map((account) => (
                                <div key={
                                        account?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedCheckingTransactions(account?.transactions);
                                            setSelectedCheckingAccount(account);
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
                                        const allTransactions = allCheckingAccounts?.flatMap((account) => account?.transactions);
                                        setDisplayedCheckingTransactions(allTransactions);
                                    }
                            }>
                                <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                    View All Checking Accounts
                                </h3>
                            </div>
                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay transactions={filteredTransactions}
                    card={selectedCheckingAccount}/>
            </div>
            {/* </div> */}
            {" "} </Layout>
    );
}
