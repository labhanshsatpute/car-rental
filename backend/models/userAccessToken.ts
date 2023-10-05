import mongoose, { Schema } from "mongoose";

const userAccessTokenSchema: Schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    token: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
    },
    operatingSystem: {
        type: String,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400
    }
}, { timestamps: true });

const UserAccessToken = mongoose.model('UserAccessToken', userAccessTokenSchema);

export default UserAccessToken;