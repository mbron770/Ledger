import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../../contexts/InfoContext";

export default function CheckingAccountLink() {
  const { setCheckingAccount, 
    setCheckingAccountTransactions, 
    setFetchedData, 
    token, 
    setToken } =
    useContext(InfoContext);
  const { user } = useUser();
  const products = ['auth', 'transactions'];
  const account_filters = {
    depository: {
      account_subtypes: ["checking"],
    },
  };
  console.log(user?.id);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/api/plaidTokens/createlinktoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, account_filters }),
      });
      const { link_token } = await res.json();

      setToken(link_token);
    };
    createLinkToken();
  }, [user]);

  const onSuccess = useCallback(
    async (public_token) => {
      try {
        await fetch("/api/plaidTokens/exchangePublicToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_token: public_token,
            userID: user?.id,
          }),
        });

        console.log("add checking account");
        await addCheckingAccount();
        console.log("get added checking account");
        await getAddedCheckingAccount();
        console.log("get transactions");
        await getTransactions();
        console.log("display transactions");
        await displayTransactions();
        setFetchedData(true);
      } catch (error) {
        console.error(error.message);
      }
    },
    [
      user,
      addCheckingAccount,
      getAddedCheckingAccount,
      getTransactions,
      displayTransactions,
      setFetchedData,
    ]
  );

  async function addCheckingAccount() {
    try {
      const response = await fetch(
        "/api/bankAccounts/checkingAccount/addCheckingAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({ userID: user?.id }),
        }
      );

      if (!response.ok) {
        throw new Error("failed to get added checking account");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddedCheckingAccount() {
    try {
      const response = await fetch(
        "/api/bankAccounts/checkingAccount/getAddedCheckingAccount",
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
        throw new Error("failed to get added checking account");
      }

      const newCheckingAccount = await response.json();
      setCheckingAccount(newCheckingAccount);
      console.log("Received from API:", newCheckingAccount);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await fetch(
        "/api/bankAccounts/checkingAccount/getCheckingAccountTransactions",
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
        throw new Error("failed to get transactions");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function displayTransactions() {
    try {
      const response = await fetch(
        "/api/bankAccounts/checkingAccount/displayCheckingAccountTransactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },

          body: JSON.stringify({ userID: user?.id }),
        }
      );

      if (!response.ok) {
        throw new Error("failed to add transactions");
      }

      const newCheckingAccountTransactions = await response.json();
      setCheckingAccountTransactions(newCheckingAccountTransactions);
    } catch (error) {
      console.error(error);
    }
  }

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <>
       <button
        onClick={() => open()}
        disabled={!ready}
        type="button"
        className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5  mb-3"
      >
        Add Checking Account
      </button>
    </>
  );
}
