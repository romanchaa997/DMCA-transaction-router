"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTransaction = void 0;
const networkData_1 = require("./networkData");
async function routeTransaction(input) {
    // Отримуємо дані про мережі
    const networks = await (0, networkData_1.fetchNetworkData)();
    // Простий алгоритм: вибираємо мережу з найнижчим gasFee
    const chosenNetwork = networks.reduce((prev, curr) => (curr.gasFee < prev.gasFee ? curr : prev));
    return {
        chosenNetwork,
        rationale: `Вибрано мережу ${chosenNetwork.name} через найнижчу комісію (${chosenNetwork.gasFee}).`
    };
}
exports.routeTransaction = routeTransaction;
