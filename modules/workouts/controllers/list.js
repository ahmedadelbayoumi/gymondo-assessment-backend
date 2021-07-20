import moment from "moment";
import _ from 'lodash';

import validate from '../../../utils/validate.js';

import { categories } from '../../../utils/staticLookups.js';
const categoryValues = categories.map(({ value }) => value);

/**
 * @swagger
 *
 * /workouts:
 *   get:
 *     description: List all workouts
 *     tags: [Workouts]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: startDate
 *         type: string
 *         required: false
 *         description: Start date of the workouts in format "MM/YYYY", default "Today"
 *       - in: query
 *         name: category[]
 *         type: array
 *         required: false
 *         uniqueItems: true
 *         collectionFormat: multi
 *         description: Ids for the categories of the workouts, default ([])
 *       - in: query
 *         name: page
 *         type: number
 *         required: false
 *         description: Page number for pagination, default (1)
 *       - in: query
 *         name: limit
 *         type: number
 *         required: false
 *         description: Number of items per page for the pagination, default (20)
 *     responses:
 *       200:
 *         description: Workouts Information
 */

export default (req, res, db) => {
  let {
    startDate = moment().format('MM/YYYY'),
    category = [],
    page = 1,
    limit = 20,
  } = req.query;

  startDate = moment(startDate, 'MM/YYYY');

  validate(
    startDate.isValid()
    && !startDate.isBefore(moment(), 'month')
    && startDate.isSameOrBefore(moment().add(12, 'month'), 'month'),
    'Invalid startDate');

  validate(
    Array.isArray(category)
    && category.every(value => _.includes(categoryValues, value)),
    'Invalid categories'
  );

  page = parseInt(page, 10);

  validate(!!page, 'Invalid page number');

  limit = parseInt(limit, 10);

  validate(!!limit, 'Invalid items limit');

  const upperLimit = (limit * page);
  const lowerLimit = upperLimit - limit;

  const totalItems = db.chain
    .get('workouts')
    .filter(({ startDate: itemStartDate, category: itemCategory }) => {
      let isValid = moment(itemStartDate, 'YYYY-MM-DDTHH:mm:ss Z').isSameOrAfter(startDate, 'month');

      if (isValid && category.length) {
        isValid = _.includes(category, itemCategory);
      }

      return isValid;
    })
    .value();

  const totalItemsCount = totalItems.length;

  const totalPages = Math.ceil(totalItemsCount / limit);

  const paginatedItems = _.chain(totalItems)
    .slice(lowerLimit, upperLimit)
    .map((workout) =>
      _.pick(workout, ['id', 'name', 'picture.thumbnail', 'category', 'startDate']))
    .value();

  return res.status(200).send({
    statusCode: 200,
    message: 'Retrieved Successfully',
    data: {
      workouts: paginatedItems,
      numberOfItems: totalItemsCount,
      pagesCount: totalPages,
    },
  });
}

