import { Schema, model } from "mongoose";

const city = new Schema({
    name:{
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const City = new model('City', city);

export default City;