import { fetchNetworkData, NetworkInfo } from './networkData';

// Інтерфейс для вхідних даних транзакції
export interface TransactionInput {
  sender: string;
  recipient: string;
  amount: number;
  token: string;
}

// Інтерфейс для результату маршрутизації
export interface RoutingResult {
  chosenNetwork: NetworkInfo;
  rationale: string;
}

// Функція маршрутизації транзакції з розширеною логікою
export async function routeTransaction(input: TransactionInput): Promise<RoutingResult> {
  // Отримуємо дані про мережі
  const networks = await fetchNetworkData();

  // Визначаємо вагові коефіцієнти для кожного параметру
  const weightGas = 0.5;      // вплив комісії транзакції
  const weightTime = 0.3;     // вплив часу підтвердження
  const weightLoad = 0.2;     // вплив завантаженості мережі

  // Обчислюємо "score" для кожної мережі:
  // score = (gasFee * weightGas) + (confirmationTime * weightTime) + (load * weightLoad)
  const scoredNetworks = networks.map(network => {
    const score = network.gasFee * weightGas + network.confirmationTime * weightTime + network.load * weightLoad;
    return { network, score };
  });

  // Обираємо мережу з найнижчим score
  const chosenNetworkObj = scoredNetworks.reduce((prev, curr) => (curr.score < prev.score ? curr : prev));
  const chosenNetwork = chosenNetworkObj.network;

  return {
    chosenNetwork,
    rationale: `Вибрано мережу ${chosenNetwork.name} (score: ${chosenNetworkObj.score.toFixed(2)}) на основі вагових коефіцієнтів.`
  };
}
