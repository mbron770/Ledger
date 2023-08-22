import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function LiabilitiesLink() {
  const [token, setToken] = useState(null);
  const { user } = useUser();
  const products = ['liabilities']
  console.log(user?.id);


  

//   function click(){
//     useEffect(() => {
//         const createLinkToken = async () => {
//           const res = await fetch("/api/liabilitiesAccountsAdded", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             }, 
//             body: JSON.stringify({ user })
//           });
//         //   const { link_token } = await res.json();
          
//         //   setToken(link_token);
//         };
//         createLinkToken();
//       }, [user]);


//   }


//   const onSuccess = useCallback(async (public_token) => {
//     await fetch("/api/exchangePublicToken", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ public_token: public_token, 
//       userID: user?.id }),
//     });
//   }, [user]);


//   const { open, ready } = usePlaidLink({
//     token,
//     onSuccess,
//   });

  return(
    <>
    {/* <button
        onClick={() => click()}
      >see added liabilities</button> */}


    </>
  )



}
