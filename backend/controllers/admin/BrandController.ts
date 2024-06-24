import { Request, Response } from "express";
import joi from "joi";
import VehicleBrand from '../../models/VehicleBrand';
import { storageBaseUrl } from "../../config/storage";
import fs from 'node:fs';

class BrandController {

    static async handleGetBrand(req: Request, res: Response) {
        try {

            const vehicleBrands = await VehicleBrand.aggregate([
                {
                    $addFields: {
                        logo_url: { $concat: [process.env.APP_URL + "/", "$logo"] },
                    }
                }
            ]);

            return res.status(200).send({
                status: true,
                message: "Vehicel brand successfully created",
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

    static async handleGetIndividualBrand(req: Request, res: Response) {
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

    static async handleUpdateBrand(req: Request, res: Response) {
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
            
            const brand: any = await VehicleBrand.findById(req.params.id);

            if (!brand) {
                return res.status(200).send({
                    status: false,
                    message: "Vehicle brand not found with specified id",
                    data: null
                });
            }

            if (req.file) {
                fs.unlink(brand.logo, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log('File deleted successfully!');
                });
            }

            const vehicleBrand = await VehicleBrand.findOneAndUpdate({
                _id: brand._id
            }, {
                name: req.body.name,
                slug: req.body.slug,
                logo: req.file ? req.file?.path : brand.logo
            });

            return res.status(201).send({
                status: true,
                message: "Changes successfully saved",
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

    static async handleDeleteBrand(req: Request, res: Response) {
        try {
            
            const brand: any = await VehicleBrand.findById(req.params.id);

            if (!brand) {
                return res.status(200).send({
                    status: false,
                    message: "Vehicle brand not found with specified id",
                    data: null
                });
            }
            
            fs.unlink(brand.logo, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('File deleted successfully!');
            });

            await VehicleBrand.findOneAndDelete({ _id: brand._id });

            return res.status(201).send({
                status: true,
                message: "Brand successfully deleted",
                data: null
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