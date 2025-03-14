import axios from 'axios';

export interface NetworkInfo {
  name: string;
  gasFee: number;
  confirmationTime: number;
  load: number;
  averageBlockTime: number;
  reliability: number;
}

export async function fetchNetworkData(): Promise<NetworkInfo[]> {
  if (process.env.USE_REAL_API === 'true') {
    try {
      const etherscanKey = process.env.ETHERSCAN_API_KEY || '';
      // Запит до Etherscan Gas Oracle
      const ethResponse = await axios.get(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`
      );
      // Якщо запит успішний, отримуємо ProposeGasPrice (за потреби, можна додати додаткову обробку)
      const gasFee = Number(ethResponse.data.result.ProposeGasPrice) || 100;
      // Використовуємо орієнтовні значення для інших параметрів
      const confirmationTime = 18;
      const load = 80;
      const averageBlockTime = 14;
      const reliability = 98;

      const networkData: NetworkInfo[] = [
        {
          name: 'Ethereum',
          gasFee,
          confirmationTime,
          load,
          averageBlockTime,
          reliability
        },
        {
          name: 'Polygon',
          gasFee: 2.5,
          confirmationTime: 2,
          load: 25,
          averageBlockTime: 2.5,
          reliability: 95
        },
        {
          name: 'BSC',
          gasFee: 6,
          confirmationTime: 3,
          load: 45,
          averageBlockTime: 3,
          reliability: 88
        },
        {
          name: 'Avalanche',
          gasFee: 15,
          confirmationTime: 4,
          load: 55,
          averageBlockTime: 2,
          reliability: 93
        },
        {
          name: 'Solana',
          gasFee: 0.001,
          confirmationTime: 1,
          load: 30,
          averageBlockTime: 0.5,
          reliability: 85
        }
      ];
      return networkData;
    } catch (error) {
      console.error('Помилка отримання даних з API:', error);
    }
  }

  // Якщо режим реального API не увімкнено або виникла помилка – повертаємо мок-дані
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80, averageBlockTime: 14, reliability: 98 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20, averageBlockTime: 2.5, reliability: 95 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40, averageBlockTime: 3, reliability: 88 },
    { name: 'Avalanche', gasFee: 10, confirmationTime: 5, load: 50, averageBlockTime: 2, reliability: 93 },
    { name: 'Solana', gasFee: 0.001, confirmationTime: 1, load: 30, averageBlockTime: 0.5, reliability: 85 }
  ];
  return mockData;
}
