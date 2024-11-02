const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const connectDB = require("./config/db");
const cors = require("cors")

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require("./swagger/swaggerConfig")


connectDB()
const app = express();

const PORT = process.env.PORT || 1234;


// swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));


// middlewares
app.use(cors())
app.use(express.json());


// defining routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/settings', settingsRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
