import 'dotenv/config';
// ...
import express, { Request, Response } from 'express';
import { routeTransaction, TransactionInput } from './transactionRouter';
import { body, validationResult } from 'express-validator';
import logger from './logger';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('DMCA Transaction Router MVP');
// });

app.use(express.static('public'));

// Обробник для POST /route з валідацією
app.post(
  '/route',
  [
    // Валідація поля sender (Ethereum-адреса)
    body('sender')
      .exists().withMessage('Поле sender обов’язкове.')
      .isString().withMessage('Поле sender має бути рядком.')
      .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси відправника.'),
    // Валідація поля recipient (Ethereum-адреса)
    body('recipient')
      .exists().withMessage('Поле recipient обов’язкове.')
      .isString().withMessage('Поле recipient має бути рядком.')
      .matches(/^0x[a-fA-F0-9]{40}$/).withMessage('Невірний формат адреси отримувача.'),
    // Валідація поля amount
    body('amount')
      .exists().withMessage('Поле amount обов’язкове.')
      .isFloat({ gt: 0 }).withMessage('Сума має бути числом > 0.'),
    // Валідація поля token
    body('token')
      .exists().withMessage('Поле token обов’язкове.')
      .isString().withMessage('Поле token має бути рядком.')
      .notEmpty().withMessage('Поле token не може бути порожнім.')
  ],
  async (req: Request, res: Response): Promise<void> => {
    // Перевірка результатів валідації
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    
    const input: TransactionInput = req.body;
    try {
      const result = await routeTransaction(input);
      res.json(result);
    } catch (error) {
      logger.error(`Помилка маршрутизації транзакції: ${error}`);
      res.status(500).json({ error: 'Помилка при маршрутизації транзакції' });
    }
  }
);
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
