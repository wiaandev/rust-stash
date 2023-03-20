import express, { Express, Request, Response } from 'express';

const materialRouter: Express = express();

materialRouter.get('/api/materials', (req: Request, res: Response) => {
  res.send('Working!');
});

module.exports = materialRouter;
