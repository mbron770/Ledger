import { WeeklySpendingChart } from "../../../components/graphs/weeklySpendingChart";
import { CategoryDonutChart } from "../../../components/graphs/categoryDonutChart";
import { MerchantsHorizontalGraph } from "../../../components/graphs/merchantsHorizontalGraph";
import TransactionsDisplayTable from "./transactionsDisplayTable";
import InvestmentTransactionsDisplayTable from "./investmentTransactionsTable";
import InvestmentHoldingsDisplayTable from "./investmentHoldingsDisplayTable"
import InvestmentSecuritiesDisplayTable from "./investmentSecuritiesDisplayTable"
import LoanDisplayTable from "./loanDisplayTable";

export default function MainPageDisplay({
  transactions,
  card,
  investmentTransactions,
  holdings,
  securities
}) {
  
  return (
    <>
      {" "}
      {/* Main Cards Container */}
      <div className="flex-grow lg:flex-basis-0 w-full lg:w-2/3 flex flex-col space-y-4">
        {/* First Row */}

        <FirstRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
          holdings={holdings}
          securities={securities}
        />{" "}
        {/* Second Row */}
        <SecondRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
          holdings={holdings}
          securities={securities}
        />{" "}
        {/* Third Row */}
        <ThirdRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
          holdings={holdings}
          securities={securities}
        />{" "}
        {/* Fourth Row */}
        <FourthRow
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
          holdings={holdings}
          securities={securities}
        />
        
        <HoldingsAndSecurities
          transactions={transactions}
          card={card}
          investmentTransactions={investmentTransactions}
          holdings={holdings}
          securities={securities}
        />


      </div>
    </>
  );
}


function FirstRow({ transactions, card, investmentTransactions, holdings, securities }) {
  if (transactions && transactions?.length > 0) {
    return (
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4  shadow-2xl bg-white flex flex-col h-[50vh]">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Transactions
        </h5>
        <TransactionsDisplayTable transactions={transactions} />
      </div>
    );
  } else if (investmentTransactions && investmentTransactions?.length > 0) {
    return (
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4  shadow-2xl bg-white flex flex-col h-[50vh]">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Investment Transactions
        </h5>
        <InvestmentTransactionsDisplayTable
          investmentTransactions={investmentTransactions}
        />
      </div>
    );
  }else if(transactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4  shadow-2xl bg-white flex flex-col h-[50vh]">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Transactions
        </h5>
      </div>

    )
  } else if(investmentTransactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4  shadow-2xl bg-white flex flex-col h-[50vh]">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Investment Transactions
        </h5>
      </div>

    )
  }else if(card?.name === 'Plaid Mortgage' || card?.name === 'Plaid Student Loan'){
    return (
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 bg-white shadow-2xl bg-white flex flex-col h-[50vh]">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Loan Details
        </h5>
        <LoanDisplayTable card={card} />
      </div>
    );
  }
}

function SecondRow({ transactions, card, investmentTransactions, holdings, securities }) {
  if (transactions && transactions?.length > 0) {
    return (
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Weekly Spending
        </h5>
        {<WeeklySpendingChart transactions={transactions} />}{" "}
      </div>
    );
  } else if(investmentTransactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
        Weekly Investment Spending
        </h5>
        {
          
        }{" "}
      </div>

    )
  } else if (investmentTransactions && investmentTransactions?.length > 0) {
    return (
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Weekly Investment Spending
        </h5>
        {
          <WeeklySpendingChart
            investmentTransactions={investmentTransactions}
          />
        }{" "}
      </div>
    );
  }else if(investmentTransactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
        <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Weekly Investment Spending
        </h5>
        {
          
        }{" "}
      </div>

    )
  }
}

function ThirdRow({ transactions, card, investmentTransactions, holdings, securities }) {
  if (transactions && transactions.length > 0) {
    return (
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
          <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Spending Categories
          </h5>
          <CategoryDonutChart transactions={transactions} />
        </div>

        <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
          <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Account Info
          </h5>
          <div className="relative overflow-x-auto">
            <table className="w-full mt-4 text-sm text-left ">
              <tbody>
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-goldman whitespace-nowrap "
                  >
                    {card?.name}{" "}
                  </th>
                </tr>
                {card?.currentBalance ? (
                  <tr className="bg-custom-blue">
                    <th
                      scope="row"
                      className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                    >
                      {`Current Balance: $${card?.currentBalance}`}{" "}
                    </th>
                  </tr>
                ) : null}
                {card?.creditLimit ? (
                  <tr className="bg-custom-blue">
                    <th
                      scope="row"
                      className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                    >
                      {`Credit Limit: $${card?.creditLimit}`}{" "}
                    </th>
                  </tr>
                ) : null}

                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                    {`Date Added: ${new Date(
                      card?.dateAdded
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}{" "}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else if (transactions?.length == 0){
    return(
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
        <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Spending Categories
        </h5>
        
      </div>

      <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
        <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Account Info
        </h5>
        <div className="relative overflow-x-auto">
          <table className="w-full mt-4 text-sm text-left ">
            <tbody>
              <tr className="bg-custom-blue">
                <th
                  scope="row"
                  className="px-2 py-4 text-xs text-custom-purple font-goldman whitespace-nowrap "
                >
                  
                </th>
              </tr>
              
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                    
                  </th>
                </tr>
              
              
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                  
                  </th>
                </tr>
             

              <tr className="bg-custom-blue">
                <th
                  scope="row"
                  className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                >
                
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    )
  } else if(investmentTransactions && investmentTransactions.length > 0){
    return(
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
          <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Buy Vs Sell Vs Cash
          </h5>
          <CategoryDonutChart investmentTransactions={investmentTransactions} />
        </div>
        <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
          <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Investment Info
          </h5>
          <div className="relative overflow-x-auto">
            <table className="w-full mt-4 text-sm text-left ">
              <tbody>
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-goldman whitespace-nowrap "
                  >
                    {card?.name}{" "}
                  </th>
                </tr>
                
                  <tr className="bg-custom-blue">
                    <th
                      scope="row"
                      className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                    >
                      {`Balance: $${card?.currentBalance}`}{" "}
                    </th>
                  </tr>
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                    {`Date Added: ${new Date(
                      card?.dateAdded
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}{" "}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }else if (investmentTransactions?.length == 0){
    return(
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
        <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
        Buy Vs Sell Vs Cash
        </h5>
        
      </div>

      <div className="duration-300 hover:scale-105 hover:shadow-xl w-full md:w-[50%] p-4 text-center bg-white  shadow-2xl">
        <h5 className="mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
          Investment Info
        </h5>
        <div className="relative overflow-x-auto">
          <table className="w-full mt-4 text-sm text-left ">
            <tbody>
              <tr className="bg-custom-blue">
                <th
                  scope="row"
                  className="px-2 py-4 text-xs text-custom-purple font-goldman whitespace-nowrap "
                >
                  
                </th>
              </tr>
              
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                    
                  </th>
                </tr>
              
              
                <tr className="bg-custom-blue">
                  <th
                    scope="row"
                    className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                  >
                  
                  </th>
                </tr>
             

              <tr className="bg-custom-blue">
                <th
                  scope="row"
                  className="px-2 py-4 text-xs text-custom-purple font-thin font-goldman whitespace-nowrap "
                >
                
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    )
  }
  
}

function FourthRow({ transactions, card, investmentTransactions, holdings, securities }) {
  if(transactions && transactions?.length > 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
          <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Top Places
          </h5>
          <MerchantsHorizontalGraph transactions={transactions} />
        </div>

    )
  }else if(transactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
          <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Top Places
          </h5>
          
        </div>
    )

  } else if(investmentTransactions && investmentTransactions?.length > 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
          <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Top Investments
          </h5>
          <MerchantsHorizontalGraph investmentTransactions={investmentTransactions} />
        </div>

    )
  }else if(investmentTransactions?.length == 0){
    return(
      <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 text-center bg-white  shadow-2xl">
          <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Top Investments
          </h5>
          
        </div>
    )

  }
  
  
}

function HoldingsAndSecurities({ transactions, card, investmentTransactions, holdings, securities }) {
  return (
    <div>
      {(holdings && holdings.length > 0) && (
        <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 shadow-2xl bg-white flex flex-col h-[50vh] mb-4">
          <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
            Investment Holdings
          </h5>
          <InvestmentHoldingsDisplayTable holdings={holdings} />
        </div>
      )}
      
      {(securities && securities.length > 0) && (
        <>
          <div className="py-2 mt-4 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 shadow-2xl bg-white flex flex-col h-[50vh] mb-4">
            <h5 className="pt-4  mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
              Investment Securities
            </h5>
            <InvestmentSecuritiesDisplayTable securities={securities} />
          </div>
          <div className="py-2 duration-300 hover:scale-105 hover:shadow-xl w-full p-4 shadow-2xl bg-white flex flex-col h-[50vh] mb-4">
            <h5 className="pt-4 mb-2 font-thin text-2xl text-center font-goldman text-custom-purple">
              Securities Types
            </h5>
            <CategoryDonutChart securities={securities} />
          </div>
        </>
      )}
      
     
  
  

    </div>
  );
}







