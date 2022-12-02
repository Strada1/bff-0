const { Router } = require('express');
const { directorController } = require('../controllers');
const { createDirectorValidator, directorIdValidator, updateDirectorValidator } = require('../validators/director');

const directorRouter = Router();

directorRouter.post('/', createDirectorValidator, directorController.create);
directorRouter.get('/', directorController.get);
directorRouter.get('/:directorId', directorIdValidator, directorController.getOne);
directorRouter.put('/:directorId', updateDirectorValidator, directorController.update);
directorRouter.delete('/:directorId', directorIdValidator, directorController.delete);

module.exports = { directorRouter };
