import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from '../../../../contexts/InfoContext'

export default function LoanLink() {
  const { setLoan, token, setToken } = useContext(InfoContext);
  const { user } = useUser();
  const products = ["liabilities"];
  const account_filters = {
    loan: {
      account_subtypes: ["auto", "business", "commercial", "construction", "consumer", "home equity", "loan", "mortgage", "line of credit", "student"],
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

        console.log("add credit card");
        await addLoan();
        console.log("get added credit card");
        // await getAddedLoan();
        console.log("get transactions");
        // await getTransactions();
        console.log("display transactions");
        // await displayTransactions();
      } catch (error) {
        console.error(error.message);
      }
    },
    [
      user,
      addLoan,
      // getAddedLoan,
      // getTransactions,
      // displayTransactions,
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

  async function getTransactions() {
    try {
      const response = await fetch("/api/liabilities/Loan/getLoanTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      });

      if (!response.ok) {
        throw new Error("failed to get transactions");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function displayTransactions() {
    try {
      const response = await fetch("/api/liabilities/Loan/displayLoanTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({ userID: user?.id }),
      });

      if (!response.ok) {
        throw new Error("failed to add transactions");
      }

      const newLoanTransactions = await response.json();
      setLoanTransactions(newLoanTransactions);
      console.log("recieved from api: ", newLoanTransactions);
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
      <button onClick={() => open()} disabled={!ready}>
        add loan button
      </button>

      

    



    </>
  );
}
