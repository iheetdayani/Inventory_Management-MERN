import Inventory from "../Models/Inventory.js";

// 1. CREATE INVENTORY
export const CreateInventory = async (req, res) => {
  try {
    const data = await Inventory.create(req.body);

    res.status(201).json({
      data: data,
      message: "Inventory created successfully"
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message
    });
  }
};

// 2. GET ALL INVENTORY
export const GetAllInventory = async (req, res) => {
  try {
    const data = await Inventory.find();

    res.status(200).json({
      data: data,
      message: "Inventory fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message
    });
  }
};

// 3. GET INVENTORY BY ID
export const GetInventoryById = async (req, res) => {
  try {
    const data = await Inventory.findById(req.params.id);

    if (!data) {
      return res.status(404).json({
        data: null,
        message: "Inventory not found"
      });
    }

    res.status(200).json({
      data: data,
      message: "Inventory fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message
    });
  }
};