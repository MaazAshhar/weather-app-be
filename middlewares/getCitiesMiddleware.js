import City from "../models/City.js";

export const getCity = async(req, res, next) => {
    try {
        req.cities = await City.find({user:req.user.id});
        next();
    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}