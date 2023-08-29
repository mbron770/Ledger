import Layout from "./layout";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import NavBar from "../components/shared/topbarnav";
import {useUser} from "@clerk/nextjs";
import InfoContext from "../contexts/InfoContext";
import InvestmentAccountLink from '../components/plaidLinks/investments/investmentAccountLink';

export default function CreditCards() {
    const [allInvestmentAccounts, setAlInvestmentAccounts] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedInvestmentTransactions, setDisplayedInvestmentTransactions] = useState([]);
    const [displayedHoldings, setDisplayedHoldings] = useState([]);
    const [displayedSecurities, setDisplayedSecurities] = useState([]);
    const [selectedInvestmentAccount, setSelectedInvestmentAccount] = useState(null);
console.log(selectedInvestmentAccount)
    console.log(allInvestmentAccounts);

    const fetchAllInvestmentAccounts = async () => {
        try {
            const response = await fetch("/api/investments/getAllInvestmentAccounts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify(
                    {
                        userID: user ?. id
                    }
                )
            });

            if (! response.ok) {
                throw new Error("failed to get all investments");
            }

            const fetchedInvestmentAccounts = await response.json();
            setAlInvestmentAccounts(fetchedInvestmentAccounts);
            setFetchedData(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllInvestmentAccounts();
    }, [user, fetchedData]);

    useEffect(() => {
        const allInvestmentTransactions = allInvestmentAccounts?.flatMap((investment) => investment?.transactions);
        const allSecurities = allInvestmentAccounts?.flatMap((investment) => investment?.holdings);
        const allHoldings = allInvestmentAccounts?.flatMap((investment) => investment?.securities);
        setDisplayedInvestmentTransactions(allInvestmentTransactions);
        setSelectedInvestmentAccount(allInvestmentAccounts[0]);
        setFetchedData(false);
    }, [allInvestmentAccounts, setFetchedData]);

    const filteredTransactions = !searchTerm ? displayedInvestmentTransactions : displayedInvestmentTransactions.filter((transaction) => transaction?.amount.toString().includes(searchTerm) || transaction?.category.toLowerCase().includes(searchTerm?.toLowerCase()) || transaction?.name.toLowerCase().includes(searchTerm.toLowerCase()) || transaction?.date.toString().includes(searchTerm.toLowerCase()) || transaction?.paymentChannel.toLowerCase().includes(searchTerm.toLowerCase()) || transaction?.pending.toString().includes(searchTerm.toLowerCase()));

    return (
        <>
        <NavBar/>
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[5vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white   rounded-lg shadow-2xl overflow-y-auto">
                <div className="flex flex-col lg:w-full md:w-full ">
                        <h5 className="mb-8 text-2xl text-center font-bold text-black">
                           Investments
                        </h5>
                        <InvestmentAccountLink/>
                        

                        <div className="flex flex-col lg:w-full md:w-full">
                            {
                            allInvestmentAccounts && allInvestmentAccounts.map((investment) => (
                                <div key={
                                    investment?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedHoldings(investment?.holdings);
                                            setDisplayedSecurities(investment?.securities);
                                            setDisplayedInvestmentTransactions(investment?.transactions);
                                            setSelectedInvestmentAccount(investment);
                                        }
                                }
                                
                                >
                                    <h2 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white w-full truncate whitespace-nowrap">
                                        {
                                        investment?.name
                                    }
                                        {" "} </h2>
                                </div>
                            ))
                        }

                            <div className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                onClick={
                                    () => {
                                        const allHoldings = allInvestmentAccounts?.flatMap((investment) => investment?.transactions);
                                        const allSecurities = allInvestmentAccounts?.flatMap((investment) => investment?.transactions);
                                        const allInvestmentTransactions = allInvestmentAccounts?.flatMap((investment) => investment?.transactions);
                                        setDisplayedInvestmentTransactions(allInvestmentTransactions);
                                        setDisplayedHoldings(allHoldings);
                                        setDisplayedSecurities(allSecurities);
                                    }
                            }
                            
                            >
                                <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                    View All Investments
                                </h3>
                            </div>

                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay 
                    card={selectedInvestmentAccount}
                    investmentTransactions={displayedInvestmentTransactions}
                    
                    />
                    
            </div>
            {/* </div> */}
          </>
    );
}
