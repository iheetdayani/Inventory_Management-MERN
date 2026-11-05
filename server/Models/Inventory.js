import mongoose from "mongoose";
const ProductSchema=new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  purchasePrice:{
    type:Number,
    required:true
  },
  sellingPrice:{
     type:Number,
    required:true
  },
  quantity:{
      type:Number,
    required:true
  },
  reorderLevel:{
    type:Number,
    required:true
  },
  supplier:{
    type:String,
    required:true
  }
})
const Inventory=mongoose.model("INVENTORY",ProductSchema);

export default Inventory;