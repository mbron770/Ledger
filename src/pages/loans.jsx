import NavBar from "../components/shared/topbarnav";
import {useState, useEffect, useContext} from "react";
import MainPageDisplay from "../components/shared/displays/mainPageDisplay";
import LoanLink from "../components/plaidLinks/liabilities/loans/loanLink";
import {useUser} from "@clerk/nextjs";

import InfoContext from "../contexts/InfoContext";

export default function Loans() {
    const [allLoans, setAllLoans] = useState([]);
    const {fetchedData, setFetchedData, searchTerm, setSearchTerm} = useContext(InfoContext);
    const {user} = useUser();
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);

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
    );

    console.log(filteredLoans)

    useEffect(() => {
        setSelectedLoan(filteredLoans);
        setFetchedData(false);
    }, [allLoans, setFetchedData]);

    

    return (
        <>
        <NavBar/>
        <div className="absolute bg-custom-blue w-full h-[100vh] overflow-y-auto">
                <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[20vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white shadow-2xl overflow-y-auto">
                <div className="flex max-h-[50vh] flex-col lg:w-full md:w-full">
                            <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                                Loans
                            </h5>
                        <LoanLink/>

                        {/* <div className="mb-2 pt-10 pb-10 text-center bg-custom-purple shadow-l transition active:bg-blue-300"
                                onClick={
                                    () => {
                                        setSelectedLoan(allLoans);
                                    }
                            } 
                            >
                                <h3 className="mb-2 text-l font-thin font-goldman text-white tracking-tight w-full truncate whitespace-nowrap">
                                    View All Loans
                                </h3>
                            </div> */}
                        

                            <div className="flex flex-col lg:w-full md:w-full">
                            {
                            filteredLoans.map((card) => (
                                <div key={
                                        card?.name
                                    }
                                    className="mb-2 pt-10 pb-10 text-center bg-custom-blue shadow-l transition active:bg-blue-300"
                                    href="#"
                                    onClick={
                                        () => {
                                            
                                            setSelectedLoan(card);
                                        }
                                }>
                                    <h2 className="mb-2 text-l font-thin font-goldman text-custom-purple tracking-tight w-full truncate whitespace-nowrap">
                                        {
                                        card?.name
                                    }
                                        </h2>
                                </div>
                            ))
                        }

                            

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
