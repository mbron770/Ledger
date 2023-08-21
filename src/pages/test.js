import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export default function Test(){
    const { user } = useUser()
    useEffect(() => {
    fetch('/api/transactions', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({userID: user?.id})
    })
  }, [user])

    return(
        <>

        <h1>test page</h1>
        </>
    )
}