"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNetworkData = fetchNetworkData;
const axios_1 = __importDefault(require("axios"));
// Функція для отримання даних про мережі
async function fetchNetworkData() {
    // Перевіряємо змінну середовища USE_REAL_API. Якщо вона встановлена в 'true', спробуємо отримати реальні дані.
    if (process.env.USE_REAL_API === 'true') {
        try {
            // Виконуємо запит до API BlockCypher для Ethereum
            const response = await axios_1.default.get('https://api.blockcypher.com/v1/eth/main');
            // Для прикладу, припустимо, що API повертає такі поля:
            // - high_fee_per_kb: рекомендована висока комісія
            // - avg_confirm_time: середній час підтвердження
            // - percent_full: відсоток завантаженості мережі (це умовний показник)
            const ethData = response.data;
            // Перетворюємо отримані дані у формат, що відповідає нашому інтерфейсу
            const networkData = [
                {
                    name: 'Ethereum',
                    // Якщо дані API відсутні, встановлюємо значення за замовчуванням
                    gasFee: ethData.high_fee_per_kb ? Number(ethData.high_fee_per_kb) : 100,
                    confirmationTime: ethData.avg_confirm_time ? Number(ethData.avg_confirm_time) : 15,
                    load: ethData.percent_full ? Number(ethData.percent_full) : 80,
                },
                // Для інших мереж поки що залишаємо мок-дані
                {
                    name: 'Polygon',
                    gasFee: 2,
                    confirmationTime: 2,
                    load: 20,
                },
                {
                    name: 'BSC',
                    gasFee: 5,
                    confirmationTime: 3,
                    load: 40,
                }
            ];
            return networkData;
        }
        catch (error) {
            console.error('Помилка отримання даних з API:', error);
            // Якщо виникла помилка, продовжуємо повертати мок-дані
        }
    }
    // Якщо режим реального API не увімкнено або при помилці, повертаємо мок-дані
    const mockData = [
        { name: 'Ethereum', gasFee: 100, confirmationTime: 15, load: 80 },
        { name: 'Polygon', gasFee: 2, confirmationTime: 2, load: 20 },
        { name: 'BSC', gasFee: 5, confirmationTime: 3, load: 40 }
    ];
    return mockData;
}
