import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import CreditCardLink from "../components/plaidLinks/liabilities/creditCard/creditCardLink";
import CheckingAccountLink from "../components/plaidLinks/bankAccounts/checking/checkingAccountLink";
import SavingsAccountLink from "../components/plaidLinks/bankAccounts/savings/savingsAccountLink";
import InvestmentAccountLink from '../components/plaidLinks/investments/investmentAccountLink';
import InfoContext from "../contexts/InfoContext";


export default function Home() {
  const {
    creditCard,
    checkingAccount,
    creditCardTransactions,
    checkingAccountTransactions,
    savingsAccount,
    savingsAccountTransactions,
    investmentAccount,
    investmentAccountTransactions,
  } = useContext(InfoContext);

  return (
    <>
      <header>
        <UserButton afterSignOutUrl="/" />
      </header>

      <h1>homepage</h1>

      {/* <CreditCardLink /> */}

      <h2>Credit Card Details</h2>
      {creditCard &&
        creditCard.map((card) => (
          <div key={card.number}>
            <p>
              <strong>Name:</strong> {card.name}
            </p>
            <p>
              <strong>Number:</strong> {card.number}
            </p>
            <p>
              <strong>Current Balance:</strong> {card.currentBalance}
            </p>
            <p>
              <strong>Credit Limit:</strong> {card.creditLimit}
            </p>
          </div>
        ))}

      <h2>Credit Card Transactions</h2>

      {creditCardTransactions &&
        creditCardTransactions.map((transaction) => (
          <div key={transaction.name}>
            <h1>date: {transaction.date}</h1>
            <h1>name: {transaction.name}</h1>
            <h1>category: {transaction.category}</h1>
            <h1>paymentChannel: {transaction.paymentChannel}</h1>
            <h1>amount: {transaction.amount}</h1>
            <h1>pending: {transaction.pending}</h1>
          </div>
        ))}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <CheckingAccountLink/> */}

      <h2>Checking Account Details</h2>
      {checkingAccount &&
        checkingAccount.map((account) => (
          <div key={account.accountNumber}>
            <p>
              <strong>Name:</strong> {account.name}
            </p>
            <p>
              <strong>Account Number:</strong> {account.accountNumber}
            </p>
            <p>
              <strong>Balance:</strong> {account.balance}
            </p>
          </div>
        ))}

      <h2>Checking Account Transactions</h2>
      {checkingAccountTransactions &&
        checkingAccountTransactions.map((transaction) => (
          <div key={transaction.name}>
            <h1>date: {transaction.date}</h1>
            <h1>name: {transaction.name}</h1>
            <h1>category: {transaction.category}</h1>
            <h1>paymentChannel: {transaction.paymentChannel}</h1>
            <h1>amount: {transaction.amount}</h1>
            <h1>pending: {transaction.pending}</h1>
          </div>
        ))}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <SavingsAccountLink /> */}

      <h2>Savings Account Details</h2>
      {savingsAccount &&
        savingsAccount.map((account) => (
          <div key={account.accountNumber}>
            <p>
              <strong>Name:</strong> {account.name}
            </p>
            <p>
              <strong>Account Number:</strong> {account.accountNumber}
            </p>
            <p>
              <strong>Balance:</strong> {account.balance}
            </p>
          </div>
        ))}

      <h2>Savings Account Transactions</h2>
      {savingsAccountTransactions &&
        savingsAccountTransactions.map((transaction) => (
          <div key={transaction.name}>
            <h1>date: {transaction.date}</h1>
            <h1>name: {transaction.name}</h1>
            <h1>category: {transaction.category}</h1>
            <h1>paymentChannel: {transaction.paymentChannel}</h1>
            <h1>amount: {transaction.amount}</h1>
            <h1>pending: {transaction.pending}</h1>
          </div>
        ))}

<br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


<InvestmentAccountLink/>



<h2>Investment Account Details</h2>
{investmentAccount &&
        investmentAccount.map((iAccount) => (
          <div key={iAccount.accountNumber}>
            <p>
              <strong>Name:</strong> {iAccount.name}
            </p>
            <p>
              <strong>Account Number:</strong> {iAccount.accountNumber}
            </p>
            <p>
              <strong>Balance:</strong> {iAccount.balance}
            </p>
          </div>
        ))}


<h2>Investment Account Transactions</h2>
      {/* {savingsAccountTransactions &&
        savingsAccountTransactions.map((transaction) => (
          <div key={transaction.name}>
            <h1>date: {transaction.date}</h1>
            <h1>name: {transaction.name}</h1>
            <h1>category: {transaction.category}</h1>
            <h1>paymentChannel: {transaction.paymentChannel}</h1>
            <h1>amount: {transaction.amount}</h1>
            <h1>pending: {transaction.pending}</h1>
          </div>
        ))} */}



  
    </>
  );
}
