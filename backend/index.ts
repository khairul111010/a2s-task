import express from "express"
import logger from "./middlewares/logger";
import v1Routes from './api/v1'
const app = express();

const PORT = process.env.PORT || 5000


//Logger Middleware
app.use(logger);

app.use('/api/v1', v1Routes)

app.listen(PORT, () => {
    console.log(`Server is up and running on port on ${PORT}`);
})