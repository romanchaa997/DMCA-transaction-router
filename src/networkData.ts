import axios from 'axios';

// Інтерфейс для даних про мережу
export interface NetworkInfo {
  name: string;
  gasFee: number;           // Комісія транзакції, наприклад, в gwei
  confirmationTime: number; // Час підтвердження транзакції в секундах
  load: number;             // Відсоток завантаженості мережі
}

// Функція для отримання даних про мережі
export async function fetchNetworkData(): Promise<NetworkInfo[]> {
  // Перевіряємо змінну середовища USE_REAL_API. Якщо вона встановлена в 'true', спробуємо отримати реальні дані.
  if (process.env.USE_REAL_API === 'true') {
    try {
      // Виконуємо запит до API BlockCypher для Ethereum
      const response = await axios.get('https://api.blockcypher.com/v1/eth/main');
      
      // Для прикладу, припустимо, що API повертає такі поля:
      // - high_fee_per_kb: рекомендована висока комісія
      // - avg_confirm_time: середній час підтвердження
      // - percent_full: відсоток завантаженості мережі (це умовний показник)
      const ethData = response.data;
      
      // Перетворюємо отримані дані у формат, що відповідає нашому інтерфейсу
      const networkData: NetworkInfo[] = [
        {
          name: 'Ethereum',
          // Якщо дані API відсутні, встановлюємо значення за замовчуванням
          gasFee: ethData.high_fee_per_kb ? Number(ethData.high_fee_per_kb) : 100,
          confirmationTime: ethData.avg_confirm_time ? Number(ethData.avg_confirm_time) : 15,
          load: ethData.percent_full ? Number(ethData.percent_full) : 80,
        },
        // Для інших мереж поки що залишаємо мок-дані
        {
          name: 'Polygon',
          gasFee: 2,
          confirmationTime: 2,
          load: 20,
        },
        {
          name: 'BSC',
          gasFee: 5,
          confirmationTime: 3,
          load: 40,
        }
      ];
      
      return networkData;
    } catch (error) {
      console.error('Помилка отримання даних з API:', error);
      // Якщо виникла помилка, продовжуємо повертати мок-дані
    }
  }
  
  // Якщо режим реального API не увімкнено або при помилці, повертаємо мок-дані
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 }
  ];
  return mockData;
}
