import { Request, Response } from "express";
import joi from "joi";
import { storageBaseUrl } from "../../config/storage";
import fs from 'node:fs';
import Vehicle from "../../models/Vehicle";
import { EngineType, FuelType, PriceUnit, TransmissionType, VehicleType } from "../../config/enums";
import VehicleBrand from "../../models/VehicleBrand";
import VehicleMedia from "../../models/VehicleMedia";
import mongoose from "mongoose";

class VehicleController {

    static async handleGetAllVehicle(req: Request, res: Response) {
     
        try {

            const vehicles = await Vehicle.aggregate([
                {
                    $lookup: {
                        from: "vehiclemedias",
                        localField: '_id',
                        foreignField: 'vehicleId',
                        as: 'media'
                    },
                },
                {
                    $lookup: {
                        from: "vehiclebrands",
                        localField: 'brandId',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },                
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        summary: 1,
                        type: 1,
                        fuelType: 1,
                        engineType: 1,
                        transmissionType: 1,
                        seatingCapacity: 1,
                        manufacturingYear: 1,
                        price: 1,
                        priceUnit: 1,
                        location: 1,
                        thumbnailImageUrl: { $concat: [process.env.APP_URL + "/", "$thumbnailImage"] },
                        "media.path": 1,
                        "media.type": 1,
                        brand: { 
                            $arrayElemAt: ["$brand", 0]
                        },
                    }
                }
            ]);

            return res.status(200).send({
                status: true,
                message: "Vehicels successfully fetched",
                data: vehicles
            });
            
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }   

    static async handleGetIndividualVehicle(req: Request, res: Response) {
     
        try {

            const vehicle = await Vehicle.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: "vehiclemedias",
                        localField: '_id',
                        foreignField: 'vehicleId',
                        as: 'media'
                    }
                },
                {
                    $lookup: {
                        from: "vehiclebrands",
                        localField: 'brandId',
                        foreignField: '_id',
                        as: 'brand'
                    }
                },
                {
                    $addFields: {
                        brand: { $arrayElemAt: ["$brand", 0] }
                    }
                }
            ]);

            return res.status(200).send({
                status: true,
                message: "Vehicel successfully fetched",
                data: vehicle
            });
            
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async handleCreateVehicle(req: Request, res: Response) {

        try {
            
            const data = joi.object({
                name: joi.string().required().min(1).max(250).label('Name'),
                summary: joi.string().required().min(1).max(1000).label('Summary'),
                brandId: joi.string().required().custom(async (value, helpers) => {
                    
                    const brand = await VehicleBrand.findById(value);
                    if (!brand) {
                        return helpers.message({custom: 'Invalid Brand ID'})
                    }
                    return value;

                }).label("Brand ID"),
                type: joi.string().required().valid(...Object.values(VehicleType)).label('type'),
                fuelType: joi.string().required().valid(...Object.values(FuelType)).label('Fuel Type'),
                engineType: joi.string().required().valid(...Object.values(EngineType)).label('Engine Type'),
                transmissionType: joi.string().required().valid(...Object.values(TransmissionType)).label('Transmission Type'),
                seatingCapacity: joi.number().required().min(1).max(100).label('Seating Capacity'),
                manufacturingYear: joi.number().required().label('Manufacturing Year'),
                price: joi.number().required().label('Price'),
                priceUnit: joi.string().required().valid(...Object.values(PriceUnit)).label('Price Unit'),

                latitude: joi.string().required().min(1).max(250).label('Latitude'),
                longitude: joi.string().required().min(1).max(250).label('Longitude'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }

            const files = req.files as {[fieldname: string]: Express.Multer.File[]};

            const vehicle = await new Vehicle({
                ...req.body, 
                thumbnailImage: files.thumbnailImage[0].path,
                location: {
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                }
            }).save();

            files.vehicleImages.forEach(async (vehicleMedia) => {
                await new VehicleMedia({
                    vehicleId: vehicle._id,
                    type: vehicleMedia.mimetype,
                    path: vehicleMedia.path
                }).save();
            });

            return res.status(201).send({
                status: true,
                message: "Vehicel successfully created",
                data: vehicle
            });

        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

}

export default VehicleController;