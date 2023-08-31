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
      if (window.innerWidth >= 768) {
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
    
    
      <nav className="fixed top-0 left-0 right-0 z-50 h-[15vh] bg-custom-purple ">
    
     

      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 space-x-4">
    
    <div className="flex-shrink-0">
        
        
            
            <Link href="/dashboard" className="block pl-3 pr-4 leading-none text-xl whitespace-nowrap font-goldman text-white">Ledger</Link>
        
        
    </div>

    {/* Navigation Items for desktop */}
    <div className="hidden lg:flex" id="navbar-desktop">
        <ul className="flex space-x-4 font-medium bg-custom-purple font-goldman text-sm">
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/dashboard" className="block pl-3 pr-4 text-white">Dashboard</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/checking" className="block pl-3 pr-4 text-white">Checking Accounts</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/savings" className="block pl-3 pr-4 text-white">Savings Accounts</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/creditcards" className="block pl-3 pr-4 text-white">Credit Cards</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/loans" className="block pl-3 pr-4 text-white">Loans</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/investments" className="block pl-3 pr-4 text-white">Investments</Link>
            </li>
            <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
                <Link href="/budgets" className="block pl-3 pr-4 text-white">Budget</Link>
            </li>
        </ul>
    </div>


    {/* User Actions */}
    <div className="flex items-center space-x-2 md:space-x-4">
        <button
            onClick={toggleSideBar}
            type="button"
            className="inline-flex items-center mr-2 p-2 w-10 h-full justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-white focus:outline-none focus:ring-2 focus:white"
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
        <p className="py-2 duration-300 hover:scale-105 hover:shadow-xl font-goldman text-sm text-white">
  My Account
</p>
        <UserButton afterSignOutUrl="/" />
        
    </div>
</div>


      {/* Navigation Items for mobile */}
      <div
      className={`transition-transform transform ml-4 mr-4 ${openSideBar ? 'block' : 'hidden'}`}
      id="navbar-mobile"
    >
      <ul className="flex flex-col font-medium p-4 mt-4 border rounded-lg bg-custom-purple font-goldman text-sm">
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/dashboard" className="block pl-3 pr-4 text-white">Dashboard</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/checking" className="block pl-3 pr-4 text-white">Checking Accounts</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/savings" className="block pl-3 pr-4 text-white">Savings Accounts</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/creditcards" className="block pl-3 pr-4 text-white">Credit Cards</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/loans" className="block pl-3 pr-4 text-white">Loans</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/investments" className="block pl-3 pr-4 text-white">Investments</Link>
        </li>
        <li className="py-2 duration-300 hover:scale-105 hover:shadow-xl">
          <Link href="/budgets" className="block pl-3 pr-4 text-white">Budget</Link>
        </li>
      </ul>
    </div>

    </nav>
    
  );
}





