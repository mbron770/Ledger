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
    const [displayedHoldings, setDisplayedHoldings] = useState(null);
    const [displayedSecurities, setDisplayedSecurities] = useState(null);
    const [selectedInvestmentAccount, setSelectedInvestmentAccount] = useState(null);

    console.log(selectedInvestmentAccount)


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
        const allInvestmentTransactions = allInvestmentAccounts ?. flatMap((investment) => investment ?. transactions);
        const allSecurities = allInvestmentAccounts ?. flatMap((investment) => investment ?. securities);
        const allHoldings = allInvestmentAccounts ?. flatMap((investment) => investment ?. holdings);
        setDisplayedInvestmentTransactions(allInvestmentTransactions);
        setDisplayedHoldings(allHoldings)
        setDisplayedSecurities(allSecurities)
        setSelectedInvestmentAccount(allInvestmentAccounts[0]);
        setFetchedData(false);
    }, [allInvestmentAccounts, setFetchedData]);


    return (
        <>
            <NavBar/>
            <div className="absolute bg-custom-blue w-full h-[100]">
                <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[20vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
                    {/* Side Card */}
                    <div className="duration-300 hover:scale-105 hover:shadow-xl w-full  md:w-full xl:w-[30vw]lg:w-[30vw] p-6 bg-white shadow-2xl overflow-y-auto">
                        <div className="flex flex-col lg:w-full md:w-full ">
                            <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                                Investments
                            </h5>
                            <InvestmentAccountLink/>

                            <div className="mb-2 pt-10 pb-10 text-center bg-custom-purple shadow-l transition active:bg-blue-300"
                                onClick={
                                    () => {
                                        const allInvestmentTransactions = allInvestmentAccounts ?. flatMap((investment) => investment ?. transactions);
                                        const allSecurities = allInvestmentAccounts ?. flatMap((investment) => investment ?. securities);
                                        const allHoldings = allInvestmentAccounts ?. flatMap((investment) => investment ?. holdings);


                                        setDisplayedInvestmentTransactions(allInvestmentTransactions);
                                        setDisplayedHoldings(allHoldings);
                                        setDisplayedSecurities(allSecurities);
                                    }
                            }>
                                <h3 className="mb-2 text-l font-thin font-goldman text-white tracking-tight w-full truncate whitespace-nowrap">
                                    View All Investments
                                </h3>
                            </div>

                            <div className="flex max-h-[100vh] flex-col lg:w-full md:w-full">
                                {
                                allInvestmentAccounts && allInvestmentAccounts.map((investment) => (
                                    <div key={
                                            investment ?. name
                                        }
                                        className="mb-2 pt-10 pb-10 text-center bg-custom-blue shadow-l transition active:bg-blue-300"
                                        href="#"
                                        onClick={
                                            () => {
                                                setDisplayedHoldings(investment ?. holdings);
                                                setDisplayedSecurities(investment ?. securities);
                                                setDisplayedInvestmentTransactions(investment ?. transactions);
                                                setSelectedInvestmentAccount(investment);
                                            }
                                    }>
                                        <h2 className="mb-2 text-l font-thin font-goldman text-custom-purple tracking-tight w-full truncate whitespace-nowrap">
                                            {
                                            investment ?. name
                                        } </h2>
                                    </div>


                                ))
                            } </div>

                        </div>
                    </div>

                    <MainPageDisplay card={selectedInvestmentAccount}
                        investmentTransactions={displayedInvestmentTransactions}
                        securities={displayedSecurities}
                        holdings={displayedHoldings}/>

                </div>
            </div>
        </>
    );
}
