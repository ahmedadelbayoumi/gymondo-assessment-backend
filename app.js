import express from 'express';
import chalk from 'chalk';

import boot, { configs } from './boot/index.js';
import routes from './routes/index.js';
import swagger from './swagger/index.js';

// App istance
const app = express();

// Boot app
boot(app)
  .then(appInstance => {
    // Routes
    routes(app);

    // Swagger
    swagger(app);

    // Kickoff
    appInstance.listen(configs.PORT, () => {
      console.log(`
        ${chalk.white.bold('Gymondo Assessment - Backend')}
        ---------------------------------------------------------------------------
        | App is running on: ${chalk.yellowBright.bold(`http://localhost:${configs.PORT}/api`)}          
        ---------------------------------------------------------------------------
        | Api Documentation: ${chalk.yellowBright.bold(`http://localhost:${configs.PORT}/api/docs`)} 
        ---------------------------------------------------------------------------
    `);
    });
  });

