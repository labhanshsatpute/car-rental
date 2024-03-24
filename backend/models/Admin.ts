import joi from 'joi';
import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

interface AdminInterface extends Document {
    name: String;
    email: String;
    phone: String;
    gender: String;
    role: String;
    password: String;
    profileImage: String;
    passwordUpdatedAt?: Date | null;
    emailVerifiedAt?: Date | null;
    phoneVerifiedAt?: Date | null;
    status: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}
enum Role {
    ADMINISTRATOR = 'ADMINISTRATOR',
    MANAGER = 'MANAGER',
}

const adminSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: Object.values(Gender)
    },
    role: {
        type: String,
        enum: Object.values(Role)
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    passwordUpdatedAt: {
        type: Date
    },
    emailVerifiedAt: {
        type: Date
    },
    phoneVerifiedAt: {
        type: Date
    },
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

adminSchema.methods.generateAuthToken = (id: String) => {
    const token = jwt.sign({ _id: id }, process.env.JWT_PRIVATE_KET as string, { expiresIn: '1d' });
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
