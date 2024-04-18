const cloudinary = require("cloudinary").v2;
const galleryModel = require("../models/gallery.model");

class GalleryController {
  constructor() {}

  async addGallery(data, images) {
    try {
      cloudinary.config({
        cloud_name: "dyngfmfiz",
        api_key: "179489529593872",
        api_secret: "UcEaI_lZw_WjxOYKXX8r3yRrYf0",
      });
      const galleryData = [];
      let fileUrl = "";
      for (const image of images) {
        if (image.mimetype.startsWith("image/")) {
          await cloudinary.uploader.upload(
            image.path,
            { public_id: image.filename },
            function (error, result) {
              fileUrl = result?.url;
              error && console.log(error);
            }
          );
        } else {
          await cloudinary.uploader
            .upload(image.path, {
              resource_type: "video",
              public_id: image.filename,
            })
            .then((data) => {
              console.log(data);
              fileUrl = data?.url;
            })
            .catch((err) => {
              console.err(err);
            });
        }

        const newData = {
          name: data.name,
          file: image.filename,
          path: fileUrl,
          type: image.mimetype,
        };
        console.log(newData);
        const gallery = new galleryModel(newData);
        const result = await gallery.save();
        galleryData.push(result);
      }
      console.log(galleryData);
      return { ok: true, data: galleryData };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getGallery() {
    try {
      let gallery = await galleryModel.find();
      return { ok: true, data: gallery };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}

module.exports = new GalleryController();
