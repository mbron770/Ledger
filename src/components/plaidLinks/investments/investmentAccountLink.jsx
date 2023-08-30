import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../contexts/InfoContext";

export default function InvestmentAccountLink() {
  const {
    setInvestmentAccount,
    setInvestmentAccountTransactions,
    token,
    setToken,
    setFetchedData,
  } = useContext(InfoContext);
  const { user } = useUser();
  const products = ["investments", "transactions"];
  const account_filters = {
    investment: {
      account_subtypes: [
        "529",
        "401a",
        "401k",
        "403B",
        "457b",
        "brokerage",
        "cash isa",
        "crypto exchange",
        "education savings account",
        "fixed annuity",
        "gic",
        "health reimbursement arrangement",
        "hsa",
        "ira",
        "isa",
        "keogh",
        "lif",
        "life insurance",
        "lira",
        "lrif",
        "lrsp",
        "mutual fund",
        "non-custodial wallet",
        "non-taxable brokerage account",
        "other",
        "other annuity",
        "other insurance",
        "pension",
        "prif",
        "profit sharing plan",
        "qshr",
        "rdsp",
        "resp",
        "retirement",
        "rlif",
        "roth",
        "roth 401k",
        "rrif",
        "rrsp",
        "sarsep",
        "sep ira",
        "simple ira",
        "sipp",
        "stock plan",
        "tfsa",
        "trust",
        "ugma",
        "utma",
        "variable annuity",
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

        console.log("add Investment account");
        await addInvestmentAccount();
        console.log("get added Investment account");
        await getAddedInvestmentAccount();
        console.log("get transactions");
        await getTransactions();
        console.log("display transactions");
        await displayTransactions();
        setFetchedData()

      } catch (error) {
        console.error(error.message);
      }
    },
    [
      user,
      addInvestmentAccount,
      getAddedInvestmentAccount,
      getTransactions,
      displayTransactions,
      setFetchedData
    ]
  );

  async function addInvestmentAccount() {
    try {
      const response = await fetch("/api/investments/addInvestmentAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      });

      if (!response.ok) {
        throw new Error("failed to get added Investment account");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddedInvestmentAccount() {
    try {
      const response = await fetch(
        "/api/investments/getAddedInvestmentAccount",
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
        throw new Error("failed to get added Investment account");
      }

      const newInvestmentAccount = await response.json();
      setInvestmentAccount(newInvestmentAccount);
      console.log("Received from API:", newInvestmentAccount);
    } catch (error) {
      console.error(error);
    }
  }

  async function getTransactions() {
    try {
      const response = await fetch(
        "/api/investments/getInvestmentAccountTransactions",
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
        "/api/investments/displayInvestmentAccountTransactions",
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

      const newInvestmentAccountTransactions = await response.json();
      setInvestmentAccountTransactions(newInvestmentAccountTransactions);
      console.log("recieved from api: ", newInvestmentAccountTransactions);
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
        Add Investment
      </button>
    </>
  );
}
