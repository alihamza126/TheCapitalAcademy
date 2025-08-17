import express from 'express';
import TestModel from '../models/TestModel.js';
import AttemptModel from '../models/AttemptModel.js';
import McqModel from '../models/McqModel.js';

const router = express.Router();

// ---------------- List Available Tests ----------------
router.get('/tests', async (req, res) => {
    try {
        const currentDate = new Date();
        const tests = await TestModel.find({
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
        }).populate('questions');
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- Get Test Questions ----------------
router.get('/tests/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const test = await TestModel.findById(id).populate('questions');
        if (!test) return res.status(404).json({ error: 'Test not found' });

        // Optionally randomize questions for each student
        const questions = test.questions.sort(() => Math.random() - 0.5);

        res.json({ testId: test._id, title: test.title, duration: test.duration, questions });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- Submit Test Answers ----------------
router.post('/tests/:id/submit', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentId, answers } = req.body; // answers: [{ questionId, selectedOption }]

        const test = await TestModel.findById(id).populate('questions');
        if (!test) return res.status(404).json({ error: 'Test not found' });

        // Calculate score
        let score = 0;
        const attemptAnswers = answers.map(ans => {
            const question = test.questions.find(q => q._id.toString() === ans.questionId);
            const isCorrect = question && question.correctOption === ans.selectedOption;
            if (isCorrect) score += 1; // 1 mark per correct answer
            return { questionId: ans.questionId, selectedOption: ans.selectedOption, isCorrect };
        });

        // Save attempt
        const attempt = await AttemptModel.create({
            studentId,
            testId: id,
            answers: attemptAnswers,
            score,
            completedAt: new Date(),
        });

        res.json({ message: 'Test submitted', score, attemptId: attempt._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---------------- View Student Result ----------------
router.get('/tests/:id/result/:studentId', async (req, res) => {
    try {
        const { id, studentId } = req.params;
        const attempt = await AttemptModel.findOne({ testId: id, studentId }).populate('answers.questionId');

        if (!attempt) return res.status(404).json({ error: 'No attempt found for this student' });

        res.json({
            score: attempt.score,
            answers: attempt.answers.map(a => ({
                question: a.questionId.question,
                selectedOption: a.selectedOption,
                correctOption: a.questionId.correctOption,
                isCorrect: a.isCorrect,
            })),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
