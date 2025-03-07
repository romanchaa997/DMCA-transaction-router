import axios from 'axios';

// Інтерфейс, який описує дані для кожної мережі
export interface NetworkInfo {
  name: string;             // Назва мережі (наприклад, Ethereum, Polygon, BSC)
  gasFee: number;           // Комісія транзакції (наприклад, в gwei)
  confirmationTime: number; // Час підтвердження транзакції в секундах
  load: number;             // Відсоток завантаженості мережі
}

// Функція для отримання даних про мережі
// Поки що вона повертає мок-дані, які допоможуть перевірити логіку маршрутизації
export async function fetchNetworkData(): Promise<NetworkInfo[]> {
  // Мок-дані для тестування
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 }
  ];
  
  // Якщо вам потрібно перевірити роботу з реальними API, можна поки що залишити цей блок коментованим:
  /*
  try {
    const response = await axios.get('https://api.example.com/network-stats');
    return response.data;
  } catch (error) {
    console.error('Помилка отримання даних про мережі:', error);
    throw error;
  }
  */
  
  return mockData;
}
