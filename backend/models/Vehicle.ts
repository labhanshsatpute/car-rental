import mongoose, { Schema } from "mongoose";
import { 
    EngineType,
    FuelType,
    PriceUnit, 
    TransmissionType, 
    VehicleType 
} from "../config/enums";

const vehicleSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    thumbnailImage: {
        type: String,
        required: true,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleBrand",
        required: true
    },
    type: {
        type: String,
        enum: Object.values(VehicleType),
        required: true
    },
    fuelType: {
        type: String,
        enum: Object.values(FuelType),
        required: true
    },
    engineType: {
        type: String,
        enum: Object.values(EngineType),
        required: true
    },
    transmissionType: {
        type: String,
        enum: Object.values(TransmissionType),
        required: true
    },
    seatingCapacity: {
        type: Number,
        required: true
    },
    manufacturingYear: {
        type: String,
        required: true
    },
    price: {
        type: Schema.Types.Decimal128,
        required: true
    },
    mileage: {
        type: Number,
        required: true
    },
    priceUnit: {
        type: String,
        enum: Object.values(PriceUnit),
        required: true
    },
    location: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;