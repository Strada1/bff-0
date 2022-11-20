const { Router } = require('express');
const { directorController } = require('../controllers');

const directorRouter = Router();

directorRouter.post('/', directorController.create);
directorRouter.get('/', directorController.get);
directorRouter.get('/:directorId', directorController.getOne);
directorRouter.put('/:directorId', directorController.update);
directorRouter.delete('/:directorId', directorController.delete);

module.exports = { directorRouter };
