import { body } from 'express-validator';

export const movieCreateValidation = [
  body('title', 'Укажите название фильма')
    .isString()
    .isLength({ min: 2, max: 100 })
    .withMessage('Не менее 2 символов, максимально 100'),
  body('year', 'Укажите год создания фильма').optional().isNumeric(),
  body('duration', 'Укажите продолжительность фильма').optional().isNumeric(),
  body('categories', '').optional().isArray(),
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
    .withMessage('Не менее 2 символов, максимально 40')
    .trim()
    .toLowerCase(),
];

export const directorCreateValidation = [
  body('name', 'Укажите имя режиссера')
    .isString()
    .isLength({ min: 2, max: 40 })
    .withMessage('Не менее 2 символов, максимально 40'),
];

export const userCreateValidation = [
  body('email', 'Укажите email').isEmail().normalizeEmail(),
  body('password', 'Укажите пароль')
    .isString()
    .trim()
    .isLength({ min: 6, max: 12 }),
  body('username', 'Укажите имя')
    .isString()
    .trim()
    .isLength({ min: 2, max: 40 })
    .withMessage('Не менее 2 символов, максимально 40'),
];

export const userLoginValidation = [
  body('email', 'Укажите email').isEmail().normalizeEmail(),
  body('password', 'Укажите пароль').isString().trim(),
];
