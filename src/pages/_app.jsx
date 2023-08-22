import { ClerkProvider, useUser } from "@clerk/nextjs";
import { InfoProvider } from "../contexts/InfoProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} user={useUser}>
      <InfoProvider>
        <Component {...pageProps} user={useUser} />
      </InfoProvider>
    </ClerkProvider>
  );
}

export default MyApp;
