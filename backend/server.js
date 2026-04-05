require('dotenv').config();
const express = require('express');
const taskRoute = require("./routes/task.routes");
const connectDB = require("./db/db");
const cors = require("cors");

const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}));

app.use(cors());

// @ taskRoute
app.use('/api/tasks', taskRoute);

// @ database & server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});


