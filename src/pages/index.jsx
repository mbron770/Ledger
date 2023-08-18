import Image from 'next/image'

import { UserButton } from "@clerk/nextjs";




import Router from "next/router";
import { useState, useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

export default function Home() {
  const [token, setToken] = useState(null);

  

  useEffect(() => {
    const createLinkToken = async () => {
      const res = await fetch("/api/createlinktoken", {
        method: "POST",
      });
      const { link_token } = await res.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token) => {
    await fetch("/api/exchangepublic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token: public_token }),
    });
    // Router.push("/api/transactions");
  }, []);

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });


  // import { useUser } from "@clerk/clerk-react";

// function YourComponent() {
//   const { user } = useUser();

//   // Then when making the API request:
//   fetch('/api/yourApiRoute', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Clerk-User-Id': user.id
//     },
//     body: JSON.stringify({ public_token: yourPublicToken }),
//   });
// }

  return (
    <>
    <header>
				<UserButton afterSignOutUrl="/"/>
			</header>

    <h1>homepage</h1>
      <button
        onClick={() => open()}
        disabled={!ready}
      >click me</button>
    </>
  );
}
