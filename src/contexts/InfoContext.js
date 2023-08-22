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
  token: null,
  setToken: () => {},
});

export default InfoContext;
