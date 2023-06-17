import mongoose, { Schema } from 'mongoose';


const UserSchema = new Schema({
    pass_id: {
        type: Schema.Types.ObjectId,
        ref: 'Pass',
        index: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: String,
    age: Number,
    phoneNumber: String,
    address: String,

});

const User = mongoose.model('User', UserSchema);

export {
    User
}
