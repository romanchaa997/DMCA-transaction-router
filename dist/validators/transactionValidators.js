"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeValidators = void 0;
const express_validator_1 = require("express-validator");
exports.routeValidators = [
    // Перевірка sender: обов'язкове поле, має бути Ethereum-адресою
    (0, express_validator_1.body)('sender')
        .exists().withMessage('Поле sender обов’язкове.')
        .isString().withMessage('Поле sender має бути рядком.')
        .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси відправника.'),
    // Перевірка recipient: обов'язкове поле, має бути Ethereum-адресою
    (0, express_validator_1.body)('recipient')
        .exists().withMessage('Поле recipient обов’язкове.')
        .isString().withMessage('Поле recipient має бути рядком.')
        .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси отримувача.'),
    // Перевірка amount: обов'язкове поле, число у діапазоні 0.0001 - 10000
    (0, express_validator_1.body)('amount')
        .exists().withMessage('Поле amount обов’язкове.')
        .isFloat({ min: 0.0001, max: 10000 }).withMessage('Сума має бути в діапазоні 0.0001–10000'),
    // Перевірка token: обов'язкове поле, має бути одним із допустимих значень
    (0, express_validator_1.body)('token')
        .exists().withMessage('Поле token обов’язкове.')
        .isString().withMessage('Поле token має бути рядком.')
        .isIn(['ETH', 'MATIC', 'BNB']).withMessage('Непідтримуваний тип токена')
];
