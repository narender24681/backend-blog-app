const express = require("express");
const { dbConnection } = require("./db");
const { userRouter } = require("./routes/Auth.route");
const { blogsRouter } = require("./routes/Blogs.route");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api/blogs", blogsRouter);

app.listen(port, async () => {
    try {
        await dbConnection;
        console.log("Connected to the Database");
    }
    catch(err) {
        console.log(err);
        console.log("Cannot connect to the Database");
    }

    console.log(`Server is running on the port: ${port}`);
})
