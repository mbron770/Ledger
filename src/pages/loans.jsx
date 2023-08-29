import Layout from "./layout";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import LoanLink from "../components/plaidLinks/liabilities/loans/loanLink";
import NavBar from "../components/shared/topbarnav";
import {useUser} from "@clerk/nextjs";

import InfoContext from "../contexts/InfoContext";

export default function Loans() {
    const [allLoans, setAllLoans] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);

    console.log(allLoans);

    const fetchAllLoans = async () => {
        try {
            const response = await fetch("/api/liabilities/loans/getAllLoans", {
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
                throw new Error("failed to get all Loan cards");
            }

            const fetchedLoans = await response.json();
            setAllLoans(fetchedLoans);
            setFetchedData(false);
        } catch (error) {
            console.error(error);
        }
    };
    

    useEffect(() => {
        fetchAllLoans();
    }, [user, fetchedData]);


    const filteredLoans = !searchTerm ? allLoans : 
    allLoans.filter((loan) => loan?.name.toLowerCase().includes(searchTerm) 
    // || loan?.number.toLowerCase().includes(searchTerm) 
    // || loan?.dateAdded.toString().toLowerCase().includes(searchTerm) 
    );

    console.log(filteredLoans)

    useEffect(() => {
        // const allTransactions = allLoans?.flatMap((card) => card?.transactions);
        // setDisplayedTransactions(allTransactions);
        setSelectedLoan(filteredLoans[0]);
        setFetchedData(false);
    }, [allLoans, setFetchedData]);

    

    return (
        <>
        <NavBar/>
            <div className="absolute bg-custom-blue w-full h-[100]">
            {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[20vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white   rounded-lg shadow-2xl overflow-y-auto">
                <div className="flex flex-col lg:w-full md:w-full ">
                        <h5 className="mb-8 text-2xl text-center font-bold text-black">
                            Loans
                        </h5>
                        <LoanLink/>
                        

                        <div className="flex flex-col lg:w-full md:w-full">
                            {
                            filteredLoans.map((card) => (
                                <div key={
                                        card?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                    href="#"
                                    onClick={
                                        () => {
                                            // setDisplayedTransactions(card?.transactions);
                                            setSelectedLoan(card);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white w-full truncate whitespace-nowrap">
                                        {
                                        card?.name
                                    }
                                        </h2>
                                </div>
                            ))
                        }

                            <div className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                onClick={
                                    () => {
                                        // const allTransactions = allLoans?.flatMap((card) => card?.transactions);
                                        setSelectedLoan(filteredLoans);
                                    }
                            } 
                            >
                                <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                    View All Loans
                                </h3>
                            </div>

                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay 
                    card={selectedLoan}/>
            </div>
            </div>
          </>
    );
}
