import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Config/db.js";
import InventoryRoutes from "./Routes/InventoryRoutes.js";
dotenv.config();
ConnectDb();
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/products",InventoryRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
})