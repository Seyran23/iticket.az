const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const connectDB = require("./config/db");

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const eventRoutes = require('./routes/eventRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const settingsRoutes = require('./routes/settingsRoutes');


connectDB()
const app = express();




// middlewares
app.use(express.json());


// defining routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/settings', settingsRoutes);


const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
