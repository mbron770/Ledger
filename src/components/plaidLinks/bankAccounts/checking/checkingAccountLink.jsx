import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../../contexts/InfoContext";

export default function CheckingAccountLink() {
  const { setCheckingAccount, setCheckingAccountTransactions, token, setToken } =
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
      } catch (error) {
        console.error(error.message);
      }
    },
    [
      user,
      addCheckingAccount,
      getAddedCheckingAccount,
      getTransactions,
      displayTransactions
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
      console.log("recieved from api: ", newCheckingAccountTransactions);
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
        add checking account
      </button>
    </>
  );
}
