import { Request, Response } from "express";
import joi from "joi";
import VehicleBrand from '../../models/VehicleBrand';
import { storageBaseUrl } from "../../config/storage";

class BrandController {

    static async handleGetBrand(req: Request, res: Response) {
        try {
            
            const vehicleBrands = await VehicleBrand.find({ deletedAt: null });

            const data = vehicleBrands.map((item) => {
                return {
                  name: item.name,
                  slug: item.slug,
                  logo_url: `${storageBaseUrl}/${item.logo}`
                };
            });

            return res.status(200).send({
                status: true,
                message: "Vehicel brand successfully created",
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

    static async handleCreateBrand(req: Request, res: Response) {
        try {
            
            const data = joi.object({
                name: joi.string().required().min(1).max(250).label('Name'),
                slug: joi.string().required().min(1).max(250).label('Slug'),
            });

            const { error } = data.validate(req.body);
            if (error) {
                return res.status(200).send({
                    status: false,
                    message: error.details[0].message,
                    data: error.details
                });
            }
            
            const vehicleBrand = await new VehicleBrand({
                name: req.body.name,
                slug: req.body.slug,
                logo: req.file?.path
            }).save();

            return res.status(201).send({
                status: true,
                message: "Vehicel brand successfully created",
                data: vehicleBrand
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