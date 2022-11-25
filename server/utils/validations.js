import { body } from 'express-validator';

export const movieCreateValidation = [
  body('title', 'Укажите название фильма')
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Не менее 2 символов, максимально 100'),
  body('year', 'Укажите год создания фильма').isNumeric(),
  body('duration', 'Укажите продолжительность фильма').isNumeric(),
];

export const commentCreateValidation = [
  body('author', 'Укажите автора комментария')
    .isString()
    .isLength({ min: 2, max: 80 })
    .withMessage('Не менее 2 символов, максимально 80'),
  body('text', 'Укажите текст комментария')
    .isString()
    .isLength({ min: 20, max: 500 })
    .withMessage('Не менее 20 символов, максимально 500'),
];

export const categoryCreateValidation = [
  body('title', 'Укажите название категории')
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage('Не менее 2 символов, максимально 40'),
];
