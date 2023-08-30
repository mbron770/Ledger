import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../../contexts/InfoContext"

export default function LoanLink() {
  const { setLoan, 
    token,
    setFetchedData, 
    setToken } = useContext(InfoContext);
  const { user } = useUser();
  const products = ["liabilities"];
  const account_filters = {
    loan: {
      account_subtypes: [
        "auto",
        "business",
        "commercial",
        "construction",
        "consumer",
        "home equity",
        "loan",
        "mortgage",
        "line of credit",
        "student",
      ],
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

        console.log("add loan");
        await addLoan();
        console.log("get added loans");
        await getAddedLoan()
        setFetchedData(true);
      } catch (error) {
        console.error(error.message);
      }
    },
    [
      user,
      addLoan,
      getAddedLoan,
      setFetchedData,
    ]
  );

  async function addLoan() {
    try {
      const response = await fetch("/api/liabilities/loans/addLoan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      });

      if (!response.ok) {
        throw new Error("failed to get added credit card");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddedLoan() {
    try {
      const response = await fetch("/api/liabilities/loans/getAddedLoan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      });

      if (!response.ok) {
        throw new Error("failed to get added credit card");
      }

      const newLoan = await response.json();
      setLoan(newLoan);
      console.log("Received from API:", newLoan);
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
        Add Loan
      </button>
    </>
  );
}
