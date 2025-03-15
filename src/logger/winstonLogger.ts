import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Логування в консоль (з кольоровим форматуванням)
    new transports.Console({
      format: combine(colorize(), logFormat)
    }),
    // Логування помилок у файл
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Загальні логи
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

export default logger;