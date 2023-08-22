import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function CreditCardLink() {
  const [token, setToken] = useState(null);
  const [creditCard, setCreditCard] = useState(null)
  const { user } = useUser();
  const products = ['liabilities', 'transactions']
  const account_filters = {
    credit: {
        account_subtypes: ['credit card']
    }}


  console.log(user?.id);


  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/api/createlinktoken", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({ products, account_filters })
      });
      const { link_token } = await res.json();
      
      setToken(link_token);
    };
    createLinkToken();
    
  }, [user]);



  const addCreditCard = useCallback(async () => {
    try {
      const response = await fetch("/api/addCreditCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ userID: user?.id }),
      });
  
      // if (!response.ok) {
      //   throw new Error("failed to get credit cards");
      // }
  
      // const newCreditCard = await response.json();
      // setCreditCard(newCreditCard);
      
      // console.log("Received from API:", newCreditCard);
  
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const getAddedCreditCard = useCallback(async () => {

    try{
      const response = await fetch('/api/getAddedCreditCard', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json', 
        }, 
        body: JSON.stringify({ userID: user?.id })

      })

      if(!response.ok){
        throw new Error('failed to get added credit card')
      }

      const newCreditCard = await response.json()
      setCreditCard(newCreditCard)
      console.log("Received from API:", newCreditCard)

    }catch(error){
      console.error(error)

    }





  }, [user])


  


  const onSuccess = useCallback(async (public_token) => {
    await fetch("/api/exchangePublicToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: public_token, 
      userID: user?.id }),
    });
    
    
    
    
  }, [user]);

 
  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
    addCreditCard,
    getAddedCreditCard,
  });

  return(
    <>
    <button
        onClick={() => open()}
        disabled={!ready}
      >add credit card button</button>


      <br></br>

      {/* <button onClick={addCreditCard}>see added credit card details</button> */}






<h2>Credit Card Details</h2>
{creditCard && (
  <div>
    <p><strong>Name:</strong> {creditCard.name}</p>
    <p><strong>Number:</strong> {creditCard.number}</p>
    <p><strong>Current Balance:</strong> {creditCard.currentBalance}</p>
    <p><strong>Credit Limit:</strong> {creditCard.creditLimit}</p>
  </div>
)}


    </>
  )



}
