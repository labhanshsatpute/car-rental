import mongoose, { Schema } from "mongoose";

const vehicleBrandSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const VehicleBrand = mongoose.model('VehicleBrand', vehicleBrandSchema);

export default VehicleBrand;