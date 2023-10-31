import mongoose, { Schema } from 'mongoose';

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
} , { timestamps: true });


const AdminAccessToken = mongoose.model('AdminAccessToken', adminAccessTokenSchema);

export default AdminAccessToken;
