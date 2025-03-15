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
      // --- Ethereum (Etherscan) ---
      const etherscanKey = process.env.ETHERSCAN_API_KEY || '';
      const ethResponse = await axios.get(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${etherscanKey}`
      );
      let ethGasFee = 100;
      if (ethResponse.data.status === '1') {
         ethGasFee = Number(ethResponse.data.result.ProposeGasPrice);
      }

      // --- Polygon (Polygonscan) ---
      const polygonscanKey = process.env.POLYGONSCAN_API_KEY || '';
      const polyResponse = await axios.get(
        `https://api.polygonscan.com/api?module=gastracker&action=gasoracle&apikey=${polygonscanKey}`
      );
      let polyGasFee = 2.5;
      if (polyResponse.data.status === '1') {
         polyGasFee = Number(polyResponse.data.result.ProposeGasPrice);
      }

      // --- BSC (BscScan) ---
      const bscscanKey = process.env.BSCSCAN_API_KEY || '';
      const bscResponse = await axios.get(
        `https://api.bscscan.com/api?module=gastracker&action=gasoracle&apikey=${bscscanKey}`
      );
      let bscGasFee = 6;
      if (bscResponse.data.status === '1') {
         bscGasFee = Number(bscResponse.data.result.ProposeGasPrice);
      }

      // Оцінки для Avalanche та Solana (орієнтовні значення)
      const avaxGasFee = 15;
      const solanaGasFee = 0.001;

      const networkData: NetworkInfo[] = [
        {
          name: 'Ethereum',
          gasFee: ethGasFee,
          confirmationTime: 20,
          load: 80,
          averageBlockTime: 14,
          reliability: 98
        },
        {
          name: 'Polygon',
          gasFee: polyGasFee,
          confirmationTime: 3,
          load: 25,
          averageBlockTime: 2.5,
          reliability: 95
        },
        {
          name: 'BSC',
          gasFee: bscGasFee,
          confirmationTime: 3,
          load: 45,
          averageBlockTime: 3,
          reliability: 88
        },
        {
          name: 'Avalanche',
          gasFee: avaxGasFee,
          confirmationTime: 4,
          load: 55,
          averageBlockTime: 2,
          reliability: 93
        },
        {
          name: 'Solana',
          gasFee: solanaGasFee,
          confirmationTime: 1,
          load: 30,
          averageBlockTime: 0.5,
          reliability: 85
        }
      ];
      return networkData;
    } catch (error) {
      console.error('Error fetching real network data:', error);
    }
  }

  // Якщо USE_REAL_API не увімкнено – повертаємо мок-дані
  const mockData: NetworkInfo[] = [
    { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80, averageBlockTime: 14, reliability: 98 },
    { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20, averageBlockTime: 2.5, reliability: 95 },
    { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40, averageBlockTime: 3, reliability: 88 },
    { name: 'Avalanche', gasFee: 10, confirmationTime: 5, load: 50, averageBlockTime: 2, reliability: 93 },
    { name: 'Solana', gasFee: 0.001, confirmationTime: 1, load: 30, averageBlockTime: 0.5, reliability: 85 }
  ];
  return mockData;
}