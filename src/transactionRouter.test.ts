// transactionRouter.test.ts
import { routeTransaction, TransactionInput } from './transactionRouter';

// Мокуємо модуль networkData, щоб повертати контрольовані дані
jest.mock('./networkData', () => {
  return {
    fetchNetworkData: async () => {
      // Повертаємо тестовий набір даних для трьох мереж
      return [
        { name: 'NetworkA', gasFee: 10, confirmationTime: 10, load: 50 },
        { name: 'NetworkB', gasFee: 5, confirmationTime: 15, load: 60 },
        { name: 'NetworkC', gasFee: 8, confirmationTime: 8, load: 40 }
      ];
    },
    // Експортуємо також інтерфейс, якщо потрібно
    NetworkInfo: {} // не обов’язково, якщо він не використовується безпосередньо
  };
});

describe('routeTransaction', () => {
  it('повертає обрану мережу з поясненням, використовуючи тестові дані', async () => {
    const input: TransactionInput = {
      sender: '0x123...',
      recipient: '0xABC...',
      amount: 1,
      token: 'ETH'
    };

    const result = await routeTransaction(input);

    // Перевіримо, що повернуто об’єкт з властивістю chosenNetwork
    expect(result.chosenNetwork).toHaveProperty('name');

    // Перевіримо, що rationale містить рядок "score:"
    expect(result.rationale).toMatch(/score:/);

    // Можемо додатково перевірити, що обрана мережа відповідає очікуванням
    // Наприклад, якщо з цих даних очікується, що найнижчий score буде у 'NetworkC',
    // перевіримо, що це саме вона
    expect(result.chosenNetwork.name).toBe('NetworkC');
  });
});
