
  # [Ledger Personal Finance](https://www.ledgerpf.com/)



<h4 align="center">A comprehensive personal finance application that connects external bank accounts via Plaid API and aggregates that information to create insight-driven charts and graphics</h1>

 <a href="https://www.ledgerpf.com/">Live App



## Summary

This project is a full-stack web app with the goal of connecting and aggregating any external financial account via the Plaid API and generating insight-driven graphics and charts & budgetary tools. Ledger is built with the NextJs React full-stack framework and uses the MongoDB-clerk stack to authenticate users and persist financial data for core application functionalities.

## Languages and Dependencies

* **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
* **[NextJs](https://nextjs.org/)**
* **[React](https://react.dev/)**
* **[MongoDB]()**
* **[Plaid API](https://plaid.com/)**
* **[Clerk](https://clerk.com/)**




## Project Directory Hierarchy

Upon successful setup (see **Setup Instructions**), you should see the following project directory hierarchy.

```
.
├── .next
├── node_modules
├── .env.example
├── .gitignore
├── README.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── balances.mp4
│   ├── budgetPic.webp
│   ├── budgetVid.mp4
│   ├── connection.webp
│   ├── debtVid.webm
│   ├── favicon.ico
│   ├── graphs.gif
│   ├── heroBG.png
│   ├── info.png
│   ├── investments.webp
│   ├── investmentsVid.mov
│   ├── loanVid.mp4
│   ├── next.svg
│   ├── transactions.mp4
│   └── vercel.svg
├── src
│   ├── components
│   │   ├── budgeting
│   │   │   └── forms
│   │   │       ├── billsForm.jsx
│   │   │       └── incomeForm.jsx
│   │   ├── graphs
│   │   │   ├── categoryDonutChart.jsx
│   │   │   ├── merchantsHorizontalGraph.jsx
│   │   │   └── weeklySpendingChart.jsx
│   │   ├── plaidLinks
│   │   │   ├── bankAccounts
│   │   │   │   ├── checking
│   │   │   │   │   └── checkingAccountLink.jsx
│   │   │   │   └── savings
│   │   │   │       └── savingsAccountLink.jsx
│   │   │   ├── income
│   │   │   │   └── incomeVerificationLink.jsx
│   │   │   ├── investments
│   │   │   │   └── investmentAccountLink.jsx
│   │   │   └── liabilities
│   │   │       ├── creditCard
│   │   │       │   └── creditCardLink.jsx
│   │   │       └── loans
│   │   │           └── loanLink.jsx
│   │   └── shared
│   │       ├── demo
│   │       │   └── demoButton.jsx
│   │       ├── displays
│   │       │   ├── investmentHoldingsDisplayTable.jsx
│   │       │   ├── investmentSecuritiesDisplayTable.jsx
│   │       │   ├── investmentTransactionsTable.jsx
│   │       │   ├── loanDisplayTable.jsx
│   │       │   ├── mainPageDisplay.jsx
│   │       │   └── transactionsDisplayTable.jsx
│   │       └── topbarnav.jsx
│   ├── contexts
│   │   ├── InfoContext.js
│   │   └── InfoProvider.js
│   ├── lib
│   │   ├── models
│   │   │   ├── checkingAccount.model.js
│   │   │   ├── creditCard.model.js
│   │   │   ├── investmentAccount.model.js
│   │   │   ├── investmentHoldings.model.js
│   │   │   ├── investmentSecurities.model.js
│   │   │   ├── investmentTransactions.model.js
│   │   │   ├── item.model.js
│   │   │   ├── job.model.js
│   │   │   ├── jobs.model.js
│   │   │   ├── loan.model.js
│   │   │   ├── savingsAccount.model.js
│   │   │   ├── transactions.model.js
│   │   │   └── user.model.js
│   │   ├── mongoose.js
│   │   └── plaid.js
│   ├── middleware.js
│   ├── pages
│   │   ├── _app.jsx
│   │   ├── _document.jsx
│   │   ├── api
│   │   │   ├── bankAccounts
│   │   │   │   ├── checkingAccount
│   │   │   │   │   ├── addCheckingAccount.js
│   │   │   │   │   ├── displayCheckingAccountTransactions.js
│   │   │   │   │   ├── getAddedCheckingAccount.js
│   │   │   │   │   ├── getAllCheckingAccounts.js
│   │   │   │   │   └── getCheckingAccountTransactions.js
│   │   │   │   └── savingsAccount
│   │   │   │       ├── addSavingsAccount.js
│   │   │   │       ├── displaySavingsAccountTransactions.js
│   │   │   │       ├── getAddedSavingsAccount.js
│   │   │   │       ├── getAllSavingsAccounts.js
│   │   │   │       └── getSavingsAccountTransactions.js
│   │   │   ├── clerk
│   │   │   │   └── clerkwebhook.js
│   │   │   ├── dashboard
│   │   │   │   ├── displayAllItems.js
│   │   │   │   └── recentCreditCardTransactions.js
│   │   │   ├── income
│   │   │   │   ├── addIncome.js
│   │   │   │   └── getIncome.js
│   │   │   ├── investments
│   │   │   │   ├── addInvestmentAccount.js
│   │   │   │   ├── displayInvestmentAccountTransactions.js
│   │   │   │   ├── getAddedInvestmentAccount.js
│   │   │   │   ├── getAllInvestmentAccounts.js
│   │   │   │   └── getInvestmentAccountTransactions.js
│   │   │   ├── liabilities
│   │   │   │   ├── creditCard
│   │   │   │   │   ├── addCreditCard.js
│   │   │   │   │   ├── displayCreditCardTransactions.js
│   │   │   │   │   ├── getAddedCreditCard.js
│   │   │   │   │   ├── getAllCreditCards.js
│   │   │   │   │   └── getCreditCardTransactions.js
│   │   │   │   └── loans
│   │   │   │       ├── addLoan.js
│   │   │   │       ├── getAddedLoan.js
│   │   │   │       └── getAllLoans.js
│   │   │   └── plaidTokens
│   │   │       ├── createlinktoken.js
│   │   │       ├── exchangePublicToken.js
│   │   │       └── incomeLinkToken.js
│   │   ├── budgets.jsx
│   │   ├── checking.jsx
│   │   ├── creditcards.jsx
│   │   ├── dashboard.jsx
│   │   ├── index.jsx
│   │   ├── investments.jsx
│   │   ├── loans.jsx
│   │   ├── savings.jsx
│   │   ├── sign-in
│   │   │   └── [[...index]].jsx
│   │   └── sign-up
│   │       └── [[...index]].jsx
│   └── styles
│       └── globals.css
├── tailwind.config.ts
└── tsconfig.json
```

## Setup Instructions

To launch this project on your own local development environment, please go through the following instructions carefully:

**Basic Integration:**
1. Clone the repository into your local environment.
2. Open the directory in your favorite code editor.
3. Run the following command in the terminal to open the app on port 3000 in your favorite browser.

```console 
npm run dev
```
**Advanced Integration:**
*First implement basic integration
1. Run the following command to generate a local file of all required environmental variables.
   
 ```console 
cp .env.example .env.local
```
3. Obtain all of the environmental variables from Plaid, MongoDB, and Clerk and paste the values.
4. Run ngrok to launch the webhook for Clerk to communicate with MongoDB. You can download ngrok from [https://ngrok.com/download](https://ngrok.com/download).

```console 
ngrok http 3000
```

5. Paste the Clerk webhook API endpoint into the Clerk webhook configuration. It should look like this:
```console 
https://1234-56-78-910-123.ngrok-free.app/api/clerk/clerkwebhook
```
 


## Credits

The **Ledger Personal Finance** project is created and maintained by **Mordechai Bronfin** (2023).

