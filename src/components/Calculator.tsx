import { useState, useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    calculateProductionCost,
    calculateWholesaleCost,
    calculateRetailCost,
    calculateServicesCost,
} from "@/utils/calculatorUtils";
import ContactForm from "./ContactForm";
import ProductionForm from "./calculator/ProductionForm";
import WholesaleForm from "./calculator/WholesaleForm";
import RetailForm from "./calculator/RetailForm";
import ServicesForm from "./calculator/ServicesForm";
import { CalculatorFormData } from "./calculator/types";
import { useLanguage } from "@/context/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const initialFormData: CalculatorFormData = {
    ownershipType: "organization",
    taxSystem: "main",
    employeeCount: 0,
    outgoingTTN: 0,
    incomingTTN: 0,
    vehicleCount: 0,
    hasClientBank: false,
    hasFEA: false,
    hasHR: false,
    hasCostAccounting: false,
    wildberries: false,
    ozon: false,
    incomingTTNPositions: 0,
    outgoingTTNPositions: 0,
    retailPoints: 0,
    actsCount: 0,
    advanceReportsCount: 0,
    tradeType: 'Wholesale',
};

const Calculator = () => {
    const { t } = useLanguage();
    const [totalCost, setTotalCost] = useState(0);
    const [activeTab, setActiveTab] = useState("production");
    const [formData, setFormData] =
        useState<CalculatorFormData>(initialFormData);

    // Определяем, мобильная ли версия, основываясь на ширине экрана
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Если используется SSR, проверяем наличие window
        if (typeof window !== "undefined") {
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    // Состояние для открытия/закрытия выпадающего меню на мобильных устройствах
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setFormData(initialFormData);
        setTotalCost(0);
        setDropdownOpen(false);
    }, [activeTab]);

    const handleInputChange = (
        field: string,
        value: string | number | boolean
    ) => {
        setFormData((prev) => {
            const newData = { ...prev, [field]: value };
            calculateCost(newData); // Вызываем функцию расчёта с обновлёнными данными
            return newData;
        });
    };

    const calculateCost = (data: CalculatorFormData) => {
        const params = {
            ...data,
            employeeCount: Number(data.employeeCount),
            outgoingTTN: Number(data.outgoingTTN),
            incomingTTN: Number(data.incomingTTN),
            vehicleCount: Number(data.vehicleCount),
            advanceReportsCount: Number(data.advanceReportsCount),
            actsCount: Number(data.actsCount),
            incomingTTNPositions: Number(data.incomingTTNPositions),
            outgoingTTNPositions: Number(data.outgoingTTNPositions),
            retailPoints: Number(data.retailPoints),
        };

        const cost =
            activeTab === "production"
                ? calculateProductionCost(params)
                : activeTab === "wholesale"
                    ? calculateWholesaleCost(params)
                    : activeTab === "retail"
                        ? calculateRetailCost(params)
                        : calculateServicesCost(params);

        setTotalCost(cost);
    };

    // Функция для смены активной вкладки (используется и в мобильном выпадающем меню)
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setDropdownOpen(false);
    };

    return (
        <>
            <section id="calculator" className="py-12 bg-white flex">
                <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-full bg-white border shadow-xl p-8 rounded-lg">
                        <h2 className="text-3xl font-bold text-black text-center mb-8">
                            {t("calculator.title")}
                        </h2>

                        {/* Оборачиваем все элементы табов в компонент Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            {isMobile ? (
                                // Мобильная версия — кастомное выпадающее меню
                                <div className="relative inline-block w-full mb-1">
                                    <Label>{t("calculator.form.tabs")}</Label>
                                    <Select onValueChange={(value) => handleTabChange(value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t("calculator.form.chtabs")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="production">{t("calculator.tabs.production")}</SelectItem>
                                            <SelectItem value="wholesale">{t("calculator.tabs.wholesale")}</SelectItem>
                                            <SelectItem value="retail">{t("calculator.tabs.retail")}</SelectItem>
                                            <SelectItem value="services">{t("calculator.tabs.services")}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            ) : (
                                // Десктопная версия — стандартный TabsList с TabsTrigger
                                <TabsList className="grid w-full grid-cols-4 mb-8">
                                    <TabsTrigger value="production">
                                        {t("calculator.tabs.production")}
                                    </TabsTrigger>
                                    <TabsTrigger value="wholesale">
                                        {t("calculator.tabs.wholesale")}
                                    </TabsTrigger>
                                    <TabsTrigger value="retail">
                                        {t("calculator.tabs.retail")}
                                    </TabsTrigger>
                                    <TabsTrigger value="services">
                                        {t("calculator.tabs.services")}
                                    </TabsTrigger>
                                </TabsList>
                            )}

                            {/* Контент вкладок */}
                            <TabsContent value="production">
                                <ProductionForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </TabsContent>

                            <TabsContent value="wholesale">
                                <WholesaleForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </TabsContent>

                            <TabsContent value="retail">
                                <RetailForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </TabsContent>

                            <TabsContent value="services">
                                <ServicesForm
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            </TabsContent>
                        </Tabs>

                        <div className="mt-8 text-center">
                            <p className="text-2xl text-black">
                                {t("calculator.cost")}: {totalCost} BYN
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 bg1">
                <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
                    <ContactForm
                        calculatedCost={totalCost}
                        calculatorData={{
                            ...formData,
                            calculatorType: activeTab,
                        }}
                    />
                </div>
            </section>
        </>
    );
};

export default Calculator;
