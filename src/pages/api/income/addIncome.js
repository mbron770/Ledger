import {plaidClient, sessionOptions} from "../../../lib/plaid";
import {withIronSessionApiRoute} from "iron-session/next";
import {connectToDB} from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(incomeHandler, sessionOptions);

async function incomeHandler(req, res) {
    await connectToDB();
    try {
        const userID = req ?. body ?. userID;
        console.log(req.body)
        const loggedInUser = await User.findOne({id: userID});

        if (! loggedInUser) {
            return res.status(404).send({error: "User not logged in"});
        }

        let newIncome = {
            incomeType: req ?. body ?. incomeType,
            jobTitle: req ?. body ?. jobTitle,
            company: req ?. body ?. company,
            payType: req ?. body ?. payType,
            paySchedule: req ?. body ?. paySchedule,
            takeHomePay: parseFloat(req ?. body ?. takeHomePay),
            yearlySalary: req ?. body ?. yearlySalary ? parseFloat(req ?. body ?. yearlySalary) : null,
            hourlyRate: req ?. body ?. hourlyRate ? parseFloat(req ?. body ?. hourlyRate) : null,
            hoursPerWeek: req ?. body ?. hoursPerWeek ? parseFloat(req ?. body ?. hoursPerWeek) : null
        }
        await loggedInUser.income.push(newIncome)
        await loggedInUser.save()
        console.log('income inserted')
        res.send({ok: true})

    } catch (error) {
        console.error(error);
        return res.status(500).send("server error");
    }
}
