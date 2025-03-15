import 'dotenv/config';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validationResult } from 'express-validator';
import logger from './logger/winstonLogger';
import { routeTransaction, TransactionInput } from './transactionRouter';
import { sendTransaction } from './blockchain';
import { routeValidators } from './validators/transactionValidators'; // Імпортуємо валідатори

const app = express();
const PORT = process.env.PORT || 3000;

// Налаштування Helmet з розширеними налаштуваннями
app.use(
  helmet({
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
  })
);

// Налаштування парсингу JSON і статичних файлів
app.use(express.json());
app.use(express.static('public'));

// Rate limiting - обмеження запитів
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 хвилин
  max: 100, // максимум 100 запитів за 15 хвилин
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Маршрут /route з використанням валідаторів із файлу routeValidators
app.post(
  '/route',
  routeValidators, // Використовуємо валідатори з файлу, які описані окремо
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(`Validation errors: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }

    const input: TransactionInput = req.body;
    try {
      const result = await routeTransaction(input);
      logger.info(`Route processed: chosen network ${result.chosenNetwork.name}`);
      res.json(result);
    } catch (error) {
      logger.error(`Помилка маршрутизації транзакції: ${(error as Error).message}`);
      res.status(500).json({ error: 'Помилка при маршрутизації транзакції' });
    }
  }
);

// Маршрут /send для надсилання транзакцій
app.post('/send', async (req: Request, res: Response) => {
  try {
    const { to, amount } = req.body;
    const receipt = await sendTransaction(to, amount);
    if (!receipt) {
      logger.error('Transaction receipt is null');
      return res.status(500).json({ error: 'Transaction receipt is null' });
    }
    const txHash = (receipt as any).transactionHash || (receipt as any).hash;
    logger.info(`Transaction sent: ${txHash}`);
    res.json({
      message: 'Transaction sent!',
      transactionHash: txHash,
    });
  } catch (error) {
    logger.error(`Помилка надсилання транзакції: ${(error as Error).message}`);
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  logger.info(`Server started on port ${PORT}`);
});