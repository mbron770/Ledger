import {useState} from "react";
import {useSignIn} from "@clerk/nextjs";
import {useRouter} from 'next/router'
import Link from "next/link";

export default function DemoButton({className, text}) {
    const [email, setEmail] = useState('demo@demo.com')
    const [password, setPassword] = useState('demo')
    const router = useRouter()
    const {isLoaded, signIn, setActive} = useSignIn();

    if (!isLoaded) {
        return null
    }

    async function demoSignIn(e) {
        e.preventDefault()
        await signIn.create({identifier: email, password}).then((result) => {
            if (result.status === 'complete') {
                console.log(result)
                setActive({session: result.createdSessionId})
                router.push('/dashboard')
            } else {
                console.log(result)
            }
        }).catch((error) => console.error('error', error.errors[0].longMessage))
    }

    return (
        <>
            <form onSubmit={demoSignIn}>

            <button
        type="submit"
        className={`${className}`}

      >
        {text}
      </button>
            </form>
        </>
    )


}
