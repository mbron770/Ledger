import { useState, useContext } from "react";
import InfoContext from "./InfoContext";

export const InfoProvider = ({ children }) => {
  const [creditCard, setCreditCard] = useState(null);
  const [creditCardTransactions, setCreditCardTransactions] = useState([]);
  const [checkingAccount, setCheckingAccount] = useState(null);
  const [checkingAccountTransactions, setCheckingAccountTransactions] =
    useState([]);

  const [savingsAccount, setSavingsAccount] = useState(null);
  const [savingsAccountTransactions, setSavingsAccountTransactions] =
      useState([]);

  const [token, setToken] = useState(null);

  return (
    <InfoContext.Provider
      value={{
        creditCard,
        setCreditCard,
        creditCardTransactions,
        setCreditCardTransactions,
        token,
        setToken,
        checkingAccount,
        setCheckingAccount,
        checkingAccountTransactions,
        setCheckingAccountTransactions,
        savingsAccount,
        setSavingsAccount,
        savingsAccountTransactions,
        setSavingsAccountTransactions,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
};

export const useInfo = () => {
  const context = useContext(InfoContext);
  if (context === undefined) {
    throw new Error("useInfo must be used within an info provider");
  }
  return context;
};
