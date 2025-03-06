import express from 'express';
import { routeTransaction, TransactionInput } from './transactionRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('DMCA Transaction Router MVP');
});

// Новий ендпоінт для маршрутизації транзакцій
app.post('/route', async (req, res) => {
  const input: TransactionInput = req.body;
  try {
    const result = await routeTransaction(input);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при маршрутизації транзакції' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
