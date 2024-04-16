const galleryModel = require("../models/gallery.model");

class GalleryController {
  constructor() {}

  async addGallery(data, images) {
    try {
      const galleryData = [];
      for (const image of images) {
        const newData = {
          name: data.name,
          file: image.filename,
          path: image.path,
        };
        const gallery = new galleryModel(newData);
        const result = await gallery.save();
        galleryData.push(result);
      }
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
