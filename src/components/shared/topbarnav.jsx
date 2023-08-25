import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { useUser } from "@clerk/nextjs";

export default function NavBar() {
  const [openSideBar, setOpenSideBar] = useState(false);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 500) {
        setOpenSideBar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    // <nav className="fixed top-0 left-0 right-0 z-50 h-[25vh] bg-custom-gray border-gray-200">
      <nav className="fixed top-0 left-0 right-0 z-50 h-[25vh] bg-custom-gray border-gray-200">
    
      <div className="absolute top-[10vh] w-full h-[.5px] ">



      </div>

      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 space-x-4">
    {/* Grouping Logo */}
    <div className="flex-shrink-0">
        <a href="https://flowbite.com/" className="flex items-center">
            <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-calibri whitespace-nowrap dark:text-white">
                Flowbite
            </span>
        </a>
    </div>

    {/* Navigation Items for desktop */}
    <div className="hidden xl:flex lg:flex" id="navbar-desktop">
        <ul className="flex space-x-2 font-medium bg-emerald-500">
        <li>
                    <Link href="/dashboard" className="block py-2 pl-3 pr-4 text-white rounded">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/checking" className="block py-2 pl-3 pr-4 text-white rounded">
                        Checking Accounts
                    </Link>
                </li>
                <li>
                    <Link href="/savings" className="block py-2 pl-3 pr-4 text-white rounded">
                        Savings Accounts
                    </Link>
                </li>
                <li>
                    <Link href="/creditcards" className="block py-2 pl-3 pr-4 text-white rounded">
                        Credit Cards
                    </Link>
                </li>
                <li>
                    <Link href="/loans" className="block py-2 pl-3 pr-4 text-white rounded">
                        Loans
                    </Link>
                </li>
                <li>
                    <Link href="/investments" className="block py-2 pl-3 pr-4 text-white rounded">
                        Investments
                    </Link>
                </li>
                <li>
                    <Link href="/budgets" className="block py-2 pl-3 pr-4 text-white rounded">
                        Budget
                    </Link>
                </li>
        </ul>
    </div>

    {/* User Actions */}
    <div className="flex items-center space-x-2 md:space-x-4">
        <button
            onClick={toggleSideBar}
            type="button"
            className="inline-flex items-center mr-2 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  "
        >
            <span className="sr-only">Open main menu</span>
            <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
            >
                <path
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                />
            </svg>
        </button>
        <UserButton afterSignOutUrl="/" />
        <p className="block py-2 pl-2 pr- text-white rounded">
            My Account
        </p>
    </div>
</div>


      {/* Navigation Items for mobile */}
      <div
        className={`transition-transform  transform ml-4  mr-4  ${openSideBar ? 'block' : 'hidden'}`}
        id="navbar-mobile"
      >
        <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-emerald-500">
        <li>
               


               <Link href="/dashboard" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Dashboard</Link>


             </li>
             <li>
             <Link href="/checking" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Checking Accounts</Link>

             </li>
             <li>
             <Link href="/savings" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Savings Accounts</Link>
             </li>
             <li>
             <Link href="/creditcards" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Credit Cards</Link>
             </li>
             <li>
             <Link href="/loans" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Loans</Link>
             </li>
             <li>
             <Link href="/investments" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Investments</Link>
             </li>


             <li>
             <Link href="/budgets" className="block py-2 pl-3 pr-4 text-white rounded"
             
             >Budget</Link></li>
        </ul>
      </div>

    </nav>
  );
}





