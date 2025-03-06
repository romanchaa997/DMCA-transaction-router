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

// Функція маршрутизації транзакції
export async function routeTransaction(input: TransactionInput): Promise<RoutingResult> {
  // Отримуємо дані про мережі
  const networks = await fetchNetworkData();

  // Проста логіка: обираємо мережу з найнижчою комісією (gasFee)
  const chosenNetwork = networks.reduce((prev, curr) => (curr.gasFee < prev.gasFee ? curr : prev));

  return {
    chosenNetwork,
    rationale: `Вибрано мережу ${chosenNetwork.name} через найнижчий gasFee (${chosenNetwork.gasFee}).`
  };
}
