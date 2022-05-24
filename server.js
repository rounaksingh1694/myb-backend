const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs.json");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/question");
const gameRoutes = require("./routes/game");
const userRoutes = require("./routes/user");
const miscRoutes = require("./routes/misc");

const app = express();

const port = process.env.PORT ? process.env.PORT : 8000;

mongoose
	.connect(process.env.PROD_DATABASE_HOST, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("SUCCESSFULLY CONNECTED TO THE DATABASE");
	});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
	console.log("Listening on port", port);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/user", userRoutes);
app.use("/api/misc", miscRoutes);

// Docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
