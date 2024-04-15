const galleryModel = require("../models/gallery.model");


class GalleryController {
    constructor() {

    }
   
    async addGallery(body) {
        try {
            const gallery = new galleryModel(body);
            let result = await gallery.save();
            return { ok: true, data: result };
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
