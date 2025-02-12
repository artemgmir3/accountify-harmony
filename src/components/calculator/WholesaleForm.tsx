import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalculatorFormProps } from "./types";
import { useLanguage } from "@/context/LanguageContext";

const WholesaleForm = ({ formData, handleInputChange }: CalculatorFormProps) => {
    const { t } = useLanguage();
    const renderTaxSystemOptions = () => {
        if (formData.ownershipType === "organization") {
            return (
                <>
                    <SelectItem value="main">{t("calculator.form.mainTax")}</SelectItem>
                    <SelectItem value="simplified">{t("calculator.form.simplifiedTax")}</SelectItem>
                </>
            );
        } else if (formData.ownershipType === "individual") {
            return (
                <>
                    <SelectItem value="main">{t("calculator.form.mainTax")}</SelectItem>
                    <SelectItem value="singletax">{t("calculator.form.singletax")}</SelectItem>
                </>
            );
        } else {
            // Если тип собственности ещё не выбран, можно вернуть пустой список или дефолтное значение
            return (
                <>
                    <SelectItem value="main">{t("calculator.form.mainTax")}</SelectItem>
                </>
            );
        }
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>{t("calculator.form.ownershipType")}</Label>
                    <Select onValueChange={(value) => handleInputChange("ownershipType", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("calculator.form.chowtype")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="organization">{t("calculator.form.organization")}</SelectItem>
                            <SelectItem value="individual">{t("calculator.form.individual")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>{t("calculator.form.taxSystem")}</Label>
                    <Select onValueChange={(value) => handleInputChange("taxSystem", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t("calculator.form.chtax")} />
                        </SelectTrigger>
                        <SelectContent>{renderTaxSystemOptions()}</SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>{t("calculator.form.employeeCount")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("employeeCount", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>{t("calculator.form.outgoingTTN")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("incomingTTN", e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>{t("calculator.form.incomingTTN")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("outgoingTTN", e.target.value)} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>{t("calculator.form.incomingTTNPositions")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("incomingTTNPositions", e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>{t("calculator.form.outgoingTTNPositions")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("outgoingTTNPositions", e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>{t("calculator.form.advanceReports")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("advanceReportsCount", e.target.value)} />
                </div>

                <div className="space-y-2">
                    <Label>{t("calculator.form.vehicleCount")}</Label>
                    <Input type="number" min="0" onChange={(e) => handleInputChange("vehicleCount", e.target.value)} />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center hidden space-x-2">
                        <Checkbox id="client-bank" onCheckedChange={(checked) => handleInputChange("hasClientBank", checked)} />
                        <Label htmlFor="client-bank">{t("calculator.form.clientBank")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="fea" onCheckedChange={(checked) => handleInputChange("hasFEA", checked)} />
                        <Label htmlFor="fea">{t("calculator.form.fea")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="hr" onCheckedChange={(checked) => handleInputChange("hasHR", checked)} />
                        <Label htmlFor="hr">{t("calculator.form.hr")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="hr" onCheckedChange={(checked) => handleInputChange("hasWB", checked)} />
                        <Label htmlFor="wildberries">{t("calculator.form.wb")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="fea" onCheckedChange={(checked) => handleInputChange("hasOZON", checked)} />
                        <Label htmlFor="ozon">{t("calculator.form.ozon")}</Label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WholesaleForm;