import UserModel from "../models/User.js";

export const checkTrialStatus = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);

        if (user) {
            const currentDate = new Date();
            if (user?.isFreeTrial && user?.freeTrialExpiry < currentDate) {
                await UserModel.findByIdAndUpdate(userId, { isFreeTrial: false });
                req.user.isTrialActive = false;
            }
        }
        next();
    } catch (error) {
        next();
    }
};