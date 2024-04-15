const ReviewController = require("../controllers/review.controller");
const { Router } = require("express");
module.exports = () => {
    let api = new Router();

    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         const fPath = UPLOADS;
    //         cb(null, fPath);
    //     },
    //     filename: function (req, file, cb) {
    //         const arr = file.originalname.split(".");
    //         const ext = arr[arr.length - 1];
    //         const fileUrl = `${uuid().replace(/-/g, "")}.${ext}`;
    //         const filePath = "/uploads/" + fileUrl;
    //         req.filePath = filePath;
    //         if (!req.filePaths) {
    //             req.filePaths = []
    //         }
    //         req.filePaths.push(filePath)
    //         cb(null, fileUrl);
    //     },
    // });
    // const upload = multer({ storage });



    api.post("/",  async (req, res) => {
        try {
            const body = req.body;
            const { ok, data, message } = await ReviewController.createReview(body);
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
            const { ok, data, message } = await ReviewController.getReviews();
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
