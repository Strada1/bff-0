import { Router } from 'express';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    return res.status(200).send({ message: 'Hello World' });
  } catch (err) {
    next(err);
  }
});

export default router;
