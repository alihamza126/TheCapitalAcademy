import UserModel from "../models/User.js";
export const checkTrialStatus = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);
        if (user) {
            const currentDate = new Date();
            if ((user === null || user === void 0 ? void 0 : user.isFreeTrial) && (user === null || user === void 0 ? void 0 : user.freeTrialExpiry) < currentDate) {
                await UserModel.findByIdAndUpdate(userId, { isFreeTrial: false });
                req.user.isTrialActive = false;
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
