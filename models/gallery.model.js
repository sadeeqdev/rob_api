const { model, Schema } = require("mongoose");

const gallerySchema = new Schema(
  {
    name: { type: String },
    file: { type: String },
    path: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Gallery", gallerySchema);
