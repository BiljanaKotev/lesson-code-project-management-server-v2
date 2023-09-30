require('dotenv/config');
require('./db');
const express = require('express');
const { isAuthenticated } = require('./middleware/jwt.middleware');
const cors = require('cors');

const app = express();

// 👇 Configure CORS here
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions)); // <-- Add this line

require('./config')(app);

// 👇 Start handling routes here
const allRoutes = require('./routes');
app.use('/api', allRoutes);

const projectRouter = require('./routes/project.routes');
app.use('/api', isAuthenticated, projectRouter);

const taskRouter = require('./routes/task.routes');
app.use('/api', isAuthenticated, taskRouter);

const authRouter = require('./routes/auth.routes'); //  <== IMPORT
app.use('/auth', authRouter); //  <== ADD

require('./error-handling')(app);

module.exports = app;
