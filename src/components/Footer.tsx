import { Instagram, Globe, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const { t, setLanguage } = useLanguage();
  
  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-gradient-to-br py-10">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center img3 md:items-start">
            <img 
              src="/3.svg" 
              alt="Logo" 
              className="w-full max-w-[200px] cursor-pointer transition-transform hover:scale-105"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
          </div>

          {/* Navigation Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-burgundy mb-4">{t("footer.navigation")}</h3>
            <div className="space-y-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="block w-full text-center md:text-left text-white"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-center md:text-left text-white hover:text-burgundy"
              >
                {t("nav.about")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-center md:text-left text-white hover:text-burgundy"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={() => scrollToSection("calculator")}
                className="block w-full text-center md:text-left text-white hover:text-burgundy"
              >
                {t("nav.calculator")}
              </button>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-burgundy mb-4">{t("footer.contact")}</h3>
            <div className="space-y-2">
            <div className="space-y-2">
              <a href="tel:+375447247827"className="text-white">+375 (44) 724-78-27</a>
              </div>
              <div className="space-y-2">
              <a href="mailto:info@bilanx.by" className="text-white">info@bilanx.by</a>
              </div>
              <div className="flex justify-center md:justify-start space-x-4 mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-burgundy-dark"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-burgundy-dark"
                >
                  <Send size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours and Language Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-burgundy mb-4">{t("footer.workingHours")}</h3>
            <div className="space-y-2">
              <p className="text-white">{t("footer.workDays")}</p>
              <p className="text-white">{t("footer.weekends")}</p>
              
              {/* Mobile Language Selector */}
              <div className="md:hidden mt-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguage('ru')}>
                      Русский
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('by')}>
                      Беларуская
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-white mt-8">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
