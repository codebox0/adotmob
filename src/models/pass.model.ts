import mongoose, { Schema } from 'mongoose';

const PassSchema = new Schema({
    level: {
        type: Number,
        enum: [1, 2, 3,4, 5],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

const Pass = mongoose.model('Pass', PassSchema);

export {
    Pass
}