import express from "express"
import { CreateInventory,GetAllInventory,GetInventoryById } from "./Controller/InventoryController.js"
const router=express.Router();

router.get("/",GetAllInventory);

router.post("/",CreateInventory);

router.get("/",GetInventoryById);