import { JsonRpcProvider, parseEther, Wallet } from 'ethers';
import 'dotenv/config';

const provider = new JsonRpcProvider(process.env.INFURA_API_URL);
const privateKey = process.env.PRIVATE_KEY || '';
const wallet = new Wallet(privateKey, provider);

export async function sendTransaction(to: string, amount: number) {
  try {
    const tx = await wallet.sendTransaction({
      to,
      value: parseEther(amount.toString())
    });
    return await tx.wait(); // Очікуємо підтвердження транзакції
  } catch (error) {
    throw new Error(`Transaction failed: ${error}`);
  }
}