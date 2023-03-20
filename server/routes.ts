import express, {Express, Request, Response} from 'express';

const router = express();

// Router imports

const materialsRouter = require('./routes/materials.routes');

router.use(materialsRouter);

module.exports = router;