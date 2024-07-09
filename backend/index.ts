import express from "express"
import logger from "./middlewares/logger";

const app = express();

const PORT = process.env.PORT || 5000


//Logger Middleware
app.use(logger);

app.get('/api/v1', (req, res) => {
    return res.send("Hello")
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port on ${PORT}`);
})