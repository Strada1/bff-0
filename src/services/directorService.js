const { Director } = require('../models');

async function addDirector(req) {
	return await Director.create(req.body);
}

async function getDirector(req) {
	return Director.findById(req.params.directorId);
}
async function deleteDirector(req) {
	const director = await getDirector(req);

	if (!director) {
		return false;
	}

	return await Director.findByIdAndDelete(req.params.directorId);
}
async function changeDirector(req) {
	const director = await getDirector(req);

	if (!director) {
		return false;
	}

	return await Director.findByIdAndUpdate(req.params.directorId, req.body);
}

module.exports = {
	addDirector,
	getDirector,
	deleteDirector,
	changeDirector,
};
