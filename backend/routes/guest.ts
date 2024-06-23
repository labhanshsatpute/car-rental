import express, { Router } from "express";
import BrandController from "../controllers/guest/BrandController";
import VehicleController from '../controllers/guest/VehicleController';

const router: Router = express.Router();

router.get('/brand', BrandController.getAllBrand);
router.get('/brand/:id', BrandController.getIndividualBrand);

router.get('/vehicle', VehicleController.handleGetAllVehicle);
router.get('/vehicle/:id', VehicleController.handleGetIndividualVehicle);

export default router;