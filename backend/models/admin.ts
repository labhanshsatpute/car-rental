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
        required: true
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

adminSchema.methods.generateAuthToken = () => {
    const admin = this as Admin
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KET as string, { expiresIn: '1d' });
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);

const validate = (data) => {
    const schema = joi.object({
        name: joi.string().required().label('Name'),
        email: joi.string().required().label('Email'),
        phone: joi.number().required().label('Phone'),
        gender: joi.string().required().label('Gender'),
        role: joi.string().required().label('Role'),
        password: joi.string().required().label('Password'),
    });
    return schema.validate(data);
}

export default Admin;