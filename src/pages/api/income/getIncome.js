import {plaidClient, sessionOptions} from "../../../lib/plaid";
import {withIronSessionApiRoute} from "iron-session/next";
import {connectToDB} from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(getAllIncomesHandler, sessionOptions);

async function getAllIncomesHandler(req, res) {
    await connectToDB();
    console.log(req ?. body ?. userID)
    const userID = req ?. body ?. userID;

    if (! userID) {
        return res.status(400).json({error: "userID is required"});
    }

    try {
        const loggedInUser = await User.findOne({id: userID});
        if (! loggedInUser) {
            return res.status(404).send({error: "User not logged in"});
        }

        let allIncomes = loggedInUser.income.map((individualIncome) => ({
            dateAdded: individualIncome.dateAdded,
            incomeType: individualIncome.incomeType,
            jobTitle: individualIncome.jobTitle,
            company: individualIncome.company,
            payType: individualIncome.payType,
            paySchedule: individualIncome.paySchedule,
            takeHomePay: individualIncome.takeHomePay,
            yearlySalary: individualIncome.yearlySalary,
            hourlyRate: individualIncome.hourlyRate,
            hoursPerWeek: individualIncome.hoursPerWeek
        }))
        
        if (allIncomes.length > 0) {
            console.log(allIncomes);
            return res.status(200).json(allIncomes);
        } else {
            return res.status(404).json({error: "User has no income"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
}
