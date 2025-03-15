"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeTransaction = routeTransaction;
const networkData_1 = require("./networkData");
async function routeTransaction(input) {
    const networks = await (0, networkData_1.fetchNetworkData)();
    // Обчислення "score": gasFee (0.4), confirmationTime (0.3), load (0.2), averageBlockTime (0.05), reliability (-0.1)
    const calculateScore = (net) => {
        return (net.gasFee * 0.4 +
            net.confirmationTime * 0.3 +
            net.load * 0.2 +
            net.averageBlockTime * 0.05 -
            net.reliability * 0.1);
    };
    const chosenNetwork = networks.reduce((prev, curr) => {
        return calculateScore(curr) < calculateScore(prev) ? curr : prev;
    });
    return {
        chosenNetwork,
        rationale: `Вибрано мережу ${chosenNetwork.name} через найнижчу комісію, score: ${calculateScore(chosenNetwork).toFixed(2)}`
    };
}
