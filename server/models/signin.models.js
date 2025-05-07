import mongoose from 'mongoose';

const signInData = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    role_based_control: {
        type: String,
        default: 'User',
        enum: ['Admin', 'User']
    },
    file_path: {
        idProof: { type: String },
        bankStatement: { type: String },
        creditBureau: { type: String }
    },
    file_response: {
        idProof: { type: Object },
        bankStatement: { type: Object },
        creditBureau: { type: Object }
    }

}, { timestamps: true });

const signIn = mongoose.model('user_credentials', signInData);

export default signIn;
