import axios from 'axios';

// Інтерфейс для даних про мережу
export interface NetworkInfo {
  name: string;
  gasFee: number;           // Комісія, наприклад, в gwei
  confirmationTime: number; // Час підтвердження в секундах
  load: number;             // Відсоток завантаження мережі
}

// Функція для отримання даних про мережі (поки що повертає мок-дані)
export async function fetchNetworkData(): Promise<NetworkInfo[]> {
  // На цьому етапі повертаємо статичні дані, щоб потім інтегрувати реальні API/оракули
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 }
  ];
  return mockData;

  // Приклад реального запиту (якщо API буде доступне):
  // const response = await axios.get('https://api.example.com/network-stats');
  // return response.data;
}
