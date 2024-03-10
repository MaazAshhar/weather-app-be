import { Schema, model } from "mongoose";

const user = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cities: [{ type: Schema.Types.ObjectId, ref: 'City' }]
});

const User = new model('User', user);

export default User;