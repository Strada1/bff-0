const { directorService } = require('../services');

class Controller {
  create = async ( req, res ) => {
    const newDirector = req.body;
    const director = await directorService.create(newDirector);

    return res.status(201).send(director);
  };
  get = async ( req, res ) => {
    const directors = await directorService.get();

    return res.status(200).send(directors);
  };
  getOne = async ( req, res ) => {
    const { directorId } = req.body;
    const director = await directorService.getOne(directorId);

    return res.status(200).send(director);
  };
  update = async ( req, res ) => {
    const { directorId } = req.params;
    const newDirector = req.body;
    const director = await directorService.update(directorId, newDirector);

    return res.status(200).send(director);
  };
  delete = async ( req, res ) => {
    const { directorId } = req.params;
    await directorService.delete(directorId);

    return res.status(200).send();
  };
}

const directorController = new Controller();

module.exports = { directorController };
