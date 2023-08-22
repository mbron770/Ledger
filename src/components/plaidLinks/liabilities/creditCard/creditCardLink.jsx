import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function CreditCardLink() {
  const [token, setToken] = useState(null);
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
  });


  // function click(){
  //   useEffect(() => {
  //       const createLinkToken = async () => {
  //         const res = await fetch("/api/liabilitiesAccountsAdded", {
  //           method: "POST",
  //           headers: {
  //               'Content-Type': 'application/json'
  //           }, 
  //           body: JSON.stringify({ userID: user?.id })
  //         });
  //       //   const { link_token } = await res.json();
          
  //       //   setToken(link_token);
  //       };
  //       createLinkToken();
  //     }, [user]);


  // }

  async function click() {
    const res = await fetch("/api/creditCard", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ userID: user?.id })
    });
    
    // If you want to do something with the response, add it here
    // const data = await res.json();
    // setSomeState(data); 
  }

  return(
    <>
    <button
        onClick={() => open()}
        disabled={!ready}
      >add credit card button</button>


      <br></br>

      <button
        onClick={() => click()}
      >see added liabilities</button>


    </>
  )



}
