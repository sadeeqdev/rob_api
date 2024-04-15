require("./connection/mongo.conn")();
const reviewRoutes = require("./routes/review.routes")
const gallerryRoutes = require("./routes/gallery.routes")


const UPLOADS = __dirname + "/uploads";

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/review",reviewRoutes());
app.use("/api/v1/gallery",gallerryRoutes(UPLOADS));
app.use("/uploads",express.static(UPLOADS))

app.listen(4000, () => {
  console.log("app listening on port: 4000 ");
});
