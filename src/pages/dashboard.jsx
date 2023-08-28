import Layout from "./layout";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { WeeklySpendingChart } from "../components/graphs/weeklySpendingChart";
import { CategoryDonutChart } from "../components/graphs/categoryDonutChart";
import { MerchantsHorizontalGraph } from "../components/graphs/merchantsHorizontalGraph";

export default function Dashboard() {
  const [showDropdown, setShowDropdown] = useState([]);
  const [allRecentTransactions, setAllRecentTransactions] = useState(null);
  const [allItems, setAllItems] = useState(null);
  
  const { user } = useUser();
  console.log(user?.id);

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

  console.log(allItems);

  return (
    <Layout className="bg-sky-100 min-h-[100vh]">
      {/* <div className="relative bg-sky-100 min-h-[100vh] overflow-x-auto"> */}
      {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}

      <div className="lg:mb-[10vh] px-4 lg:px-[10vw] pt-[30vh] flex flex-col lg:flex-row items-start lg:items-stretch space-y-8 lg:space-y-0 lg:space-x-8">



      <div className="w-full md:h-[50vh] lg:h-[70vh] lg:w-[30vw] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-y-auto">
      <div className="h-full overflow-y-auto">

        <h5 className="mb-2 text-2xl text-center font-bold text-gray-900 dark:text-white">
            Recent Transactions
        </h5>

        <div className="relative overflow-y-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    {allRecentTransactions &&
                        allRecentTransactions?.map((transaction) => (
                            <tr
                                key={transaction?.date}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    <div>{transaction?.name}</div>
                                    <div>{`$${transaction?.amount}`}</div>
                                    <div>
                                        {new Date(transaction?.date).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
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
        <div className="w-full lg:w-2/3 md:h-[100vh] lg:h-[70vh] flex flex-col space-y-4 overflow-y-auto">
        {/* ... contents of the main cards ... */}

          {/* First Card */}
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
              Accounts
            </h5>

            <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400"></p>

            <div className="flex flex-col  space-y-4 sm:space-y-2">
              <button
                onClick={() =>
                  setShowDropdown(
                    showDropdown !== "Checking and Savings"
                      ? "Checking and Savings"
                      : null
                  )
                }
                className="flex w-[50w] flex-col sm:flex-row items-center  justify-between bg-sky-500 text-left text-white px-4 py-2"
              >
                Checking and Savings
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

              {showDropdown === "Checking and Savings" && (
               <div className="w-full bg-white dark:bg-gray-700">
                  <div className="w-11/12 bg-white dark:bg-gray-700 mx-auto">

                    




{
  allItems?.map((item) =>
    item?.checkingAccounts && item?.checkingAccounts.map((account) => (
      <ul
        key={account?.name}
        className="flex mb-2 items-center justify-between py-1 text-sm text-white"
      >
        <li className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="ml-0">{account?.name}</div>
            <div className="ml-0">{`Current Balance: $${account?.balance}`}</div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="mr-0">{`Date Added: ${new Date(account?.dateAdded).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}`}</span>
            <span className="mr-0">{account?.accountNumber}</span>
          </div>
        </li>
      </ul>
    ))
  )
}

{
  allItems?.map((item) =>
    item?.savingsAccounts && item?.savingsAccounts?.map((account) => (
      <ul
        key={account?.name}
        className="flex mb-2 items-center justify-between py-1 text-sm text-white"
      >
        <li className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="ml-0">{account?.name}</div>
            <div className="ml-0">{`Current Balance: $${account?.balance}`}</div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="mr-0">{`Date Added: ${new Date(account?.dateAdded).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}`}</span>
            <span className="mr-0">{account?.accountNumber}</span>
          </div>
        </li>
      </ul>
    ))
  )
}





                    <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                            <Link href="/checking">
                              <button className="block  pb-2 py-2 pl-10 pr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded">
                                Add A Checking Account
                              </button>
                            </Link>

                            <div className="pt-2">
                              <Link href="/savings">
                                <button className="block py-2 pl-10 pr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded">
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
                    showDropdown !== "Credit Cards"
                      ? "Credit Cards"
                      : null
                  )
                }
                className="flex w-[50w] flex-col sm:flex-row items-center  justify-between bg-sky-500 text-left text-white px-4 py-2"
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
               <div className="w-full bg-white dark:bg-gray-700">
                  <div className="w-11/12 bg-white dark:bg-gray-700 mx-auto">

                    




{
  allItems?.map((item) =>
    item?.creditCards && item?.creditCards?.map((card) => (
      <ul
        key={card?.name}
        className="flex mb-2 items-center justify-between py-1 text-sm text-white"
      >
        <li className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="ml-0">{card?.name}</div>
            <div className="ml-0">{`Current Balance: $${card?.currentBalance}`}</div>
            <div className="ml-0">{`Credit Limit: $${card?.creditLimit}`}</div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="mr-0">{`Date Added: ${new Date(card?.dateAdded).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}`}</span>
            <span className="mr-0">{card?.number}</span>
          </div>
        </li>
      </ul>
    ))
  )
}
                    <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                            <Link href="/creditcards">
                              <button className="block  pb-2 py-2 pl-10 pr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded">
                                Add A Credit Card
                              </button>
                            </Link>

                           
                          </div>
                  </div>
                </div>
              )}


<button
                onClick={() =>
                  setShowDropdown(
                    showDropdown !== "Loans"
                      ? "Loans"
                      : null
                  )
                }
                className="flex w-[50w] flex-col sm:flex-row items-center  justify-between bg-sky-500 text-left text-white px-4 py-2"
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
               <div className="w-full bg-white dark:bg-gray-700">
                  <div className="w-11/12 bg-white dark:bg-gray-700 mx-auto">

                    




{
  allItems?.map((item) =>
    item?.loans && item?.loans?.map((loan) => (
      <ul
        key={loan.name}
        className="flex mb-2 items-center justify-between py-1 text-sm text-white"
      >
        <li className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="ml-0">{loan.name}</div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="mr-0">{`Date Added: ${new Date(loan?.dateAdded).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}`}</span>
            <span className="mr-0">{loan?.accountNumber}</span>
          </div>
        </li>
      </ul>
    ))
  )
}
                    <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                            <Link href="/loans">
                              <button className="block  pb-2 py-2 pl-10 pr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded">
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
                    showDropdown !== "Investments"
                      ? "Investments"
                      : null
                  )
                }
                className="flex w-[50w] flex-col sm:flex-row items-center  justify-between bg-sky-500 text-left text-white px-4 py-2"
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
               <div className="w-full bg-white dark:bg-gray-700">
                  <div className="w-11/12 bg-white dark:bg-gray-700 mx-auto">

                    




{
  allItems?.map((item) =>
    item?.investmentAccounts && item?.investmentAccounts.map((investment) => (
      <ul
        key={investment?.name}
        className="flex mb-2 items-center justify-between py-1 text-sm text-white"
      >
        <li className="flex items-center">
          <div className="flex flex-col items-start">
            <div className="ml-0">{investment?.name}</div>
          </div>
        </li>

        <li className="flex items-center">
          <div className="flex flex-col items-end">
            <span className="mr-0">{`Date Added: ${new Date(investment?.dateAdded).toLocaleDateString(
                                            "en-US",
                                            { year: "numeric", month: "long", day: "numeric" }
                                        )}`}</span>
            <span className="mr-0">{investment?.accountNumber}</span>
          </div>
        </li>
      </ul>
    ))
  )
}
                    <div className=" flex mt-4 mb-4 items-center flex-col items-start">
                            <Link href="/investments">
                              <button className="block  pb-2 py-2 pl-10 pr-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded">
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
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
              Weekly Spending
            </h5>

            {<WeeklySpendingChart transactions={allRecentTransactions} />}
          </div>
          <div className="w-full p-4 text-center overflow-scrollable  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
              Top Places
            </h5>
            <MerchantsHorizontalGraph transactions={allRecentTransactions} />
          </div>

          {/* Third Row - Two Cards Side by Side on Larger Screens */}
          <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                Spending Categories
              </h5>
              <CategoryDonutChart transactions={allRecentTransactions} />
            </div>

           

            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                New Card Title
              </h5>
            </div>
          </div>

          {/* Fourth Card */}

          {/* Fifth Row - Two More Cards */}
          <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                New Card Title
              </h5>
              {/* ... rest of the card's content ... */}
            </div>
            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                New Card Title
              </h5>
              {/* ... rest of the card's content ... */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </Layout>
  );
}
