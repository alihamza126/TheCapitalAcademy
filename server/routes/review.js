
import express from 'express'
import { Review } from '../models/common.js';
import { asyncWrapper } from '../helpers/asyncWrapper.js';
import { authenticateUser } from '../middleware/auth.middleware.js';

const reviewRouter = express.Router();


// post router review
reviewRouter.post('/',asyncWrapper(async(req,res)=>{
    const review=new Review({
        name:req.body.name,
        comment:req.body.comment,
        city:req.body.city
    });
    await review.save();
    res.status(200).json({
        message:"added"
    })
}));

// get router review
reviewRouter.get('/',asyncWrapper(async(req,res)=>{
    const reviews=await Review.find();
    res.send(reviews);
}));

//edit reviews
reviewRouter.put('/:id',asyncWrapper(async(req,res)=>{
    const review=await Review.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        comment:req.body.comment,
        city:req.body.city
    },{new:true});
    if(!review) return res.status(404).send('The review with the given ID was not found');
    res.send(review);
}));

// delete reviews
reviewRouter.delete('/:id',asyncWrapper(async(req,res)=>{
    const review=await Review.findByIdAndDelete(req.params.id);
    if(!review) return res.status(404).send('The review with the given ID was not found');
    res.send(review);
}));



export default reviewRouter;