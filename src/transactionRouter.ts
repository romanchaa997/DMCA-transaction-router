import { fetchNetworkData, NetworkInfo } from './networkData';

export interface TransactionInput {
  sender: string;
  recipient: string;
  amount: number;
  token: string;
}

export async function routeTransaction(input: TransactionInput): Promise<{ chosenNetwork: NetworkInfo; rationale: string }> {
  // Отримуємо дані про мережі
  const networks = await fetchNetworkData();

  // Простий алгоритм: вибираємо мережу з найнижчим gasFee
  const chosenNetwork = networks.reduce((prev, curr) => (curr.gasFee < prev.gasFee ? curr : prev));

  return {
    chosenNetwork,
    rationale: `Вибрано мережу ${chosenNetwork.name} через найнижчу комісію (${chosenNetwork.gasFee}).`
  };
}
