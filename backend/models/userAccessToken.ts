import mongoose, { Schema } from "mongoose";

enum Device {
    WEB = 'WEB',
    ANDROID = 'ANDROID',
    IOS = 'IOS'
}

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
    device: {
        type: String,
        enum: Object.values(Device)
    },
    operatingSystem: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400
    }
}, { timestamps: true });

const UserAccessToken = mongoose.model('UserAccessToken', userAccessTokenSchema);

export default UserAccessToken;