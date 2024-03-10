import City from "../models/City.js";
import User from "../models/Users.js";

export const addCity = async(req, res) => {
    try {
        const user = req.user;
        const { city } = req.body;
        city['user'] = user.id;
        const newCity = await City.create(city);
        await User.findByIdAndUpdate(user.id, { $push: { cities: newCity._id } }, { new: true, useFindAndModify: false });
        res.status(201).send({success: true, message: 'City added successfully'});

    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}

export const removeCity = async(req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        const myCity = await City.findByIdAndDelete(id);
        await User.findByIdAndUpdate(user.id, { $pull: { cities: myCity._id } });
        res.status(200).send({success: true, message: 'City removed successfully'});

    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}

export const getCityById = async(req,res) => {
    try {
        const id = req.params.id;
        const myCity = await City.findById(id);
        res.status(200).send({description: 'Successful response', city: myCity});
    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}

export const updateCity = async(req, res) => {
    try {
        const id = req.params.id;
        const {name} = req.body.city;
        const myCity = await City.findByIdAndUpdate(id, {name});
        res.status(200).send({success: true, message: 'City updated successfully'});
    } catch (error) {
        res.status(500).send({success: false, description: 'Internal server error', error: 'Server error, please try again later'});
    }
}