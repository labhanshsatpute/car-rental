import express, { Router } from "express";
import BrandController from "../controllers/guest/BrandController";

const router: Router = express.Router();

router.get('/brand', BrandController.getAllBrand);
router.get('/brand/:id', BrandController.getIndividualBrand);

export default router;