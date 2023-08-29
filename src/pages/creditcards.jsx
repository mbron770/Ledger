import Layout from "./layout";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import CreditCardLink from "../components/plaidLinks/liabilities/creditCard/creditCardLink";
import NavBar from "../components/shared/topbarnav";
import {useUser} from "@clerk/nextjs";

import InfoContext from "../contexts/InfoContext";

export default function CreditCards() {
    const [allCreditCards, setAllCreditCards] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    console.log(allCreditCards);

    const fetchAllCreditCards = async () => {
        try {
            const response = await fetch("/api/liabilities/creditCard/getAllCreditCards", {
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
                throw new Error("failed to get all credit cards");
            }

            const fetchedCreditCards = await response.json();
            setAllCreditCards(fetchedCreditCards);
            setFetchedData(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllCreditCards();
    }, [user, fetchedData]);

    useEffect(() => {
        const allTransactions = allCreditCards?.flatMap((card) => card?.transactions);
        setDisplayedTransactions(allTransactions);
        setSelectedCard(allCreditCards[0]);
        setFetchedData(false);
    }, [allCreditCards, setFetchedData]);

    const filteredTransactions = !searchTerm ? displayedTransactions : displayedTransactions.filter((transaction) => transaction?.amount.toString().includes(searchTerm) || transaction?.category.toLowerCase().includes(searchTerm?.toLowerCase()) || transaction?.name.toLowerCase().includes(searchTerm.toLowerCase()) || transaction?.date.toString().includes(searchTerm.toLowerCase()) || transaction?.paymentChannel.toLowerCase().includes(searchTerm.toLowerCase()) || transaction?.pending.toString().includes(searchTerm.toLowerCase()));

    return (
        <>
        <NavBar/>
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
            <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[5vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white   rounded-lg shadow-2xl overflow-y-auto">
                
                <div className="flex flex-col lg:w-full md:w-full ">
                        <h5 className="mb-8 text-2xl text-center font-bold text-black">
                            Credit Cards
                        </h5>
                        <CreditCardLink/>
                        

                        <div className="flex flex-col lg:w-full md:w-full">
                            {
                            allCreditCards && allCreditCards.map((card) => (
                                <div key={
                                        card?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedTransactions(card?.transactions);
                                            setSelectedCard(card);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white w-full truncate whitespace-nowrap">
                                        {
                                        card?.name
                                    }
                                        {" "} </h2>
                                </div>
                            ))
                        }

                            <div className="mb-2 pt-10 pb-10 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                                onClick={
                                    () => {
                                        const allTransactions = allCreditCards?.flatMap((card) => card?.transactions);
                                        setDisplayedTransactions(allTransactions);
                                    }
                            }>
                                <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                                    View All Credit Cards
                                </h3>
                            </div>

                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay transactions={filteredTransactions}
                    card={selectedCard}/>
            </div>
            {/* </div> */}
          </>
    );
}
