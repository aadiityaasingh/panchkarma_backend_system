const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
require("dotenv").config();

connectDB();

app.listen(3000, () => {
    console.log("server is running on this 3000 port");
});

