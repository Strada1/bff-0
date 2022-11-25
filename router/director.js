const Router = require('express');
const { createDirector, findDirectors, updateDirector, deleteDirector } = require("../services/directorService");
const {checkSchema} = require("express-validator");
const checkError = require("../helpers/checkError");

const directors = new Router();

directors.get(
    '/directors',
    async (req, res) => {
        try {
            const director = await findDirectors();
            return res.status(200).send(director);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

directors.post(
    '/directors',
    checkSchema({
        name: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Title should be at least 1 chars long',
                options: { min: 1 },
            },
        },
        firstname: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Title should be at least 1 chars long',
                options: { min: 1 },
            },
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const director = await createDirector(req.body);
            return res.status(201).send(director);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

directors.put(
    '/directors/:directorId',
    checkSchema({
        directorId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const director = await updateDirector(req.body);
            return res.status(200).send(director);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    })

directors.delete(
    '/directors/:directorId',
    checkSchema({
        directorId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
        try {
            const { directorId } = req.params;
            await deleteDirector(directorId);
            return res.status(200).send('delete');
        } catch (e) {
            return res.status(500).send(e.message);
        }
    });

module.exports = directors;