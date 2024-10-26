const express = require("express");
const cors = require("cors"); 
const qaRoutes = require("./routes/qaRoutes");
const app = express();

app.use(cors()); // Use CORS middleware
app.use(express.json());

console.log("inside app.js");

app.use("/api", qaRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
