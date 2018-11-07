import { Router } from 'express';
import Coop from './model.js';

const router = Router();

router.get('/api/v1/coops', (request, response) => {

  Coop.find().then(coops => {
    response.send(coops);
  });
});

router.post('/api/v1/coops', (request, response) => {

  throw new Error('ouch');

});

export default router;