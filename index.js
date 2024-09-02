const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth.route");
const usersRoute = require("./routes/user.route");


const port = process.env.PORT | 5000;

// INITIALIZE THE APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);

// START SERVER
const startServer = async () => {
  try {
    await connectDB(process.env.DB_URI);
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  } catch (err) {
    console.error(`Failed to start the server: ${err}`);
  }
};

startServer();
