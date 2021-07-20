import lodash from 'lodash';

import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import morgan from 'morgan';

import { Low, JSONFile } from 'lowdb';

// App configs
const envConfigs = env.config();
export const configs = envConfigs.parsed;

export default async (app) => {
  // Allow CORS
  app.use(cors());

  // Request Logger
  app.use(morgan('dev'));

  // Parse request body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize DB Controller
  const db = new Low(new JSONFile(configs.DATABASE_URL));
  await db.read();

  db.chain = lodash.chain(db.data);
  app.db = db;

  return app;
}