import { Request, Response } from 'express';
import Vehicle from '../../models/Vehicle';
import mongoose from 'mongoose';

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
                        mileage: 1,
                        price: 1,
                        priceUnit: 1,
                        location: 1,
                        features: 1,
                        thumbnailImage: 1,
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
                        mileage: 1,
                        price: 1,
                        priceUnit: 1,
                        location: 1,
                        features: 1,
                        thumbnailImage: 1,
                        "media.path": 1,
                        "media.type": 1,
                        brand: { 
                            $arrayElemAt: ["$brand", 0]
                        },
                    }
                },
            ]);

            return res.status(200).send({
                status: true,
                message: "Vehicel successfully fetched",
                data: vehicle[0]
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