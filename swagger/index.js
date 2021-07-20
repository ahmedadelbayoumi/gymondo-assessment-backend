import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

export default (app) => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'Gymondo Assessment Backend API Documentation',
        version: '1.0.0',
        description: 'Gymondo Assessment Backend API Documentation',
      },
    },
    apis: [
      'modules/workouts/controllers/*.js',
    ],
  };

  const specs = swaggerJsdoc(options);

  // Swagger route
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
};