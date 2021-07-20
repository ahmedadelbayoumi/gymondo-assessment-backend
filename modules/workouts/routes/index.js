import getController from '../controllers/get.js';
import listController from '../controllers/list.js';

const routes = [
  {
    path: 'workouts',
    method: 'get',
    controller: listController,
  },
  {
    path: 'workouts/:workoutId',
    method: 'get',
    controller: getController,
  },
];

export default routes;
