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

    const filteredTransactions = !searchTerm ? displayedTransactions : displayedTransactions.filter((transaction) => transaction?.amount.toString().includes(searchTerm) 
    || transaction?.category.toLowerCase().includes(searchTerm) 
    || transaction?.name.toLowerCase().includes(searchTerm) 
    || transaction?.date.toString().includes(searchTerm) 
    || transaction?.paymentChannel.toLowerCase().includes(searchTerm) 
    || transaction?.pending.toString().includes(searchTerm));

    return (
        <>
        <NavBar/>
        <div className="absolute bg-custom-blue w-full h-[100]">
        <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[20vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Side account */}
                <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white shadow-2xl overflow-y-auto">
                <div className="flex flex-col lg:w-full md:w-full ">
                <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Credit Cards
              </h5>
                        <CreditCardLink/>

                        <div className="mb-2 pt-10 pb-10 text-center bg-custom-purple shadow-l transition active:bg-blue-300"
                                onClick={
                                    () => {
                                        const allTransactions = allCreditCards?.flatMap((card) => card?.transactions);
                                        setDisplayedTransactions(allTransactions);
                                    }
                            }>
                                 <h3 className="mb-2 text-l font-thin font-goldman text-white tracking-tight w-full truncate whitespace-nowrap">
                                    View All Credit Cards
                                </h3>
                            </div>
                        

                        <div className="flex max-h-[100vh]  flex-col lg:w-full md:w-full">
                            {
                            allCreditCards && allCreditCards.map((card) => (
                                <div key={
                                        card?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-custom-blue shadow-l transition active:bg-blue-300"
                                    href="#"
                                    onClick={
                                        () => {
                                            setDisplayedTransactions(card?.transactions);
                                            setSelectedCard(card);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-thin font-goldman text-custom-purple tracking-tight w-full truncate whitespace-nowrap">
                                        {
                                        card?.name
                                    }
                                        {" "} </h2>
                                </div>
                            ))
                        }

                           

                        </div>
                        
                    </div>
                </div>

                <MainPageDisplay transactions={filteredTransactions}
                    card={selectedCard}/>
            </div>
            </div>
          </>
    );
}
