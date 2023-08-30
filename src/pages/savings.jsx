import NavBar from "../components/shared/topbarnav";
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

    const filteredTransactions = !searchTerm ? displayedSavingsTransactions : displayedSavingsTransactions.filter((transaction) => transaction.amount.toString().includes(searchTerm) 
    || transaction.category.toLowerCase().includes(searchTerm) 
    || transaction.name.toLowerCase().includes(searchTerm) 
    || transaction.paymentChannel.toLowerCase().includes(searchTerm));

    return (
        <>
        <NavBar/>
            <div className="absolute bg-custom-blue w-full h-[100]">
                <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[20vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white shadow-2xl overflow-y-auto">
                <div className="flex max-h-[100vh] flex-col lg:w-full md:w-full">
                            <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                                Savings Accounts
                            </h5>
                        <SavingsAccountLink/>

                        <div className="mb-2 pt-10 pb-10 text-center bg-custom-purple shadow-l transition active:bg-blue-300"
                                onClick={
                                    () => {
                                        const allTransactions = allSavingsAccounts?.flatMap((account) => account?.transactions);
                                        setDisplayedSavingsTransactions(allTransactions);
                                    }
                            }>
                                <h3 className="mb-2 text-l font-thin font-goldman text-white tracking-tight w-full truncate whitespace-nowrap">
                                    View All Savings Accounts
                                </h3>
                            </div>

                            <div className="flex flex-col lg:w-full md:w-full">
                            {
                            allSavingsAccounts && allSavingsAccounts?.map((account) => (
                                <div key={
                                        account?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-custom-blue shadow-l transition active:bg-blue-300"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedSavingsTransactions(account?.transactions);
                                            setSelectedSavingsAccount(account);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-thin font-goldman text-custom-purple tracking-tight w-full truncate whitespace-nowrap">
                                        {
                                        account?.name
                                    }
                                        {" "} </h2>
                                </div>
                            ))
                        }

                            


                          










                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay transactions={filteredTransactions}
                    card={selectedSavingsAccount}/>
            </div>
            </div>
            </>
            
    );
}
