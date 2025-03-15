"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_validator_1 = require("express-validator");
const winstonLogger_1 = __importDefault(require("./logger/winstonLogger"));
const transactionRouter_1 = require("./transactionRouter");
const blockchain_1 = require("./blockchain");
const transactionValidators_1 = require("./validators/transactionValidators"); // Імпортуємо валідатори
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Налаштування Helmet з розширеними налаштуваннями
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    },
    frameguard: { action: 'deny' },
    referrerPolicy: { policy: 'no-referrer' }
}));
// Налаштування парсингу JSON і статичних файлів
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
// Rate limiting - обмеження запитів
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 хвилин
    max: 100, // максимум 100 запитів за 15 хвилин
    message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);
// Маршрут /route з використанням валідаторів із файлу routeValidators
app.post('/route', transactionValidators_1.routeValidators, // Використовуємо валідатори з файлу, які описані окремо
async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        winstonLogger_1.default.warn(`Validation errors: ${JSON.stringify(errors.array())}`);
        return res.status(400).json({ errors: errors.array() });
    }
    const input = req.body;
    try {
        const result = await (0, transactionRouter_1.routeTransaction)(input);
        winstonLogger_1.default.info(`Route processed: chosen network ${result.chosenNetwork.name}`);
        res.json(result);
    }
    catch (error) {
        winstonLogger_1.default.error(`Помилка маршрутизації транзакції: ${error.message}`);
        res.status(500).json({ error: 'Помилка при маршрутизації транзакції' });
    }
});
// Маршрут /send для надсилання транзакцій
app.post('/send', async (req, res) => {
    try {
        const { to, amount } = req.body;
        const receipt = await (0, blockchain_1.sendTransaction)(to, amount);
        if (!receipt) {
            winstonLogger_1.default.error('Transaction receipt is null');
            return res.status(500).json({ error: 'Transaction receipt is null' });
        }
        const txHash = receipt.transactionHash || receipt.hash;
        winstonLogger_1.default.info(`Transaction sent: ${txHash}`);
        res.json({
            message: 'Transaction sent!',
            transactionHash: txHash,
        });
    }
    catch (error) {
        winstonLogger_1.default.error(`Помилка надсилання транзакції: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    winstonLogger_1.default.info(`Server started on port ${PORT}`);
});
