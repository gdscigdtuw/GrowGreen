import express from "express";

// importing routes
import indexRoutes from "./routes/index.js";

const app = express();

// using routes
app.use("/", indexRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
