"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNetworkData = void 0;
const axios_1 = __importDefault(require("axios"));
async function fetchNetworkData() {
    if (process.env.USE_REAL_API === 'true') {
        try {
            const response = await axios_1.default.get('https://api.blockcypher.com/v1/eth/main');
            const ethData = response.data; // Використовуємо any для спрощення типізації
            const networkData = [
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
        }
        catch (error) {
            console.error('Помилка отримання даних з API:', error);
        }
    }
    // Якщо режим реального API не увімкнено або при помилці – повертаємо мок-дані
    const mockData = [
        { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
        { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
        { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 },
        { name: 'Avalanche', gasFee: 10, confirmationTime: 5, load: 50 },
        { name: 'Solana', gasFee: 0.001, confirmationTime: 1, load: 30 }
    ];
    return mockData;
}
exports.fetchNetworkData = fetchNetworkData;
