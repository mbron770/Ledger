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
    <div style={styles}>
      <SignIn
        afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}

        // afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
      />
      ;
    </div>
  );
}

// import { SignIn } from "@clerk/nextjs";

// const SignInPage = () => (
//   <div style={styles}>
//     <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
//   </div>
// );

// export default SignInPage;
