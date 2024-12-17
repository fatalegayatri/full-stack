const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// Initialize Express
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for CORS
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
}));

// Middleware to parse cookies
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => { console.log('Connected to MongoDB') })
    .catch((err) => { console.log(err) });

// Define Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Use Auth Routes
app.use("/", authRoute);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
