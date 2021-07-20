import workoutRoutes from '../modules/workouts/routes/index.js';

// All API routes
const routes = [
  ...workoutRoutes,
];

/**
 * Request Handler
 * 
 * @param {object} req - Express Request Object
 * @param {object} res - Express Response Object
 * @param {object} db - LowDB instance
 * @param {function} controller - Controller Function
 * @returns Response Object
 * 
 * This function is responsible for running the appropriate controller,
 * and catch all errors that may occur from validation or execution,
 * and send the appropriate response.
 */

const requestHandler = (req, res, db, controller) => {
  try {
    controller(req, res, db);
  } catch (err) {
    const { message, statusCode } = err;

    return res.status(statusCode || 400).send({
      statusCode: statusCode || 400,
      message,
    });
  }
}

export default (app) => {
  routes.forEach(route => app[route.method](`/api/${route.path}`,
    (req, res) => requestHandler(req, res, app.db, route.controller)));
}