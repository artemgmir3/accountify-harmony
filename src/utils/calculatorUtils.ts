
interface CalculationParams {
  ownershipType: string;
  taxSystem: string;
  employeeCount: number;
  outgoingTTN: number;
  incomingTTN: number;
  vehicleCount: number;
  hasClientBank: boolean;
  hasFEA: boolean;
  hasHR: boolean;
  hasWB: boolean;
  hasOZON: boolean;
  hasCostAccounting: boolean;
  incomingTTNPositions?: number;
  outgoingTTNPositions?: number;
  retailPoints?: number;
  actsCount?: number;
  advanceReportsCount?: number;
}

export const calculateProductionCost = (params: CalculationParams): number => {
    let cost = 0;
    let cost1 = 0;
    let cost2 = 0;
    let cost3 = 0;
    let cost4 = 0;
    
    if (params.ownershipType == 'organization') {
        switch (params.taxSystem) {
            case 'main':
                cost = 210;
                cost += params.employeeCount * 50 * 1.4;
                cost += params.outgoingTTN * 5 * 1.4;
                cost += params.incomingTTN * 5 * 1.4;
                cost += params.vehicleCount * 50 * 1.4;
                cost += (params.advanceReportsCount || 0) * 5 * 1.4;
                break;
            case 'simplified':
                cost = 180;
                cost += params.employeeCount * 50 * 1.2;
                cost += params.outgoingTTN * 5 * 1.2;
                cost += params.incomingTTN * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
        }
    }
    if (params.ownershipType == 'individual') {
        switch (params.taxSystem) {
            case 'main':
                cost = 120;
                cost += params.employeeCount * 50 * 1.2;
                cost += params.outgoingTTN * 5 * 1.2;
                cost += params.incomingTTN * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
            case 'singletax':
                cost = 100;
                cost += params.employeeCount * 50;
                cost += params.outgoingTTN * 5;
                cost += params.incomingTTN * 5;
                cost += params.vehicleCount * 50;
                cost += (params.advanceReportsCount || 0) * 5;
                break;
        }
    }

    if (params.hasClientBank) cost1 = cost * 0.4;
    if (params.hasFEA) cost2 = cost * 0.2;
    if (params.hasHR) cost3 = cost * 0.05;
    cost4 = cost;
    cost = cost1 + cost2 + cost3 + cost4;
    cost = Math.round(cost * 100) / 100;
    return cost;
};

export const calculateWholesaleCost = (params: CalculationParams): number => {
    let cost = 0;
    let cost1 = 0;
    let cost2 = 0;
    let cost3 = 0;
    let cost4 = 0;

    if (params.ownershipType == 'organization') {
        switch (params.taxSystem) {
            case 'main':
                cost = 210;
                cost += params.employeeCount * 50 * 1.4;
                cost += (params.outgoingTTN + params.incomingTTN) * 4.5 * 1.4;
                cost += (params.incomingTTNPositions || 0) * (params.incomingTTN) * 0.5 * 1.4;
                cost += (params.outgoingTTNPositions || 0) * (params.outgoingTTN) * 0.5 * 1.4;
                cost += params.vehicleCount * 50 * 1.4;
                cost += (params.advanceReportsCount || 0) * 5 * 1.4;
                break;
            case 'simplified':
                cost = 180;
                cost += params.employeeCount * 50 * 1.2;
                cost += (params.outgoingTTN + params.incomingTTN) * 4.5 * 1.2;
                cost += (params.incomingTTNPositions || 0) * (params.incomingTTN) * 0.5 * 1.2;
                cost += (params.outgoingTTNPositions || 0) * (params.outgoingTTN) * 0.5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
        }
    }
    if (params.ownershipType == 'individual') {
        switch (params.taxSystem) {
            case 'main':
                cost = 120;
                cost += params.employeeCount * 50 * 1.2;
                cost += params.outgoingTTN * 4.5 * 1.2;
                cost += params.incomingTTN * 4.5 * 1.2;
                cost += (params.incomingTTNPositions || 0) * (params.incomingTTN) * 0.5 * 1.2;
                cost += (params.outgoingTTNPositions || 0) * (params.outgoingTTN) * 0.5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
            case 'singletax':
                cost = 100;
                cost += params.employeeCount * 50;
                cost += params.outgoingTTN * 4.5;
                cost += params.incomingTTN * 4.5;
                cost += (params.incomingTTNPositions || 0) * (params.incomingTTN) * 0.5;
                cost += (params.outgoingTTNPositions || 0) * (params.outgoingTTN) * 0.5;
                cost += params.vehicleCount * 50;
                cost += (params.advanceReportsCount || 0) * 5;
                break;
        }
    }

    if (params.hasClientBank) cost1 = cost * 0.5;
    if (params.hasFEA) cost2 = cost * 0.3;
    if (params.hasHR) cost3 = cost * 0.05;
    if (params.hasWB) cost = cost + 100;
    if (params.hasOZON) cost = cost + 100;
    cost4 = cost;
    cost = cost1 + cost2 + cost3 + cost4;
    cost = Math.round(cost * 100) / 100;
    return cost;
};

export const calculateRetailCost = (params: CalculationParams): number => {
    let cost = 0;
    let cost1 = 0;
    let cost2 = 0;
    let cost3 = 0;
    let cost4 = 0;

    if (params.ownershipType == 'organization') {
        switch (params.taxSystem) {
            case 'main':
                cost = 210;
                if ((params.retailPoints || 0) >= 1) {
                    cost = cost - 50 * 1.4;
                }
                cost += params.employeeCount * 50 * 1.4;
                cost += (params.retailPoints || 0) * 50 * 1.4;
                cost += params.incomingTTN * 5 * 1.4;
                cost += params.vehicleCount * 50 * 1.4;
                cost += (params.advanceReportsCount || 0) * 5 * 1.4;
                break;
            case 'simplified':
                cost = 180;
                if ((params.retailPoints || 0) >= 1) {
                    cost = cost - 50 * 1.2;
                }
                cost += params.employeeCount * 50 * 1.2;
                cost += (params.retailPoints || 0) * 50 * 1.2;
                cost += params.incomingTTN * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
        }
    }
    if (params.ownershipType == 'individual') {
        switch (params.taxSystem) {
            case 'main':
                cost = 120;
                if ((params.retailPoints || 0) >= 1) {
                    cost = cost - 50 * 1.2;
                }
                cost += params.employeeCount * 50 * 1.2;
                cost += (params.retailPoints || 0) * 50 * 1.2;
                cost += params.incomingTTN * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
            case 'singletax':
                cost = 100;
                if ((params.retailPoints || 0) >= 1) {
                    cost = cost - 50;
                }
                cost += params.employeeCount * 50;
                cost += (params.retailPoints || 0) * 50;
                cost += params.incomingTTN * 5;
                cost += params.vehicleCount * 50;
                cost += (params.advanceReportsCount || 0) * 5;
                break;
        }
    }

    if (params.hasClientBank) cost1 = cost * 0.5;
    if (params.hasFEA) cost2 = cost * 0.3;
    if (params.hasHR) cost3 = cost * 0.1;
    cost4 = cost;
    cost = cost1 + cost2 + cost3 + cost4;
    cost = Math.round(cost * 100) / 100;
    return cost;
};

export const calculateServicesCost = (params: CalculationParams): number => {
    let cost = 0;
    let cost1 = 0;
    let cost2 = 0;
    let cost3 = 0;
    let cost4 = 0;

    if (params.ownershipType == 'organization') {
        switch (params.taxSystem) {
            case 'main':
                cost = 210;
                cost += params.employeeCount * 50 * 1.4;
                cost += (params.actsCount || 0) * 5 * 1.4;
                cost += params.vehicleCount * 50 * 1.4;
                cost += (params.advanceReportsCount || 0) * 5 * 1.4;
                break;
            case 'simplified':
                cost = 180;
                cost += params.employeeCount * 50 * 1.2;
                cost += (params.actsCount || 0) * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
        }
    }
    if (params.ownershipType == 'individual') {
        switch (params.taxSystem) {
            case 'main':
                cost = 120;
                cost += params.employeeCount * 50 * 1.2;
                cost += (params.actsCount || 0) * 5 * 1.2;
                cost += params.vehicleCount * 50 * 1.2;
                cost += (params.advanceReportsCount || 0) * 5 * 1.2;
                break;
            case 'singletax':
                cost = 100;
                cost += (params.actsCount || 0) * 5;
                cost += params.employeeCount * 50;
                cost += params.vehicleCount * 50;
                cost += (params.advanceReportsCount || 0) * 5;
                break;
        }
    }

    if (params.hasClientBank) cost1 = cost * 0.3;
    if (params.hasFEA) cost2 = cost * 0.2;
    if (params.hasHR) cost3 = cost * 0.05;
    cost4 = cost;
    cost = cost1 + cost2 + cost3 + cost4;
    cost = Math.round(cost * 100) / 100;
    return cost;
};
