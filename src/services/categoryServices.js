const { Category } = require('../models');

async function addCategory(req) {
	return await Category.create(req.body);
}

async function getCategory(req) {
	return Category.findById(req.params.categoryId);
}
async function deleteCategory(req) {
	const category = await getCategory(req);

	if (!category) {
		return false;
	}

	return await Category.findByIdAndDelete(req.params.categoryId);
}
async function changeCategory(req) {
	const category = await getCategory(req);

	if (!category) {
		return false;
	}

	return await Category.findByIdAndUpdate(req.params.categoryId, req.body);
}

module.exports = {
	addCategory,
	getCategory,
	deleteCategory,
	changeCategory,
};
