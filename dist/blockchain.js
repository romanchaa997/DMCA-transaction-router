"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = sendTransaction;
const ethers_1 = require("ethers");
require("dotenv/config");
const provider = new ethers_1.JsonRpcProvider(process.env.INFURA_API_URL);
const privateKey = process.env.PRIVATE_KEY || '';
const wallet = new ethers_1.Wallet(privateKey, provider);
async function sendTransaction(to, amount) {
    try {
        const tx = await wallet.sendTransaction({
            to,
            value: (0, ethers_1.parseEther)(amount.toString())
        });
        return await tx.wait(); // Очікуємо підтвердження транзакції
    }
    catch (error) {
        throw new Error(`Transaction failed: ${error}`);
    }
}
