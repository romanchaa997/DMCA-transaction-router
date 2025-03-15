"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logJournal = logJournal;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Визначаємо шлях до файлу журналу (наприклад, розташований у корені проекту)
const journalFilePath = path_1.default.join(__dirname, '../../journal.md');
/**
 * Додає запис до журналу з поточним датою та часом.
 * @param message - Повідомлення, яке потрібно додати до журналу.
 */
function logJournal(message) {
    // Отримуємо поточну дату та час
    const now = new Date();
    // Форматуємо запис (наприклад, у форматі Markdown)
    const entry = `### ${now.toLocaleString()}\n${message}\n\n`;
    // Додаємо запис до файлу. Якщо файл не існує, він буде створений.
    fs_1.default.appendFileSync(journalFilePath, entry, 'utf8');
}
