import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Section } from "lucide-react";
import { useState } from "react";

const Hero = () => {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    const scrollToCalculator = () => {
        const element = document.getElementById("calculator");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const scrollToContacts = () => {
        const element = document.getElementById("contact");
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (element.clientHeight / 2);

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        
        <div className="relative max-w-site4 min-h-screen flex items-center justify-center bg-gradient-to-br text-white pt-24">
            <div className="mx-auto sm:px-6 lg:px-8 py-32 text-center">
                <h1 className="text-4xl text-6xl font-bold mb-8 animate-fadeIn text-gold">
                    {t("hero.title")}
                </h1>
                <p className="text-xl sm:text-2xl mb-12 max-w-3xl mx-auto opacity-90 animate-fadeIn">
                    {t("hero.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                        className="bg-gold text-black hover:bg-gold-dark font-semibold text-lg px-8 py-6"
                        onClick={scrollToCalculator}
                    >
                        {t("hero.calculate")}
                    </Button>
                    <Button
                        className="bg-white text-black hover:bg-gray-100 font-semibold text-lg px-1488 py-6 flex items-center transition-all duration-3000"
                        onClick={scrollToContacts}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {t("hero.contacts")}
                        <div className="flex items-center ml-2">
                            {/* Основная горизонтальная линия, растягивающаяся при наведении */}
                            <span
                                className={`block bg-current h-0.5 transition-all duration-300 ${isHovered ? "w-12" : "w-4"
                                    }`}
                            ></span>
                            {/* Контейнер для наконечника стрелки */}
                            <div className="relative w-4 h-4 -ml-[3px]">
                                {/* Верхняя наклонная линия */}
                                <span
                                    className="absolute left-0 top-0 block bg-current h-0.5 w-2 transform rotate-45 mt-[2px]"
                                    style={{ transformOrigin: "left top" }}
                                ></span>
                                {/* Нижняя наклонная линия */}
                                <span
                                    className="absolute left-0 bottom-0 block bg-current h-0.5 w-2 transform -rotate-45 mb-[2px]"
                                    style={{ transformOrigin: "left bottom" }}
                                ></span>
                            </div>
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
