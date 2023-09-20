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

        let newBill = {
                        billType: req ?. body ?.billType,
                        description: req ?. body ?.description,
                        company: req ?. body ?.company,
                        payFrequency: req ?. body ?.payFrequency,
                        billTotal: parseFloat(req ?. body ?.billTotal),

        }
        await loggedInUser.bills.push(newBill)
        await loggedInUser.save()
        console.log('bill inserted')
        res.send({ok: true})

    } catch (error) {
        console.error(error);
        return res.status(500).send("server error");
    }
}
