// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const authRoutes = require("./src/routes/authRoutes");
// const errorHandler = require("./src/middleware/errorMiddleware");

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use("/api/auth",authRoutes);

// app.use(errorHandler);

// app.listen(process.env.PORT,()=>{
//  console.log("Server running on port "+process.env.PORT);
// });

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log("Server running on port " + PORT);
});