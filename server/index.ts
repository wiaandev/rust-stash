import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const materialRoutes = require('./routes/materials.routes');
const userRoutes = require('./routes/users.routes');
const locationRoutes = require('./routes/locations.routes');
const recipeRoutes = require('./routes/recipes.routes');

import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middleware
app.use(materialRoutes);
app.use(userRoutes);
app.use(locationRoutes);
app.use(recipeRoutes);

const port = process.env.PORT || 3001;
const db = process.env.DB_CONNECTION;

mongoose.set('strictQuery', false);
mongoose
  .connect(db!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//     res.send("Working");
// })

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
