import express from 'express'
import { asyncWrapper } from '../helpers/asyncWrapper.js';
import UserModel from '../models/User.js';
import { authUser } from '../middleware/auth.middleware.js';
import UserProgress from '../models/UserProgress.js';
import McqModel from '../models/mcq.js';
import { checkTrialStatus } from '../middleware/course.js';

const progressRouter = express.Router();


progressRouter.post('/get', authUser, checkTrialStatus, asyncWrapper(async (req, res) => {
    const course = req.body.course?.trim();
    const subject = req.body.subject?.trim();
    const chapter = req.body.chapter?.trim();
    const topic = req.body.topic?.trim();
    const category = req.body.catagory?.trim(); // past, normal, solved, unsolved, wrong, all
    const userId = req.user.userId;

    const isTrialActive = req.user?.isTrialActive || false;
    const isNums = req.user?.isNums;
    const isMdcat = req.user?.isMdcat;

    let limit = 100;
    if (isTrialActive && !isNums && !isMdcat) limit = 5;

    let mcqs = [];

    try {
        if (subject !== 'mock') {
            const queryCriteria = { course, subject, chapter };
            if (subject !== 'english' && subject !== 'logic') queryCriteria.topic = topic;

            const pipeline = [{ $match: queryCriteria }];
            let excludedIds = [];
            let includedIds = [];

            // Fetch user progress
            const userProgress = await UserProgress.findOne({ userId });

            if (category === 'solved') {
                includedIds = userProgress?.solved || [];
                pipeline.unshift({ $match: { ...queryCriteria, _id: { $in: includedIds } } });
            } else if (category === 'wrong') {
                includedIds = userProgress?.wrong || [];
                pipeline.unshift({ $match: { ...queryCriteria, _id: { $in: includedIds } } });
            } else if (category === 'unsolved') {
                const allSolved = userProgress?.solved || [];
                const allWrong = userProgress?.wrong || [];
                excludedIds = [...allSolved, ...allWrong];
                pipeline.unshift({ $match: { ...queryCriteria, _id: { $nin: excludedIds } } });
            } else if (category === 'past') {
                pipeline.unshift({ $match: { ...queryCriteria, category: 'past' } });
            }

            pipeline.push({ $sample: { size: limit } });
            mcqs = await McqModel.aggregate(pipeline);
            return res.status(200).json(mcqs);
        }

        // Mock test
        else {
            const queryCriteria = { course };
            const sampleSizes = {
                biology: 68,
                chemistry: 54,
                physics: 54,
                english: 18,
                logic: 6
            };

            for (const [subj, size] of Object.entries(sampleSizes)) {
                const subjectMCQs = await McqModel.aggregate([
                    { $match: { ...queryCriteria, subject: subj } },
                    { $sample: { size } }
                ]);
                mcqs.push(...subjectMCQs);
            }

            return res.status(200).json(mcqs);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving MCQs', error });
    }
}));

progressRouter.put('/save', authUser, asyncWrapper(async (req, res) => {
    const { correctMcq = [], wrongMcq = [], finalSave = false } = req.body;
    const userId = req.user.userId;

    // Step 1: Pull conflicting entries to keep arrays clean
    const pulls = {};
    if (correctMcq.length > 0) pulls['wrong'] = { $in: correctMcq };
    if (wrongMcq.length > 0) pulls['solved'] = { $in: wrongMcq };

    if (Object.keys(pulls).length > 0) {
        await UserProgress.updateOne(
            { userId },
            { $pull: pulls }
        );
    }

    // Step 2: Add correct/wrong mcqs
    if (correctMcq.length || wrongMcq.length) {
        await UserProgress.updateOne(
            { userId },
            {
                $addToSet: {
                    solved: { $each: correctMcq },
                    wrong: { $each: wrongMcq },
                },
                $set: { lastSaveAt: new Date() },
            },
            { upsert: true }
        );
    }

    // Step 3: Track total save count
    if (finalSave) {
        await UserProgress.updateOne(
            { userId },
            { $inc: { totalSave: 1 } },
            { upsert: true }
        );
    }

    res.status(200).json({ message: 'Progress saved' });
}));







export default progressRouter;