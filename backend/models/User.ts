import mongoose, { Document, Schema, mongo } from "mongoose";
import jwt from 'jsonwebtoken';

enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER'
}

interface UserInterface extends Document {
    name: String;
    email: String;
    phone: String;
    gender: String;
    dateOfBirth: Date;
    password: String;
    profileImage: String;
    googleId: String;
    passwordUpdatedAt?: Date | null;
    emailVerifiedAt?: Date | null;
    phoneVerifiedAt?: Date | null;
    status: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

const userSchema: Schema = new mongoose.Schema({
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
        default: null
    },
    gender: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    password: {
        type: String,
    },
    profileImage: {
        type: String,
        default: null
    },
    googleId: {
        type: String,
        default: null
    },
    passwordUpdatedAt: {
        type: Date,
        default: null
    },
    emailVerifiedAt: {
        type: Date,
        default: null
    },
    phoneVerifiedAt: {
        type: Date,
        default: null
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

userSchema.methods.generateAuthToken = (id: String) => {
    const token = jwt.sign({ _id: id }, process.env.JWT_PRIVATE_KET as string, { expiresIn: '1d' });
    return token;
}

const User = mongoose.model('User', userSchema);

export default User;
