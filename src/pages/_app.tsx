import { ClerkProvider, useUser } from "@clerk/nextjs";
import type { AppProps } from "next/app";
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} user = {useUser}>
      <Component {...pageProps} user = {useUser}/>
    </ClerkProvider>
  );
}
 
export default MyApp;
