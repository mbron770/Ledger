import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import Router from "next/router";
import { useState, useEffect, useCallback, useContext } from "react";


import SavingsAccountLink from "../components/plaidLinks/bankAccounts/savings/savingsAccountLink";
import InvestmentAccountLink from '../components/plaidLinks/investments/investmentAccountLink';
import LoanLink from "../components/plaidLinks/liabilities/loans/loanLink"
import IncomeVerificationLink from '../components/plaidLinks/income/incomeVerificationLink'
import InfoContext from "../contexts/InfoContext";



export default function Home() {
  

  return (
    <>
      {/* <header>
        
        <UserButton afterSignOutUrl="/" />
      </header>

      <h1>homepage</h1>

      <Link style={{ 
            backgroundColor: 'blue', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px',
            textDecoration: 'none',
            cursor: 'pointer'
          }}href="/sign-in">
       
          Sign In
        
      </Link>



      <Link style={{ 
            backgroundColor: 'blue', 
            color: 'white', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px',
            textDecoration: 'none',
            cursor: 'pointer'
          }}href="/sign-in">
       
          Sign Up
        
      </Link> */}

<section className="bg-custom-purple">
<div className="grid max-w-screen-xl px-4 py-2 mx-auto lg:gap-8 xl:gap-0 py-12 lg:grid-cols-12">
        <p className='leading-none text-5xl whitespace-nowrap font-thin font-goldman text-white'>Ledger</p>
    </div>
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12">
      
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-9 text-4xl font-thin tracking-none leading-none md:text-5xl xl:text-6xl text-white font-goldman">A Comprehensive Personal Finace Tool</h1>
            <p className="max-w-2xl mb-6 font-thin text-white lg:mb-8 md:text-md lg:text-lg font-goldman">Track all of your spending, investments, loans, and assets.</p>
            
            <Link href="/sign-in" className="rounded-md inline-flex items-center justify-center px-7 py-3 text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-md">
                Sign In
                
            </Link>
            <Link href="/sign-up" className="ml-4 rounded-md inline-flex items-center justify-center px-7 py-3 text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-md">
                Sign Up
                
            </Link>
            <Link href="/sign-up" className="ml-4 rounded-md inline-flex items-center justify-center px-7 py-3 text-custom-purple mt-3 font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium  text-md">
                Demo
                
            </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://images.unsplash.com/photo-1669399213378-2853e748f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fDNkJTIwY2hhcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="mockup" />
        </div>                
    </div>
</section>

      

     
    </>
  );
}
