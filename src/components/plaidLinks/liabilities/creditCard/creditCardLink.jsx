import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function CreditCardLink() {
  const [token, setToken] = useState(null);
  const [creditCard, setCreditCard] = useState(null);
  const { user } = useUser();
  const products = ["liabilities", "transactions"];
  const account_filters = {
    credit: {
      account_subtypes: ["credit card"],
    },
  };

  console.log(user?.id);

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/api/createlinktoken", {
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

  async function addCreditCard(){
    try{
      const response = await fetch("/api/addCreditCard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
    });

    if (!response.ok) {
        throw new Error("failed to get added credit card");
    }




    }catch(error){
      console.error(error);

    }
  }

  const onSuccess = useCallback(
    async (public_token) => {
      try {
        await fetch("/api/exchangePublicToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_token: public_token,
            userID: user?.id,
          }),
        });

        // if (!exchangeResponse.ok) {
        //   throw new Error("Failed to exchange public token.");
        // }
        console.log('add credit card')
        await addCreditCard();
        console.log('get added credit card')
        await getAddedCreditCard();
        // handleCreditCardOperations();
      } catch (error) {
        console.error(error.message);
      }
    },
    [user, addCreditCard, getAddedCreditCard]
  );


  
  
  
 
  // const getAddedCreditCard = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/getAddedCreditCard", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //       body: JSON.stringify({ userID: user?.id }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("failed to get added credit card");
  //     }

  //     const newCreditCard = await response.json();
  //     setCreditCard(newCreditCard);
  //     console.log("Received from API:", newCreditCard);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [user]);

  async function getAddedCreditCard() {
    try {
        const response = await fetch("/api/getAddedCreditCard", {
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

        const newCreditCard = await response.json();
        setCreditCard(newCreditCard);
        console.log("Received from API:", newCreditCard);
    } catch (error) {
        console.error(error);
    }
}

//   const handleCreditCardOperations = useCallback(async () => {
//     console.log('add credit card');
//      await addCreditCard();
//     console.log('get added credit card');
//      await getAddedCreditCard();
// }, [user, addCreditCard, getAddedCreditCard]);

 

//   useEffect(() => {
//     console.log('use effect')
//     addCreditCard()
//     getAddedCreditCard();
// }, []);

// useEffect(() => {
//   console.log('use effect');

//   const fetchData = async () => {
//       await addCreditCard();
//       await getAddedCreditCard();
//   };

//   fetchData();
// }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <>
      <button onClick={() => open()} disabled={!ready}>
        add credit card button
      </button>

      <br></br>

      {/* <button onClick={addCreditCard}>see added credit card details</button> */}

      <h2>Credit Card Details</h2>
      {creditCard &&
    creditCard.map((card) => (
        <div key={card.number}>
            <p>
                <strong>Name:</strong> {card.name}
            </p>
            <p>
                <strong>Number:</strong> {card.number}
            </p>
            <p>
                <strong>Current Balance:</strong> {card.currentBalance}
            </p>
            <p>
                <strong>Credit Limit:</strong> {card.creditLimit}
            </p>
        </div>
    ))}
    </>
  );
}
