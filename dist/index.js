"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionRouter_1 = require("./transactionRouter");
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// app.get('/', (req, res) => {
//   res.send('DMCA Transaction Router MVP');
// });
app.use(express_1.default.static('public'));
// Обробник для POST /route з валідацією
app.post('/route', [
    // Валідація поля sender (Ethereum-адреса)
    (0, express_validator_1.body)('sender')
        .exists().withMessage('Поле sender обов’язкове.')
        .isString().withMessage('Поле sender має бути рядком.')
        .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси відправника.'),
    // Валідація поля recipient (Ethereum-адреса)
    (0, express_validator_1.body)('recipient')
        .exists().withMessage('Поле recipient обов’язкове.')
        .isString().withMessage('Поле recipient має бути рядком.')
        .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси отримувача.'),
    // Валідація поля amount
    (0, express_validator_1.body)('amount')
        .exists().withMessage('Поле amount обов’язкове.')
        .isFloat({ gt: 0 }).withMessage('Сума має бути числом > 0.'),
    // Валідація поля token
    (0, express_validator_1.body)('token')
        .exists().withMessage('Поле token обов’язкове.')
        .isString().withMessage('Поле token має бути рядком.')
        .notEmpty().withMessage('Поле token не може бути порожнім.')
], async (req, res) => {
    // Перевірка результатів валідації
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const input = req.body;
    try {
        const result = await (0, transactionRouter_1.routeTransaction)(input);
        res.json(result);
    }
    catch (error) {
        logger_1.default.error(`Помилка маршрутизації транзакції: ${error}`);
        res.status(500).json({ error: 'Помилка при маршрутизації транзакції' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
