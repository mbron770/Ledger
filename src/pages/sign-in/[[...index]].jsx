import { SignIn } from "@clerk/nextjs";

export default function Page() {

  const styles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (

    <>
    <div className="bg-custom-purple">
   <div style={styles}>
     <SignIn afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL} appearance={{
          elements: {
            formButtonPrimary:
              "bg-custom-purple font-goldman text-lg font-thin normal-case",
              
          },
        }}/>
   </div>



  </div>
    
    
    
    </>
  );
}
