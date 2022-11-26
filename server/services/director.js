import Director from '../models/Director.js';

export function createDirector(name) {
  return Director.create({ name });
}

export function getDirector(id) {
  return Director.findById(id);
}

export function getDirectors() {
  return Director.find();
}

export function updateDirector(id, name) {
  return Director.findByIdAndUpdate(id, { name }, {
    new: true,
  });
}

export function deleteDirector(id) {
  return Director.findByIdAndDelete(id);
}
