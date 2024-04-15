const mongoose = require("mongoose");


module.exports = async () => {
    const dbConn = mongoose.connection;
    dbConn
        .on("connected", () => {
            console.log(" connected to mongo");
        })
        .on("error", (error) => {
            console.log(`error connecting to mongo >> ${error.message}`);
        })
        .on("disconnected", () => {
            console.log("disconnected from mongo");
            setTimeout(async () => {
                console.log("reconnecting to mongo");
                await mongoose.connect("mongodb+srv://teekay014:S2MNKitOoAFVGDfg@cluster0.l4oidba.mongodb.net/?retryWrites=true&w=majority")
            }, 5000);
        })
    await mongoose.connect("mongodb+srv://teekay014:S2MNKitOoAFVGDfg@cluster0.l4oidba.mongodb.net/?retryWrites=true&w=majority")
}