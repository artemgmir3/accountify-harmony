
export interface CalculatorFormData {
  ownershipType: string;
  taxSystem: string;
  employeeCount: number;
  outgoingTTN: number;
  incomingTTN: number;
  vehicleCount: number;
  hasClientBank: boolean;
  hasFEA: boolean;
  hasHR: boolean;
  wildberries: boolean;
  ozon: boolean;
  hasCostAccounting: boolean;
  incomingTTNPositions?: number;
  outgoingTTNPositions?: number;
  retailPoints?: number;
  actsCount?: number;
  advanceReportsCount?: number;
  tradeType: string;
  hasWB: boolean;
  hasOZON: boolean;
}

export interface CalculatorFormProps {
  formData: CalculatorFormData;
  handleInputChange: (field: string, value: string | number | boolean) => void;
}
