import Layout from "./layout";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import CreditCardLink from "../components/plaidLinks/liabilities/creditCard/creditCardLink";
import { useUser } from "@clerk/nextjs";
import InfoContext from "../contexts/InfoContext"


export default function CreditCards() {
  const [allCreditCards, setAllCreditCards] = useState([]);
  const { user } = useUser();
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const {
    searchTerm, setSearchTerm
   } = useContext(InfoContext);

console.log(searchTerm);

  useEffect(() => {
    const fetchAllCreditCards = async () => {
      try {
        const response = await fetch(
          "/api/liabilities/creditCard/getAllCreditCards",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({ userID: user?.id }),
          }
        );

        if (!response.ok) {
          throw new Error("failed to get all credit cards");
        }

        const fetchedCreditCards = await response.json();
        setAllCreditCards(fetchedCreditCards);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllCreditCards();
  }, [user]);


  useEffect(() => {
    const allTransactions = allCreditCards.flatMap((card) => card.transactions);
    setDisplayedTransactions(allTransactions);
    setSelectedCard(allCreditCards[0])
  }, [allCreditCards]);


  const filteredTransactions = !searchTerm ? displayedTransactions : displayedTransactions.filter((transaction) => (
    transaction.amount.toString().includes(searchTerm) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.date.toString().includes(searchTerm.toLowerCase()) ||
    transaction.paymentChannel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.pending.toString().includes(searchTerm.toLowerCase()) 
    ))


  return (
    <Layout className="bg-sky-100 min-h-[100vh]">
      {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
      {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}
      <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[30vh] flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Side Card */}
        <div className="w-full md:h-[50vh] lg:h-full lg:w-[30vw] p-6 bg-white border border-gray-200 rounded-lg shadow-2xl overflow-y-auto">
          <div className="flex flex-col justify-center items-center h-full">
            <h5 className="mb-8 text-2xl text-center font-bold text-black">
              Credit Cards
            </h5>

            

            

            <div className="flex flex-col lg:w-full md:w-[70vw]">
              {allCreditCards &&
                allCreditCards.map((card) => (
                  <div
                    key={card.name}
                    className="mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
                    href="#"
                    onClick={() => {setDisplayedTransactions(card.transactions)
                        setSelectedCard(card);
                    }}
                  >
                    <h2 className="mb-2 text-l font-bold tracking-tight text-gray-900 dark:text-white w-full truncate whitespace-nowrap">
                      {card.name}
                    </h2>

                  
                  </div>
                ))}

<div
              className="mb-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition active:bg-blue-700"
              onClick={() => {
                const allTransactions = allCreditCards.flatMap(
                  (card) => card.transactions
                );
                setDisplayedTransactions(allTransactions);
              }}
            >
              <h3 className="mb-2 text-xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
                View All Credit Cards
              </h3>
            </div>
            </div>
            <CreditCardLink />
          </div>
        </div>

        <MainPageDisplay transactions={filteredTransactions} card={selectedCard} />
      </div>
      {/* </div> */}
    </Layout>
  );
}
