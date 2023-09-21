import {plaidClient, sessionOptions} from "../../../lib/plaid";
import {withIronSessionApiRoute} from "iron-session/next";
import {connectToDB} from "../../../lib/mongoose";
import User from "../../../lib/models/user.model";

export default withIronSessionApiRoute(getAllBillsHandler, sessionOptions);

async function getAllBillsHandler(req, res) {
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


        let allBills = loggedInUser.bills.map((individualBill) => ({
            dateAdded: individualBill.dateAdded,
            billType: individualBill.billType,
            description: individualBill.description,
            company: individualBill.company,
            payFrequency: individualBill.payFrequency,
            billTotal: individualBill.billTotal
        }))

        if (allBills.length > 0) {
            console.log(allBills);
            return res.status(200).json(allBills);
        } else {
            return res.status(404).json({error: "User has no bills"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("server error");
    }
}
