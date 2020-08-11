const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const awsRouter = require('./routes/awsRoutes');

var cors = require('cors');
const app = express();

app.use(cors());

/**
 * MIDDLEWARES
 */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Add data from body to req object (add body property on req obj)
app.use(express.json());

// Add date of req to req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/**
 * ROUTES
 */
app.use('/api/v1/aws', awsRouter);

// If not handled by any other router
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port} 😬`);
});
