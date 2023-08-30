import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const styles = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={styles} className='bg-custom-purple'>
      <SignUp
        afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL} appearance={{
          elements: {
            formButtonPrimary:
              "bg-custom-purple font-goldman text-lg font-thin normal-case",
              
          },
        }}
      />
    </div>
  );
}
