

<h1 align="center" <a href="https://www.ledgerpf.com/"><b>Ledger Personal Finance</b></h1>

<h4 align="center">A comprehensive personal finance application that connects external bank accounts via Plaid API and aggregates that information to create insight-driven charts and graphics</h1>

 <a href="https://www.ledgerpf.com/">Live App>



## Summary

This project is a full-stack web app with the goal of connecting and aggregating any external financial account via the Plaid API and generating insight-driven graphics and charts & budgetary tools. Ledger is built with the NextJs React full-stack framework and uses the MongoDB-clerk stack to authenticate users and persist financial data for core application functionalities.

## Languages and Dependencies

* **[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)**
  * **[NextJs](https://nextjs.org/)**
  * * **[React](https://react.dev/)**
* **[MongoDB]()**
  * **[Plaid API](https://plaid.com/)**
  * * **[Clerk](https://clerk.com/)**



## Project Directory Hierarchy

Upon successful setup (see **Setup Instructions**), you should see the following project directory hierarchy.

```
├── .gitignore
├── README.md
├── backend
│   ├──  app.py
│   ├──  database.db
│   ├──  manage.py
│   ├──  models.py
│   ├──  requirements.txt
│   ├──  routes.py
│   ├──  run
│   ├──  migrations
│   │    ├── alembic.ini
│   │    ├── env.py
│   │    ├── script.py.mako
│   │    └── versions
│
├── frontend
    ├──  package.json
    ├──  package-lock.json
    ├──  README.md
    │  
    └──  public 
    │    └── index.html
    │  
    └──  src
         ├── App.css
         ├── App.jsx
         ├── index.js
         └── Components
              └── ArticleList.js
```

## Setup Instructions

To launch this project on your own local development environment, please go through the following instructions carefully:

Basic Integration
1. Clone the repository into your local environment
2. Open the directory in your favorite code editor
3. Run npm run dev in the terminal to open the app on port 3000 in your favorite browser

Advanced Integration 
4. Run cp .env.example .env.local to generate a local file of all required environmental variables
5. Obtain all of the environmental variables from Plaid, MongoDB, and Clerk and paste the values
6. Run ngrok http 3000 to launch the webhook for clerk to communicate with mongo https://ngrok.com/download
7. Paste the clerk webhook api endpoint into the clerk webhook configuration, it should look like this https://1234-56-78-910-123.ngrok-free.app/api/clerk/clerkwebhook 


## Credits

The **Ledger Personal Finance** project is created and maintained by **Mordechai Bronfin** (2023).

