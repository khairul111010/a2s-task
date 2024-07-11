import express from "express";
import logger from "./middlewares/logger";
import v1Routes from "./api/v1";
import "dotenv/config";
import { errorHandler, notFound } from "./middlewares/errors";
import { blueBG, redBG } from "console-log-colors";
import sequelize from "./config/database";
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Logger Middleware
app.use(logger);

app.use("/api/v1", v1Routes);

//Error Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    sequelize
    .authenticate()
    .then((res) => {
      console.log(blueBG("Database Connected!"));
      sequelize.sync({ force: false });
    })
    .catch((err) => {
      console.log(
        redBG("Database not connected. Please check database connection")
      );
    });
  console.log(`Server is up and running on port on ${PORT}`);
});
