import * as DirectorServices from '../services/director.js';

export async function createDirector(req, res) {
  try {
    const { name } = req.body;
    const director = await DirectorServices.createDirector(name);

    return res.status(201).send(director);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getDirector(req, res) {
  try {
    const { directorId } = req.params;
    const director = await DirectorServices.getDirector(directorId);

    if (!director) {
      return res.status(404).send('No director for this ID');
    }

    return res.status(200).send(director);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getDirectors(req, res) {
  try {
    const directors = await DirectorServices.getDirectors();

    return res.status(200).send(directors);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateDirector(req, res) {
  try {
    const { directorId } = req.params;
    const { name } = req.body;
    const updatedDirector = await DirectorServices.updateDirector(directorId, name);

    if (!updatedDirector) {
      return res.status(404).send('No director for this ID');
    }

    return res.status(200).send(updatedDirector);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteDirector(req, res) {
  try {
    const { directorId } = req.params;
    const deletedDirector = await DirectorServices.deleteDirector(directorId);

    if (!deletedDirector) {
      return res.status(404).send('No director for this ID');
    }

    return res.status(200).send(deletedDirector);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
