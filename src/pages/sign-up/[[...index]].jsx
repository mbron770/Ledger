import { SignUp } from "@clerk/nextjs";
import DemoButton from "../../components/shared/demo/demoButton";

export default function Page() {
  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const signInStyles = {
    width: "100%",
    maxWidth: "400px", 
    padding: "1rem",
  };

  return (
    <div className="bg-custom-purple">
      <div style={containerStyles}>
        <div style={signInStyles}>
          <SignUp
            afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-custom-purple font-goldman text-lg font-thin normal-case",
              },
            }}
          />
        </div>

        <DemoButton text='Demo Instead?' className="rounded-md inline-flex items-center justify-center ml-3 px-20 py-3 text-custom-purple mt-3 font-thin font-goldman bg-blue-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl" />
      </div>
    </div>
  );
}



