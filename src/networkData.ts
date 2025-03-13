import axios from 'axios';

// Експортуємо інтерфейс NetworkInfo, щоб інші файли могли його імпортувати
export interface NetworkInfo {
  name: string;
  gasFee: number;
  confirmationTime: number;
  load: number;
}

export async function fetchNetworkData(): Promise<NetworkInfo[]> {
  if (process.env.USE_REAL_API === 'true') {
    try {
      const response = await axios.get('https://api.blockcypher.com/v1/eth/main');
      const ethData: any = response.data; // Використовуємо any для спрощення типізації

      const networkData: NetworkInfo[] = [
        {
          name: 'Ethereum',
          gasFee: ethData.high_fee_per_kb ? Number(ethData.high_fee_per_kb) : 100,
          confirmationTime: ethData.avg_confirm_time ? Number(ethData.avg_confirm_time) : 15,
          load: ethData.percent_full ? Number(ethData.percent_full) : 80
        },
        {
          name: 'Polygon',
          gasFee: 2,
          confirmationTime: 2,
          load: 20
        },
        {
          name: 'BSC',
          gasFee: 5,
          confirmationTime: 3,
          load: 40
        },
        {
          name: 'Avalanche',
          gasFee: 10,
          confirmationTime: 5,
          load: 50
        },
        {
          name: 'Solana',
          gasFee: 0.001,
          confirmationTime: 1,
          load: 30
        }
      ];
      return networkData;
    } catch (error) {
      console.error('Помилка отримання даних з API:', error);
    }
  }

  // Якщо режим реального API не увімкнено або при помилці – повертаємо мок-дані
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 },
    { name: 'Avalanche', gasFee: 10, confirmationTime: 5, load: 50 },
    { name: 'Solana', gasFee: 0.001, confirmationTime: 1, load: 30 }
  ];
  return mockData;
}
