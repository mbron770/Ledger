import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../../contexts/InfoContext";

export default function CreditCardLink() {
  const {
    setCreditCard,
    creditCard,
    setFetchedData,
    setCreditCardTransactions,
    token,
    setToken,
  } = useContext(InfoContext);
  console.log(creditCard);
  const { user } = useUser();
  const products = ["liabilities", "transactions"];
  const account_filters = {
    credit: {
      account_subtypes: ["credit card"],
    },
  };

  console.log(creditCard);

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

        console.log("add credit card");
        await addCreditCard();
        console.log("get added credit card");
        await getAddedCreditCard();
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
      addCreditCard,
      getAddedCreditCard,
      getTransactions,
      displayTransactions,
      setFetchedData,
    ]
  );

  async function addCreditCard() {
    try {
      const response = await fetch(
        "/api/liabilities/creditCard/addCreditCard",
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
        throw new Error("failed to get added credit card");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddedCreditCard() {
    try {
      const response = await fetch(
        "/api/liabilities/creditCard/getAddedCreditCard",
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
        throw new Error("failed to get added credit card");
      }

      const newCreditCard = await response.json();
      setCreditCard(newCreditCard);
      console.log("Received from API:", newCreditCard);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await fetch(
        "/api/liabilities/creditCard/getCreditCardTransactions",
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
        "/api/liabilities/creditCard/displayCreditCardTransactions",
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
        throw new Error("failed to add transactions");
      }

      const newCreditCardTransactions = await response.json();
      setCreditCardTransactions(newCreditCardTransactions);
      console.log("recieved from api: ", newCreditCardTransactions);
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
        Connect a Credit Card Through Plaid
      </button>
    </>
  );
}
