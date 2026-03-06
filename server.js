const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
require("dotenv").config();

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server is running on this ${process.env.PORT} port`);
});

