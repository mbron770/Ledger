import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../../contexts/InfoContext";

export default function SavingsAccountLink() {
  const { setSavingsAccount, 
    setSavingsAccountTransactions, 
    token, 
    setToken, 
    setFetchedData,
  
  
  } =
    useContext(InfoContext);
  const { user } = useUser();
  const products = ['auth', 'transactions'];
  const account_filters = {
    depository: {
      account_subtypes: ["savings"],
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

        console.log("add Savings account");
        await addSavingsAccount();
        console.log("get added Savings account");
        await getAddedSavingsAccount();
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
      addSavingsAccount,
      getAddedSavingsAccount,
      getTransactions,
      displayTransactions, 
      setFetchedData, 
    ]
  );

  async function addSavingsAccount() {
    try {
      const response = await fetch(
        "/api/bankAccounts/savingsAccount/addSavingsAccount",
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
        throw new Error("failed to get added Savings account");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddedSavingsAccount() {
    try {
      const response = await fetch(
        "/api/bankAccounts/savingsAccount/getAddedSavingsAccount",
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
        throw new Error("failed to get added savings account");
      }

      const newSavingsAccount = await response.json();
      setSavingsAccount(newSavingsAccount);
      console.log("Received from API:", newSavingsAccount);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await fetch(
        "/api/bankAccounts/savingsAccount/getSavingsAccountTransactions",
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
        "/api/bankAccounts/savingsAccount/displaySavingsAccountTransactions",
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

      const newSavingsAccountTransactions = await response.json();
      setSavingsAccountTransactions(newSavingsAccountTransactions);
      console.log("recieved from api: ", newSavingsAccountTransactions);
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
        className="text-white mt-3 bg-black hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  mb-3"
      >
        Connect a Savings Account Through Plaid
      </button>
    </>
  );
}
