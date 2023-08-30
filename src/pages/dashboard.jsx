import Layout from "./layout";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { WeeklySpendingChart } from "../components/graphs/weeklySpendingChart";
import { CategoryDonutChart } from "../components/graphs/categoryDonutChart";
import { MerchantsHorizontalGraph } from "../components/graphs/merchantsHorizontalGraph";
import NavBar from "../components/shared/topbarnav";

export default function Dashboard() {
  const [showDropdown, setShowDropdown] = useState([]);
  const [showPlaidLinks, setShowPlaidLinks] = useState(false)
  const [allRecentTransactions, setAllRecentTransactions] = useState(null);
  const [allItems, setAllItems] = useState(null);
  const buttonRef = useRef(null);

  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    const fetchAllRecentTransactions = async () => {
      try {
        const response = await fetch(
          "/api/dashboard/recentCreditCardTransactions",
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
          throw new Error("failed to get recent transactions");
        }

        const recentCreditCardTransactions = await response.json();
        setAllRecentTransactions(recentCreditCardTransactions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllRecentTransactions();
  }, [user]);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await fetch("/api/dashboard/displayAllItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ userID: user?.id }),
        });

        if (!response.ok) {
          throw new Error("failed to get all items");
        }

        const allFetchedItems = await response.json();
        setAllItems(allFetchedItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllItems();
  }, [user]);



  return (
    <>
      <NavBar />
      <div className="absolute bg-custom-blue w-full mt-[15vh] h-[100]">
        {/* <div className="relative bg-sky-100 pt-[25vh] mt-20vh] h-full w-screen "> */}

        <section className="bg-custom-purple">
          <div className="pt-1 py-48 px-4 max-w-screen-xl text-justify-left lg:py-12">
            <h5 className=" pt-none  pb-0  text-7xl font-thin leading-none text-white">{`Welcome ${user?.firstName}!`}</h5>
            <div className="ml-10 mr-10 pt-10  relative inline-block">
            <button 
                onClick={() => setShowPlaidLinks(!showPlaidLinks)}
                className="bg-white border-2 border-transparent hover:border-blue-700 focus:border-blue-700 focus:outline-none  block" 
                type="button"
            >
              <p className='ml-5 mr-5 mt-2 mb-2 font-thin text-lg text-center font-goldman text-custom-purple'>Add an Account</p>
            </button>
            
            {/* Dropdown menu */}
            {showPlaidLinks && (
                <div 
                    id="dropdown" 
                    className="absolute z-10 bg-white divide-y  shadow w-full mt-0"
                >
                    <ul 
                        className="py-2 font-medium bg-white font-goldman text-sm"
                    >
                      
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/checking" className="block pl-3 pr-4 text-custom-purple">Checking</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/savings" className="block pl-3 pr-4 text-custom-purple">Savings</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/creditcards" className="block pl-3 pr-4 text-custom-purple">Credit Card</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/loans" className="block pl-3 pr-4 text-custom-purple">Loan</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/investments" className="block pl-3 pr-4 text-custom-purple">Investment</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/budgets" className="block pl-3 pr-4 text-custom-purple">Job</Link>
            </li>
                    </ul>
                </div>
            )}
        </div>
            
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
             











            </div>
          </div>
        </section>

        <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[5vh] h-full  flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">
          <div className=" py-2 duration-300 hover:scale-105 hover:shadow-xl w-full md:h-[50vh] lg:h-[100vh] lg:w-[30vw] p-6 bg-white  shadow-2xl  overflow-y-auto">
            <div className="h-full overflow-y-auto">
              <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Recent Transactions
              </h5>

              <div className="relative overflow-y-auto shadow-2xl">
                <table className="w-full text-sm text-left">
                  <tbody>
                    {allRecentTransactions &&
                      allRecentTransactions?.map((transaction) => (
                        <tr
                          key={transaction?.date}
                          className="bg-white border-b border-custom-blue"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4  whitespace-nowrap"
                          >
                            <div className="text-md font-thin font-goldman text-custom-purple">
                              {transaction?.name}
                            </div>
                            <div className="text-md font-thin font-goldman text-green-700">{`$${transaction?.amount}`}</div>
                            <div className="text-md font-thin font-goldman text-custom-purple">
                              {new Date(transaction?.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </th>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Main Cards Container */}
          <div className="flex-grow lg:flex-basis-0 w-full lg:w-2/3 flex flex-col space-y-4 overflow-y-auto">
            {/* ... contents of the main cards ... */}

            {/* First Card */}
            <div className=" py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 bg-white shadow-2xl ">
            <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Accounts
              </h5>
              
              <div className="mb-5 flex flex-col  space-y-4 sm:space-y-2">
                <button
                  onClick={() =>
                    setShowDropdown(
                      showDropdown !== "Checking and Savings"
                        ? "Checking and Savings"
                        : null
                    )
                  }
                  className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2"
                >
                  Checking and Savings
                  <div className="flex items-center  space-x-2">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </button>

                {showDropdown === "Checking and Savings" && (
                   <div className="w-full  bg-custom-blue">
                   <div className="w-11/12 bg-custom-blue mx-auto">
                      {allItems?.map(
                        (item) =>
                          item?.checkingAccounts &&
                          item?.checkingAccounts.map((account) => (
                            <ul
                              key={account?.name}
                              className="flex mb-2 items-center justify-between py-1"
                            >
                              <li className="flex items-center">
                                <div className="flex flex-col items-start">
                                  <div className="ml-0 text-sm font-thin font-goldman text-custom-purple">
                                    {account?.name}
                                  </div>
                                  <div className="ml-0 text-sm font-thin font-goldman text-green-700">{`Current Balance: $${account?.balance}`}</div>
                                </div>
                              </li>

                              <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                  <span className="mr-0 text-sm font-thin font-goldman text-custom-purple">{`Date Added: ${new Date(
                                    account?.dateAdded
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}`}</span>
                                  <span className="mr-0 text-xs font-thin font-goldman text-green-700">
                                    {account?.accountNumber}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ))
                      )}

                      {allItems?.map(
                        (item) =>
                          item?.savingsAccounts &&
                          item?.savingsAccounts?.map((account) => (
                            <ul
                              key={account?.name}
                              className="flex mb-2 items-center justify-between py-1"
                            >
                              <li className="flex items-center">
                                <div className="flex flex-col items-start">
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">
                                    {account?.name}
                                  </div>
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-green-700">{`Current Balance: $${account?.balance}`}</div>
                                </div>
                              </li>

                              <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                  <span className="mr-0 text-sm font-thin font-goldman text-custom-purple">{`Date Added: ${new Date(
                                    account?.dateAdded
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}`}</span>
                                  <span className="ml-0 mr-0 text-sm font-thin font-goldman text-green-700">
                                    {account?.accountNumber}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ))
                      )}

                      <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                        <Link href="/checking">
                          <button className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2">
                            Add A Checking Account
                          </button>
                        </Link>

                        <div className="pt-2">
                          <Link href="/savings">
                            <button className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2">
                              Add A Savings Account
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    setShowDropdown(
                      showDropdown !== "Credit Cards" ? "Credit Cards" : null
                    )
                  }
                  className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2"
                >
                  Credit Cards
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </button>

                {showDropdown === "Credit Cards" && (
                  <div className="w-full  bg-custom-blue">
                    <div className="w-11/12 bg-custom-blue mx-auto">
                      {allItems?.map(
                        (item) =>
                          item?.creditCards &&
                          item?.creditCards?.map((card) => (
                            <ul
                              key={card?.name}
                              className="flex mb-2 items-center justify-between py-1"
                            >
                              <li className="flex items-center">
                                <div className="flex flex-col items-start">
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">
                                    {card?.name}
                                  </div>
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-green-700">{`Current Balance: $${card?.currentBalance}`}</div>
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-green-700">{`Credit Limit: $${card?.creditLimit}`}</div>
                                </div>
                              </li>

                              <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                  <span className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">{`Date Added: ${new Date(
                                    card?.dateAdded
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}`}</span>
                                  <span className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">
                                    {card?.number}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ))
                      )}
                      <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                        <Link href="/creditcards">
                          <button className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2">
                            Add A Credit Card
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    setShowDropdown(showDropdown !== "Loans" ? "Loans" : null)
                  }
                  className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2"
                >
                  Loans
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </button>

                {showDropdown === "Loans" && (
                    <div className="w-full  bg-custom-blue">
                    <div className="w-11/12 bg-custom-blue mx-auto">
                      {allItems?.map(
                        (item) =>
                          item?.loans &&
                          item?.loans?.map((loan) => (
                            <ul
                              key={loan.name}
                              className="flex mb-2 items-center justify-between py-1"
                            >
                              <li className="flex items-center">
                                <div className="flex flex-col items-start">
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">
                                    {loan.name}
                                  </div>
                                </div>
                              </li>

                              <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                  <span className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">{`Date Added: ${new Date(
                                    loan?.dateAdded
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}`}</span>
                                  <span className="ml-0 mr-0 text-xs font-thin font-goldman text-green-700">
                                    {loan?.accountNumber}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ))
                      )}
                      <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                        <Link href="/loans">
                          <button className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2">
                            Add A Loan
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    setShowDropdown(
                      showDropdown !== "Investments" ? "Investments" : null
                    )
                  }
                  className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2"
                >
                  Investments
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-2.5 h-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </button>

                {showDropdown === "Investments" && (
                   <div className="w-full  bg-custom-blue">
                   <div className="w-11/12 bg-custom-blue mx-auto">
                      {allItems?.map(
                        (item) =>
                          item?.investmentAccounts &&
                          item?.investmentAccounts.map((investment) => (
                            <ul
                              key={investment?.name}
                              className="flex mb-2 items-center justify-between py-1"
                            >
                              <li className="flex items-center">
                                <div className="flex flex-col items-start">
                                  <div className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">
                                    {investment?.name}
                                  </div>
                                </div>
                              </li>

                              <li className="flex items-center">
                                <div className="flex flex-col items-end">
                                  <span className="ml-0 mr-0 text-sm font-thin font-goldman text-custom-purple">{`Date Added: ${new Date(
                                    investment?.dateAdded
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}`}</span>
                                  <span className="ml-0 mr-0 text-xs font-thin font-goldman text-green-700">
                                    {investment?.accountNumber}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          ))
                      )}
                      <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                        <Link href="/investments">
                          <button className="text-md font-thin font-goldman text-custom-purple bg-transparent hover:bg-blue-500   hover:text-white border border-blue-500 hover:border-transparent flex w-[50w] flex-col sm:flex-row items-center  justify-between  text-left  px-4 py-2">
                            Add Investments
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Second Card */}
            <div className=" duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white shadow-2xl">
            <h5 className="mb-2 font-thin text-2xl text-justify-left font-goldman text-custom-purple">
                Weekly Spending
              </h5>

              {<WeeklySpendingChart transactions={allRecentTransactions} />}
            </div>

            <div className="  duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center overflow-scrollable  bg-white shadow-2xl">
            <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                Top Places
              </h5>
              <MerchantsHorizontalGraph transactions={allRecentTransactions} />
            </div>

            {/* Third Row - Two Cards Side by Side on Larger Screens */}
            <div className=" w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
              <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
              <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                  Spending Categories
                </h5>
                <CategoryDonutChart transactions={allRecentTransactions} />
              </div>

              <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white shadow-2xl">
                <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                  Weekly Spending
                </h5>
              </div>
            </div>

            {/* Fourth Card */}

            {/* Fifth Row - Two More Cards */}
            <div className=" w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
              <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
              <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                  Spending Categories
                </h5>
                <CategoryDonutChart transactions={allRecentTransactions} />
              </div>

              <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white shadow-2xl">
                <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
                  Weekly Spending
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
