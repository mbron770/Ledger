import Link from "next/link";
import DemoButton from "../components/shared/demo/demoButton";
import NavBar from "../components/shared/topbarnav";
import {useUser} from "@clerk/nextjs";


export default function Home() {
    const {user} = useUser();
    return (
        <>
        {user && user ? <NavBar/> : null}
            <section className="bg-custom-purple">
                <div className="grid max-w-screen-xl px-4 py-2 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
                    <p className="leading-none pt-7 text-5xl whitespace-nowrap font-thin font-goldman text-white">Ledger</p>
                </div>
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-10 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-9 text-4xl font-thin tracking-none leading-none md:text-5xl xl:text-6xl text-white font-goldman">A Comprehensive Personal Finance Tool</h1>
                        <p className="max-w-2xl mb-6 font-thin text-white lg:mb-8 md:text-md lg:text-lg font-goldman">Track all of your spending, investments, and loans. Create a personal budget</p>


                        <div className="flex flex-col items-center md:items-start justify-center space-y-4">
                            <DemoButton text="Demo" className="w-72 rounded-md inline-flex items-center justify-center px-20 py-3 text-custom-purple font-thin font-goldman bg-blue-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-300 text-xl"/>
                            <Link href="/sign-in" className="w-72 rounded-md inline-flex items-center justify-center px-20 py-3 text-custom-purple font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-md">
                                Sign In
                            </Link>
                            <Link href="/sign-up" className="w-72 rounded-md inline-flex items-center justify-center px-20 py-3 text-custom-purple font-thin font-goldman bg-custom-blue hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-md">
                                Sign Up
                            </Link>
                        </div>


                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="/heroBG.png" alt="heroBG"/>
                    </div>
                </div>
            </section>

            <section className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 flex flex-col md:flex-row items-start space-y-8 md:space-y-0 md:space-x-2 justify-between">

                    {/* Text on the left */}
                    <div className="flex flex-col justify-center text-center mb-8 md:mb-0 w-full md:w-2/5">
                        <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin tracking-none leading-snug text-custom-purple font-goldman">
                            Seamless Integration with Plaid
                        </h1>


                        <div className="flex items-center justify-center">

                            <img src="/connection.webp" alt="connection"/>
                        </div>
                    </div>


                    <div className="bg-custom-blue py-2 duration-300 hover:scale-105 hover:shadow-xl shadow-2xl p-8 md:p-12 w-full md:w-3/5 h-[450px]">
                        <h5 className=" font-thin text-xl text-center font-goldman text-custom-purple">
                            Instantly Connect Your Accounts
                        </h5>

                        <div className="flex items-center justify-center">
                            <h5 className="mt-8 mb-8 font-thin text-7xl text-center font-goldman text-custom-purple">
                                Ledger
                            </h5>

                        </div>
                        <div className="flex items-center justify-center">
                            <img className="w-64 h-auto mr-4" src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Plaid_logo.svg" alt="Plaid Logo"/>

                        </div>
                        <div className="flex items-center justify-center">
                            <h5 className="mt-8 font-thin text-7xl text-center font-goldman text-custom-purple">
                                Insight
                            </h5>

                        </div>


                    </div>

                </div>
            </section>

            <section className="bg-blue-300">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">

                    <h1 className="mb-4 text-4xl font-thin tracking-tight leading-none text-white md:text-5xl lg:text-6xl font-goldman">Fuse Your Finances</h1>
                    <p className="mb-8 text-lg text-white lg:text-xl sm:px-16 lg:px-48 font-goldman font-thin">Sync Checking, Savings, Credit Card, Loan, and Brokerage Accounts</p>

                    <div className="grid md:grid-cols-3 gap-8 mt-8">


                        <div className="bg-white  shadow-2xl p-8 md:p-12 duration-300 hover:scale-105 hover:shadow-xl">
                            <h5 className=" font-thin text-xl text-center font-goldman text-custom-purple">
                                Balances and Account Info
                            </h5>
                            <div className="flex items-center justify-center">

                                <img src="/info.png" alt="info"/>
                            </div>

                        </div>


                        <div className="bg-white  shadow-2xl p-8 md:p-12 duration-300 hover:scale-105 hover:shadow-xl">
                            <h5 className=" font-thin text-xl text-center font-goldman text-custom-purple">
                                Transaction Insight
                            </h5>
                            <div className="flex items-center justify-center">
                                <video loop autoPlay muted className="w-full max-w-md">
                                    <source src="/transactions.mp4" type="video/mp4"/>

                                </video>
                            </div>

                        </div>


                        <div className="bg-white  shadow-2xl p-8 md:p-12 duration-300 hover:scale-105 hover:shadow-xl">
                            <h5 className=" font-thin mb-5 text-xl text-center font-goldman text-custom-purple">
                                Generate Dynamic Graphs
                            </h5>
                            <div className="w-full h-full object-cover">
                                <img src="/graphs.gif" alt="Description of GIF"/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-green-100">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">

                    <h1 className="mb-4 text-4xl font-thin tracking-tight leading-none text-custom-purple md:text-5xl lg:text-6xl font-goldman">Keep The Growing Going</h1>


                    <p className="mb-8 text-lg text-custom-purple lg:text-xl sm:px-16 lg:px-48 font-goldman font-thin">Visualize Investment Account Transactions, Holdings, and Securities</p>


                    <div className="grid md:grid-cols-3 gap-8 mt-8">


                        <div className="md:col-span-2 bg-emerald-300 shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">


                            <video loop autoPlay muted className="w-full h-full object-cover">
                                <source src="/investmentsVid.mov" type="video/mp4"/>
                            </video>
                        </div>


                        <div className="bg-emerald-200  shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden p-8 md:p-12">
                            <div className="flex items-center justify-center">
                                <img src="/investments.webp" alt="Description of GIF"/>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-gray-50">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">

                    <h1 className="mb-4 text-4xl font-thin tracking-tight leading-none text-black md:text-5xl lg:text-6xl font-goldman">Don't Let Debt Upset</h1>


                    <p className="mb-8 text-lg text-black lg:text-xl sm:px-16 lg:px-48 font-goldman font-thin">Track Your Mortgage, Student Loan or any other Liability</p>

                    <div className="grid md:grid-cols-3 gap-8 mt-8">


                        <div className="bg-white  shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden p-8 md:p-12 order-last md:order-first">
                            <video loop autoPlay muted className="w-full h-full object-cover">
                                <source src="/loanVid.mp4" type="video/mp4"/>
                            </video>
                        </div>


                        <div className="md:col-span-2 bg-black  shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden p-8 md:p-12 order-first md:order-last">
                            <div className="flex items-center justify-center">
                                <video loop autoPlay muted className="w-full max-w-md">
                                    <source src="/debtVid.webm" type="video/webm"/>
                                </video>
                            </div>


                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-yellow-300">
                <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">

                    <h1 className="mb-4 text-4xl font-thin tracking-tight leading-none text-custom-purple md:text-5xl lg:text-6xl font-goldman">Budget Like a Boss</h1>


                    <p className="mb-8 text-lg text-custom-purple lg:text-xl sm:px-16 lg:px-48 font-goldman font-thin">Add your Job/Side Hustle Info along with your bills. Generate a budget.</p>

                    <div className="grid md:grid-cols-4 gap-8 mt-8">


                        <div className="md:col-span-3 bg-white shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden p-8 md:p-12">
                            <div className="flex items-center justify-center">
                                <video loop autoPlay muted className="w-full max-w-md">
                                    <source src="/budgetVid.mp4" type="video/mp4"/>
                                </video>
                            </div>
                        </div>


                        <div className="bg-white shadow-2xl duration-300 hover:scale-105 hover:shadow-xl overflow-hidden p-8 md:p-12">

                            <div className="flex items-center justify-center mt-10 mb-10">
                                <img src="/budgetPic.webp" alt="Description of GIF"/>
                            </div>

                        </div>

                    </div>
                </div>
            </section>


        </>
    );
}
