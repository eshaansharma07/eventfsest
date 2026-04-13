import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`EventSphere API listening on port ${port}`);
  });
};

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
