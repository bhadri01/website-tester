import mongoose, { Schema } from "mongoose";

const Website = new Schema(
  {
    logo: {
      type: String,
    },
    brandName: {
      type: String,
      unique: true,
    },
    website: {
      type: String,
      unique: true,
    },
    domainService: {
      type: String,
    },
    domainPurchase: {
      type: Date,
    },
    domainExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Web = mongoose.models.website || mongoose.model("website", Website);

export default Web;
