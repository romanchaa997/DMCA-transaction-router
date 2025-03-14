"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactionRouter_1 = require("./transactionRouter");
// Мокаємо функцію fetchNetworkData для тестування логіки маршрутизації
jest.mock('./networkData', () => {
    return {
        fetchNetworkData: async () => {
            const networks = [
                { name: 'Ethereum', gasFee: 110, confirmationTime: 20, load: 80, averageBlockTime: 14, reliability: 98 },
                { name: 'Polygon', gasFee: 2.5, confirmationTime: 2, load: 25, averageBlockTime: 2.5, reliability: 95 },
                { name: 'BSC', gasFee: 6, confirmationTime: 3, load: 45, averageBlockTime: 3, reliability: 88 },
                { name: 'Avalanche', gasFee: 15, confirmationTime: 4, load: 55, averageBlockTime: 2, reliability: 93 },
                { name: 'Solana', gasFee: 0.001, confirmationTime: 1, load: 30, averageBlockTime: 0.5, reliability: 85 }
            ];
            return networks;
        }
    };
});
describe('routeTransaction', () => {
    it('повинна повернути мережу з рядком "score:" в rationale', async () => {
        const result = await (0, transactionRouter_1.routeTransaction)({
            sender: '0x1234567890abcdef1234567890abcdef12345678',
            recipient: '0xabcdef1234567890abcdef1234567890abcdef12',
            amount: 1,
            token: 'ETH'
        });
        expect(result.rationale).toMatch(/score:/);
    });
});
