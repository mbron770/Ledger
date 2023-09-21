// import { plaidClient, sessionOptions } from "../../../lib/plaid";
// import { withIronSessionApiRoute } from "iron-session/next";
// import { connectToDB } from "../../../lib/mongoose";
// import User from "../../../lib/models/user.model";

// export default withIronSessionApiRoute(getIncomeHandler, sessionOptions);

// async function getIncomeHandler(req, res) {
//   await connectToDB();
//   const userID = req?.body?.userID;

//   if (!userID) {
//     return res.status(400).json({ error: "userID is required" });
//   }

//   try {
//     const loggedInUser = await User.findOne({ id: userID });
//     if (!loggedInUser) {
//       return res.status(404).send({ error: "User not logged in" });
//     }

//     if (loggedInUser.items && loggedInUser.jobs.length > 0) {
//       const justAddedJob = loggedInUser.jobs[loggedInUser.jobs.length - 1]?.job;
//       console.log("just added job: \n", justAddedJob);

//       return res.status(200).json(justAddedJob);
//     } else {
//       return res.status(404).json({ error: "User has no jobs" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("server error");
//   }
// }


import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(
  getAllBillsHandler,
  sessionOptions
);

async function getAllBillsHandler(req, res) {
  await connectToDB();
  const userID = req?.body?.userID;

  if (!userID) {
    return res.status(400).json({ error: "userID is required" });
  }

  try {
    const loggedInUser = await User.findOne({ id: userID });
    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    let allBills = [];

    loggedInUser.bills.forEach((bill) => {
      if (bill && bill.length > 0) {
        const transformedBills = bill.map(
          (individualBill) => ({
            dateAdded: individualBill.dateAdded, 
            billType: individualBill.billType,
            description: individualBill.description,
            company: individualBill.company,
            payFrequency: individualBill.payFrequency,
            billTotal: individualBill.billTotal,
          })
        );
        
        allBills = allBills.concat(
          transformedBills
        );
      }
    });

    if (allBills.length > 0) {
      console.log(allBills);
      return res.status(200).json(allBills);
    } else {
      return res.status(404).json({ error: "User has no credit investments" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
}

