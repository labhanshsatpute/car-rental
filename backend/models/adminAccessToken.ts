import mongoose, { Schema } from 'mongoose';

enum Device {
    WEB = 'WEB',
    ANDROID = 'ANDROID',
    IOS = 'IOS',
}

const adminAccessTokenSchema: Schema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
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
} , { timestamps: true });


const AdminAccessToken = mongoose.model('AdminAccessToken', adminAccessTokenSchema);

export default AdminAccessToken;