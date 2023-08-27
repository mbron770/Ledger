import NavBar from "../components/shared/topbarnav";
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
  const { user } = useUser();
  console.log(user?.id);

  useEffect(() => {
    const fetchAllRecentTransactions = async () => {
      try {
        const response = await fetch(
          "/api/liabilities/creditCard/recentTransactions",
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

  console.log(allRecentTransactions);

  return (
    <Layout className="bg-sky-100 min-h-[100vh]">
      {/* <div className="relative bg-sky-100 min-h-[100vh] overflow-x-auto"> */}
      {/* <div className="relative bg-sky-100 pt-[25vh] h-full w-screen "> */}

      <div className="lg:mb-[10vh] px-4 lg:px-[10vw]  pt-[30vh] flex flex-col lg:flex-row items-start lg:space-x-8">
        {/* Side Card */}
        <div className="lg:ml-8 lg:order-1 md:ml-0 md:order-none w-full lg:w-[30vw] h-[80vh] p-6 mt-8 lg:mt-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl text-center font-bold text-gray-900 dark:text-white">
            Recent Transactions
          </h5>

          <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-[60vh]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                {allRecentTransactions &&
                  allRecentTransactions.map((transaction) => (
                    <tr
                      key={transaction.date}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div>{transaction.name}</div>
                        <div>{`$${transaction.amount}`}</div>
                        <div>
                          {new Date(transaction.date).toLocaleDateString(
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

        {/* Main Cards Container */}
        <div className="w-full   flex flex-col space-y-8  lg:h-[70vh]">
          {/* First Card */}
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                className="flex flex-col sm:flex-row items-center  justify-between bg-sky-500 text-left text-white px-4 py-2"
              >
                Checking and Savings
                <div className="flex items-center space-x-2">
                  <span>$10000</span>
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
                <div
                  id="dropdown"
                  className=" w-full bg-white divide-y divide-gray-100 dark:bg-gray-700"
                >
                  <div
                    id="dropdown"
                    className=" w-[30vw] bg-white divide-y divide-gray-100 dark:bg-gray-700 mx-auto"
                  >
                    <ul
                      className="flex items-center space-x-2 py-2 text-sm text-white w-full"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li class="flex justify-between w-full px-2">
                        <div class="flex flex-col">
                          <span className="ml-2">Dashboard</span>
                          <span className="ml-2">balance</span>
                          <Link
                            href="/checking"
                            className="block py-2 pl-3 pr-4 text-white rounded"
                          >
                            Connect A Checking Account
                          </Link>
                          <Link
                            href="/savings"
                            className="block py-2 pl-3 pr-4 text-white rounded"
                          >
                            Connect A Savings Account
                          </Link>
                        </div>

                        <div class="flex flex-col">
                          <span className="mr-2">bank</span>
                          <span className="mr-2">updated</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  setShowDropdown(
                    showDropdown !== "Credit Cards" ? "Credit Cards" : null
                  )
                }
                className="flex flex-col sm:flex-row items-center justify-between w-full bg-sky-500 text-left text-white px-4 py-2"
              >
                Credit Cards
                <div className="flex items-center space-x-2">
                  <span>$10000</span>
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
                <div
                  id="dropdown"
                  className="w-full bg-white divide-y divide-gray-100 dark:bg-gray-700"
                >
                  <div
                    id="dropdown"
                    className="w-[30vw] bg-white divide-y divide-gray-100 dark:bg-gray-700 mx-auto"
                  >
                    <ul
                      className="flex items-center space-x-2 py-2 text-sm text-white w-full"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li class="flex justify-between w-full px-2">
                        <div class="flex flex-col">
                          <span className="ml-2">Dashboard</span>
                          <span className="ml-2">balance</span>
                          <Link
                            href="/creditcards"
                            className="block py-2 pl-3 pr-4 text-white rounded"
                          >
                            Connect A Credit Card
                          </Link>
                        </div>

                        <div class="flex flex-col">
                          <span className="mr-2">bank</span>
                          <span className="mr-2">updated</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  setShowDropdown(showDropdown !== "Loans" ? "Loans" : null)
                }
                className="flex flex-col sm:flex-row items-center justify-between w-full bg-sky-500 text-left text-white px-4 py-2"
              >
                Loans
                <div className="flex items-center space-x-2">
                  <span>$10000</span>
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
                <div
                  id="dropdown"
                  className="w-full bg-white divide-y divide-gray-100 dark:bg-gray-700"
                >
                  <div
                    id="dropdown"
                    className="w-[30vw] bg-white divide-y divide-gray-100 dark:bg-gray-700 mx-auto"
                  >
                    <ul
                      className="flex items-center space-x-2 py-2 text-sm text-white w-full"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li class="flex justify-between w-full px-2">
                        <div class="flex flex-col">
                          <span className="ml-2">Dashboard</span>
                          <span className="ml-2">balance</span>
                          <Link
                            href="/loans"
                            className="block py-2 pl-3 pr-4 text-white rounded"
                          >
                            Connect A Loan
                          </Link>
                        </div>

                        <div class="flex flex-col">
                          <span className="mr-2">bank</span>
                          <span className="mr-2">updated</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  setShowDropdown(
                    showDropdown !== "Investments" ? "Investments" : null
                  )
                }
                className="flex flex-col sm:flex-row items-center justify-between w-full bg-sky-500 text-left text-white px-4 py-2"
              >
                Investments
                <div className="flex items-center space-x-2">
                  <span>$10000</span>
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
                <div
                  id="dropdown"
                  className="w-full  bg-white divide-y divide-gray-100 dark:bg-gray-700"
                >
                  <div
                    id="dropdown"
                    className="w-[30vw] bg-white divide-y divide-gray-100 dark:bg-gray-700 mx-auto"
                  >
                    <ul
                      className="flex items-center space-x-2 py-2 text-sm text-white w-full"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li class="flex justify-between w-full px-2">
                        <div class="flex flex-col">
                          <span className="ml-2">Dashboard</span>
                          <span className="ml-2">balance</span>
                          <Link
                            href="/investments"
                            className="block py-2 pl-3 pr-4 text-white rounded"
                          >
                            Connect Investments
                          </Link>
                        </div>

                        <div class="flex flex-col">
                          <span className="mr-2">bank</span>
                          <span className="mr-2">updated</span>
                        </div>
                      </li>
                    </ul>
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

            {/* <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                New Card Title
              </h5>
              <MerchantsHorizontalGraph transactions={allRecentTransactions}/>
            </div>
          </div> */}

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
