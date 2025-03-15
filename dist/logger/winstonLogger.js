"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf, errors, colorize } = winston_1.format;
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
    transports: [
        // Логування в консоль (з кольоровим форматуванням)
        new winston_1.transports.Console({
            format: combine(colorize(), logFormat)
        }),
        // Логування помилок у файл
        new winston_1.transports.File({ filename: 'logs/error.log', level: 'error' }),
        // Загальні логи
        new winston_1.transports.File({ filename: 'logs/combined.log' })
    ]
});
exports.default = logger;
