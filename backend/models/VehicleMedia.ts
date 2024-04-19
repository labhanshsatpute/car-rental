import mongoose, { Schema } from "mongoose";

const vehicleMediaSchema: Schema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
}, { timestamps: true });

const VehicleMedia = mongoose.model('VehicleMedia', vehicleMediaSchema);

export default VehicleMedia;