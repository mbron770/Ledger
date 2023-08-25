import NavBar from "../components/shared/topbarnav";
import { useState } from "react";

export default function Loans() {
    const [showDropdown, setShowDropdown] = useState([]);

    return (
        <>
            <NavBar />
            {/* <div className="relative bg-sky-100 min-h-[100vh]"> */}
            <div className="relative bg-sky-100 pt-[25vh] h-full w-screen ">


            <div className="px-4  lg:px-[10vw] pt-[5vh] flex flex-col lg:flex-row items-start lg:space-x-16">

                    {/* Side Card */}
                    <div className="mb-8 w-full lg:w-[20vw] h-[70vh] p-6 mt-8 lg:mt-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        {/* ... content for the side card ... */}
                    </div>

                    {/* Main Cards Container */}
                    <div className="w-full lg:w-[70vw] flex flex-col space-y-8  lg:h-[60vh]">
                        
                        {/* First Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                Accounts
                            </h5>
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Second Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                New Card Title
                            </h5>
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Third Row - Two Cards Side by Side on Larger Screens */}
                        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                        </div>

                        {/* Fourth Card */}
                        <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                Another Wide Card
                            </h5>
                            {/* ... rest of the card's content ... */}
                        </div>

                        {/* Fifth Row - Two More Cards */}
                        <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                            <div className="w-full md:w-[50%] p-4 text-center bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h5 className="mb-2 text-2xl text-left font-bold text-gray-900 dark:text-white">
                                    New Card Title
                                </h5>
                                {/* ... rest of the card's content ... */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
