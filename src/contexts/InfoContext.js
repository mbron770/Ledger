import { createContext } from "react";

const InfoContext = createContext({
  creditCard: null,
  setCreditCard: () => {},
  creditCardTransactions: () => {},
  setCreditCardTransactions: () => {},
  checkingAccount: null,
  setCheckingAccount: () => {},
  checkingAccountTransactions: () => {},
  setCheckingAccountTransactions: () => {},
  savingsAccount: null,
  setSavingsAccount: () => {},
  savingsAccountTransactions: () => {},
  setSavingsAccountTransactions: () => {},
  investmentAccount: null,
  setInvestmentAccount: () => {},
  investmentAccountTransactions: () => {},
  setInvestmentAccountTransactions: () => {},
  loan: null,
  setLoan: () => {},
  token: null,
  setToken: () => {},
});

export default InfoContext;
