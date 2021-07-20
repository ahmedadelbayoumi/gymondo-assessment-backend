import _ from 'lodash';

import validate from '../../../utils/validate.js';

/**
 * @swagger
 *
 * /workouts/{workoutId}:
 *   get:
 *     description: Get workout info by id
 *     tags: [Workouts]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         type: string
 *         required: true
 *         description: ID of the workout to be retrieved
 *     responses:
 *       200:
 *         description: Workout Information
 */

export default (req, res, db) => {
  try {
    const { workoutId } = req.params;

    validate(!!workoutId && typeof workoutId === 'string', 'Missing workoutId');

    let workout = db.chain
      .get('workouts')
      .find({ id: workoutId })
      .value();

    validate(!!workout, 'Workout Not Found');

    workout = _.pick(
      workout,
      ['id', 'name', 'picture.image', 'category', 'startDate', 'description']
    );

    return res.status(200).send({
      statusCode: 200,
      message: 'Retrieved Successfully',
      data: {
        workout,
      }
    });

  } catch (err) {
    const { message, statusCode } = err;

    return res.status(statusCode || 400).send({
      statusCode: statusCode || 400,
      message,
    });
  }
}