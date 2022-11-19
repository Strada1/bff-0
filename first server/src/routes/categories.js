const app = require("../serverExpress");
const {
    createCategory,
    findAllCategories,
    findByIdAndUpdateCategory,
    deleteCategory
} = require("../services/categoryService");

app.route('/categories')
    .post(async (req, res) => {
        try {
            await createCategory(req.body)
            return res.status(201).send('category created')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .get(async (req, res) => {
        try {
            const allCategories =  await findAllCategories()
            return res.status(200).send(allCategories)
        } catch (err) {
            return res.status(500)
        }
    })
    .put(async (req, res) => {
        try {
            await findByIdAndUpdateCategory(req.body.id, req.body)
            return res.status(200).send('category updated')
        } catch (err) {
            return res.status(500)
        }
    })
    .delete(async (req, res) => {
        try {
            await deleteCategory(req.body.id)
            return res.status(200).send('category deleted')
        } catch (err) {
            return res.status(500)
        }
    })
