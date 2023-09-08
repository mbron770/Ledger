import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import InfoContext from "../../../contexts/InfoContext";

// export default function IncomeLink() {
//   const { setIncome, token, setToken } = useContext(InfoContext);
//   // const { userToken, setUserToken } = useState(null);
//   const { user } = useUser();
//   const products = ["income_verification"];

//   console.log(user?.id);

//   const createUserToken = useCallback(async () => {
//     const res = await fetch("/api/plaidTokens/incomeLinkToken", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ products, user}),
//     });

//     const data = await res.json()
//     if(data && data.link_token){
//       setToken(data.linkToken)
//     }

//   }, [user]);

//   useEffect(() => {
//     createUserToken();
//   }, [createUserToken]);

//   const onSuccess = useCallback(
//     async (public_token) => {
//       try {
//         await fetch("/api/plaidTokens/exchangePublicToken", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             public_token: public_token,
//             userID: user?.id,
//           }),
//         });

//         console.log("add income");
//         await addIncome();
//         console.log("get added income");
//         await getAddedIncome();
//       } catch (error) {
//         console.error(error.message);
//       }
//     },
//     [user, addIncome, getAddedIncome]
//   );

//   async function addIncome() {
//     try {
//       const response = await fetch("/api/income/addIncome", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ userID: user?.id }),
//       });

//       if (!response.ok) {
//         throw new Error("failed to get added credit card");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function getAddedIncome() {
//     try {
//       const response = await fetch("/api/income/getIncome", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ userID: user?.id }),
//       });

//       if (!response.ok) {
//         throw new Error("failed to get added credit card");
//       }

//       const newIncome = await response.json();
//       setIncome(newIncome);
//       console.log("Received from API:", newIncome);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const { open, ready } = usePlaidLink({
//     token,
//     createUserToken,
//     onSuccess,
//   });

//   return (
//     <>
//        <button
//         onClick={() => open()}
//         disabled={!ready}
//         type="button"
//         className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-sm px-5 py-2.5  mb-3"
//       >
//         Add Job
//       </button>
//     </>
//   );
// }


export default function AddIncome() {

  const [addJob, setAddJob] = useState(false);

  const toggleButton = () => {
    setAddJob(!addJob);
  };
  
  return(
    <>
      <button 
        onClick={toggleButton}
        className="text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 mb-3"
        type="button">
        Add Job
      </button>

      {addJob && (
        <div 
          id="authentication-modal" 
          tabIndex="-1" 
          aria-hidden="true" 
          className="fixed top-20 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto flex items-center justify-center">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button 
                type="button" 
                onClick={toggleButton}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg 
                  className="w-3 h-3" 
                  aria-hidden="true" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 14 14">
                  <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="name@company.com" 
                      required />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="password" 
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your password
                    </label>
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="••••••••" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      required />
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="remember" 
                          type="checkbox" 
                          value="" 
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                          required />
                      </div>
                      <label 
                        htmlFor="remember" 
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <a 
                      href="#" 
                      className="text-sm text-blue-700 hover:underline dark:text-blue-500">
                      Lost Password?
                    </a>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Login to your account
                  </button>
                  
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? 
                    <a 
                      href="#" 
                      className="text-blue-700 hover:underline dark:text-blue-500">
                      Create account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
