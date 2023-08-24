import { plaidClient, sessionOptions } from "../../../lib/plaid";
import { withIronSessionApiRoute } from "iron-session/next";
import { connectToDB } from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(incomeHandler, sessionOptions);

async function incomeHandler(req, res) {
  await connectToDB();
  try {
    const userID = req?.body?.userID;
    const loggedInUser = await User.findOne({ id: userID });

    if (!loggedInUser) {
      return res.status(404).send({ error: "User not logged in" });
    }

    if (loggedInUser?.jobs && loggedInUser?.jobs.length > 0) {
      const justAddedJob = loggedInUser?.jobs[loggedInUser?.jobs.length - 1];
      const jobID = justAddedJob.jobID;
      console.log("jobID - ", jobID);

      if (!jobID) {
        return res.status(400).send({ error: "no access token" });
      }

      await addIncomesToDb(loggedInUser, jobID, res);
    } else {
      return res.status(400).send("User has no jobs");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}

async function addIncomesToDb(loggedInUser, jobID, res) {
  try {
    const request = {
      user_token: jobID,
    };

    const newJob = await plaidClient.creditPayrollIncomeGet(request);
    // console.log(newJob);

    //to do: add a webhook to update with actual newJob in DB

    const whilePendingPromiseJob = [
      {
        title: "Investment Banker",
        employerName: "First Platypus Bank",
        pay: 100000,
        rate: "annually",
      },
    ];

    await User.updateOne(
      { id: loggedInUser.id, "jobs.jobID": jobID },
      { $push: { "jobs.$.job": { $each: whilePendingPromiseJob } } }
    );

    return res.status(200).json(whilePendingPromiseJob);
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}
