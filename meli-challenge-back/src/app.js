const express = require('express');
const routes = require('./api/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
app.use(errorHandler);

module.exports = app;
