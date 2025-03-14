import { fetchNetworkData, NetworkInfo } from './networkData';

export interface TransactionInput {
  sender: string;
  recipient: string;
  amount: number;
  token: string;
}

export async function routeTransaction(input: TransactionInput): Promise<{ chosenNetwork: NetworkInfo; rationale: string }> {
  const networks = await fetchNetworkData();

  // Розрахунок score: gasFee (0.4), confirmationTime (0.3), load (0.2), averageBlockTime (0.05), reliability (-0.1)
  const calculateScore = (net: NetworkInfo): number => {
    return net.gasFee * 0.4 +
           net.confirmationTime * 0.3 +
           net.load * 0.2 +
           net.averageBlockTime * 0.05 -
           net.reliability * 0.1;
  };

  const chosenNetwork = networks.reduce((prev, curr) => {
    return calculateScore(curr) < calculateScore(prev) ? curr : prev;
  });

  return {
    chosenNetwork,
    rationale: `Вибрано мережу ${chosenNetwork.name} через найнижчу комісію, score: ${calculateScore(chosenNetwork).toFixed(2)}`
  };
}
