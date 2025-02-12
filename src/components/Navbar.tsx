import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/translations/index"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
    const { t, setLanguage } = useLanguage();

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - (window.innerHeight / 2) + (element.clientHeight / 2);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gold/10">
          <div className="max-w-site3 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16">
              <img 
                src={t("nav.logo")}
                alt="Logo" 
                className="h-full img2 cursor-pointer transition-transform hover:scale-105"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="min-w-[70px] text-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-black hover:text-gold transition-colors"
              >
                {t("nav.home")}
              </button>
            </div>
            <div className="min-w-[70px] text-center">
              <button
                onClick={() => scrollToSection("about")}
                className="text-black hover:text-gold transition-colors"
              >
                {t("nav.about")}
              </button>
            </div>
            <div className="min-w-[70px] text-center">
              <button
                onClick={() => scrollToSection("services")}
                className="text-black hover:text-gold transition-colors"
              >
                {t("nav.services")}
              </button>
            </div>
            <div className="min-w-[100px] text-center">
              <button
                onClick={() => scrollToSection("calculator")}
                className="text-black hover:text-gold transition-colors"
              >
                {t("nav.calculator")}
              </button>
            </div>
            <div className="min-w-[90px] text-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="text-black hover:text-gold transition-colors"
              >
                {t("nav.contacts")}
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black hover:text-gold">
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

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gold/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="block w-full text-left px-3 py-2 text-black hover:text-gold hover:bg-gold/5 rounded-md"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-3 py-2 text-black hover:text-gold hover:bg-gold/5 rounded-md"
            >
              {t("nav.about")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left px-3 py-2 text-black hover:text-gold hover:bg-gold/5 rounded-md"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="block w-full text-left px-3 py-2 text-black hover:text-gold hover:bg-gold/5 rounded-md"
            >
              {t("nav.calculator")}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-3 py-2 text-black hover:text-gold hover:bg-gold/5 rounded-md"
            >
              {t("nav.contacts")}
            </button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black w-full justify-start px-3 py-2 mobile-translation-icon">
                  <Globe className="h-5 w-5 mr-2" />
                  {t("nav.language")}
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
      )}
    </nav>
  );
};

export default Navbar;