import UserModel from "../models/User.js";

export const checkTrialStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await UserModel.findById(userId);

        if (user) {
            req.user.isNums= user.isNums || false;
            req.user.isMdcat = user.isMdcat || false;
            const currentDate = new Date();
            if (user?.isFreeTrial && user?.freeTrialExpiry < currentDate) {
                await UserModel.findByIdAndUpdate(userId, { isFreeTrial: false });
                req.user.isTrialActive = false;
            }
            else if (user?.isFreeTrial) {
                req.user.isTrialActive = true;
            }
        }
        next();
    } catch (error) {
        next();
    }
};