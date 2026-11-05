import express from "express";
import {
  CreateInventory,
  GetAllInventory,
  GetInventoryById
} from "../Controller/InventoryController.js";

const router = express.Router();

router.post("/", CreateInventory);
router.get("/", GetAllInventory);
router.get("/:id", GetInventoryById);

export default router;