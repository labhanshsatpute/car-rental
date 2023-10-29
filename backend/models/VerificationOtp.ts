import mongoose, { Schema } from "mongoose";

enum Purpose {
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
    PHONE_VERIFICATION = 'PHONE_VERIFICATION',
    BOOKING = 'BOOKING',
}

enum EntityType {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

const verificationOtpSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
    },
    phone: {
        type: String,
    }, 
    entityType: {
        type: String,
        enum: Object.values(EntityType),
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    purpose: {
        type: String,
        enum: Object.values(Purpose),
        default: null
    },
    otp: {
        type: Number,
        length: 6
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 86400
    }
}, { timestamps: true });

const VerificationOtp = mongoose.model('VerificationOtp', verificationOtpSchema);

export default VerificationOtp;