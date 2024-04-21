import { Request, Response } from "express";
import VehicleBrand from "../../models/VehicleBrand";
import { storageBaseUrl } from "../../config/storage";

class BrandController {

    static async getAllBrand(req: Request, res: Response) {
        try {
            
            const vehicleBrands = await VehicleBrand.aggregate([
                {
                    $addFields: {
                        logoUrl: { $concat: [process.env.APP_URL + "/", "$logo"] }
                    }
                }
            ]);

            return res.status(200).send({
                status: true,
                message: "Vehicel brands successfully created",
                data: vehicleBrands
            });
            
        } catch (error) {
            return res.status(500).send({
                status: false,
                message: "Internal server error",
                error: error
            });
        }
    }

    static async getIndividualBrand(req: Request, res: Response) {
        try {
            
            const vehicleBrand = await VehicleBrand.findOne({ _id: req.params.id , deletedAt: null });
            if (!vehicleBrand) {
                return res.status(200).send({
                    status: false,
                    message: "Vehicle brand not found with specified id",
                    data: null
                });
            }

            const data = {
                _id: vehicleBrand._id,
                name: vehicleBrand.name,
                slug: vehicleBrand.slug,
                logo_url: `${storageBaseUrl}/${vehicleBrand.logo}`
            };

            return res.status(200).send({
                status: true,
                message: "Vehicel brand successfully fetched",
                data: data
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

export default BrandController;