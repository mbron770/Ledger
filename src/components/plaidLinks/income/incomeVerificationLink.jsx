import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../contexts/InfoContext";

export default function IncomeLink() {
  const { setIncome, token, setToken } = useContext(InfoContext);
  const { userToken, setUserToken } = useState(null)
  const { user } = useUser();
  const products = ["income_verification"];

  console.log(user?.id);

//   useEffect(() => {
//     const createUserForJob = async () => {
//       const res = await fetch("/api/plaidToken/createUser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userID: user?.id }),
//       });
//       const { newUserToken } = await res.json()
//       setUserToken(newUserToken);
//     };
//     createUserForJob();
//   }, [user]);

  useEffect(() => {
    
    const createLinkToken = async () => {
      const res = await fetch("/api/plaidTokens/incomeLinkToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products, user }),
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
            // public_token: public_token,
            // userID: user?.id,
          }),
        });

        console.log("add credit card");
        await addIncome();
        console.log("get added credit card");
        // await getAddedIncome();
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
        addIncome,
      //   getAddedIncome,
      // getTransactions,
      // displayTransactions,
    ]
  );

  async function addIncome() {
    try {
      const response = await fetch("/api/income/addIncome", {
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

  async function getAddedIncome() {
    try {
      const response = await fetch("/api/liabilities/Incomes/getAddedIncome", {
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

      const newIncome = await response.json();
      setIncome(newIncome);
      console.log("Received from API:", newIncome);
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
        add Income button
      </button>
    </>
  );
}
