import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { WeeklySpendingChart } from "../../../components/graphs/weeklySpendingChart";
import { CategoryDonutChart } from "../../../components/graphs/categoryDonutChart";
import { MerchantsHorizontalGraph } from "../../../components/graphs/merchantsHorizontalGraph";
import TransactionsDisplayTable from "./transactionsDisplayTable";
import InvestmentTransactionsDisplayTable from "./investmentTransactionsTable";
import LoanDisplayTable from "./loanDisplayTable";

function FirstRow({ transactions, card, investmentTransactions }) {
  if (transactions && transactions.length > 0) {
    return (
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-[50vh]">
        <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
          Transactions
        </h5>
        <TransactionsDisplayTable transactions={transactions} />
      </div>
    );
  } else if (investmentTransactions && investmentTransactions.length > 0) {
    return (
      <div className="w-full p-4 bg-black  border  rounded-lg shadow-2xl   flex flex-col h-[50vh]">
        <h5 className="mb-2 text-2xl text-left font-bold  text-white">
          Investment Transactions
        </h5>
        <InvestmentTransactionsDisplayTable
          investmentTransactions={investmentTransactions}
        />
      </div>
    );
  } else {
    return (
      <div className="duration-300 hover:scale-105 hover:shadow-xl ease-in-out w-full p-4  text-white bg-black  rounded-lg shadow-2xl flex-col h-full">
        <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
          Loan Details
        </h5>
        <LoanDisplayTable card={card} />
      </div>
    );
  }
}

function SecondRow({ transactions, card, investmentTransactions }) {
  if (transactions && transactions.length > 0) {
    return (
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
          Weekly Spending
        </h5>
        {<WeeklySpendingChart transactions={transactions} />}{" "}
      </div>
    );
  }
}

function ThirdRow({ transactions, card, investmentTransactions }) {
  return (
    <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      {transactions ? (
        <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
            Spending Categories
          </h5>
          <CategoryDonutChart transactions={transactions} />
        </div>
      ) : null}
      {transactions ? (
        <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
            Account Info
          </h5>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full mt-4 text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {card?.name}{" "}
                  </th>
                </tr>
                {card?.currentBalance ? (
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`Current Balance: $${card?.currentBalance}`}{" "}
                    </th>
                  </tr>
                ) : null}
                {card?.creditLimit ? (
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`Credit Limit: $${card?.creditLimit}`}{" "}
                    </th>
                  </tr>
                ) : null}

                <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {`Date Added: ${new Date(
                      card?.dateAdded
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}{" "}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}{" "}
    </div>
  );
}

function FourthRow({ transactions, card, investmentTransactions }) {
  return (
    <>
      {" "}
      {transactions ? (
        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
            Top Places
          </h5>
          <MerchantsHorizontalGraph transactions={transactions} />
        </div>
      ) : null}{" "}
    </>
  );
}

export default function MainPageDisplay({
  transactions,
  card,
  investmentTransactions,
}) {
  console.log(card);

  // HoldingsSchema = new mongoose.Schema({
  //     account_id: {type: String, required: true},
  //     cost_basis: {type: Number, required: true},
  //     institution_price: {type: Number, required: true},
  //     institution_value: {type: Number, required: true},
  //     cost_basis: {type: Number, required: true},
  //     quantity: {type: Number, required: true},
  //     institution_price_as_of: {type: String}

  // SecuritiesSchema = new mongoose.Schema({
  //     close_price: {type: Number},
  //     name: {type: String},
  //     type: { type: String},
  //     ticker_symbol: {type: String},

  return (
    <>
      {" "}
      {/* Main Cards Container */}
      <div className="flex-grow lg:flex-basis-0 w-full lg:w-2/3 flex flex-col space-y-4">
        {/* First Row */}
        <FirstRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
        />{" "}
        {/* Second Row */}
        <SecondRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
        />{" "}
        {/* Third Row */}
        <ThirdRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
        />{" "}
        {/* Fourth Row */}
        <FourthRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
        />
      </div>
    </>
  );
}
