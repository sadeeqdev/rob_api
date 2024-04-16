const GalleryController = require("../controllers/gallery.controller");
const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
module.exports = (UPLOADS) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fPath = UPLOADS;
      cb(null, fPath);
    },
    filename: function (req, file, cb) {
      const arr = file.originalname.split(".");
      const ext = arr[arr.length - 1];
      const fileUrl = `${uuid().replace(/-/g, "")}.${ext}`;
      req.filePath = "/uploads/" + fileUrl;
      cb(null, fileUrl);
    },
  });

  const upload = multer({ storage });
  api = express.Router();

  api.post("/", upload.array("photo"), async (req, res) => {
    try {
      let imageData = JSON.parse(req.body.meta);
      const { ok, data, message } = await GalleryController.addGallery(
        imageData,
        req.files
      );
      if (ok) {
        res.status(201).json({ ok, data });
      } else {
        res.status(500).json({ ok, message });
      }
    } catch (err) {
      res.status(500).json({ ok: false, message: err.message });
    }
  });

  api.get("/", async (req, res) => {
    try {
      const { ok, data, message } = await GalleryController.getGallery();
      if (ok) {
        res.status(201).json({ ok, data });
      } else {
        res.status(500).json({ ok, message });
      }
    } catch (err) {
      res.status(500).json({ ok: false, message: err.message });
    }
  });

  return api;
};
