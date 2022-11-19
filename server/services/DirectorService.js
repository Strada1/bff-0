const Director = require('../models/Director');

class DirectorService {
  createDirector({ name }) {
    return Director.create({ name });
  }

  getDirector(id) {
    return Director.findById(id);
  }

  updateDirector(id, { name }) {
    return Director.findByIdAndUpdate(id, { name }, {
      new: true,
    });
  }

  deleteDirector(id) {
    return Director.findByIdAndDelete(id);
  }
}

module.exports = new DirectorService();
