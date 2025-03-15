import fs from 'fs';
import path from 'path';

// Визначаємо шлях до файлу журналу (наприклад, розташований у корені проекту)
const journalFilePath = path.join(__dirname, '../../journal.md');

/**
 * Додає запис до журналу з поточним датою та часом.
 * @param message - Повідомлення, яке потрібно додати до журналу.
 */
export function logJournal(message: string): void {
  // Отримуємо поточну дату та час
  const now = new Date();
  // Форматуємо запис (наприклад, у форматі Markdown)
  const entry = `### ${now.toLocaleString()}\n${message}\n\n`;
  // Додаємо запис до файлу. Якщо файл не існує, він буде створений.
  fs.appendFileSync(journalFilePath, entry, 'utf8');
}
