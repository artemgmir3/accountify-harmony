import { Navbar, Hero, Calculator, Footer } from "@/components";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
    <title>My Blog</title>
      <Navbar />
      <Hero />
      
      {/* About Section */}
      <section id="about" className="flex items-center bg-white">
        <div className="max-w-site mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-8 md:mb-12 px-4">
            {t("about.title")}
          </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mobile-grid px-0 sm:px-4">
            {Object.entries(t("about.cards")).map(([key, card]: [string, any]) => (
              <div key={key} className="p-4 md:p-6 border rounded-lg hover:shadow-xl shadow-lg transition-shadow h-full">
                <h3 className="text-xl font-semibold text-black mb-3 md:mb-4">
                  {card.title}
                </h3>
                <p className="text-black text-base">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="flex items-center bg1">
        <div className="max-w-site mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-8 md:mb-12 px-4">
            {t("services.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mobile-grid px-0 sm:px-4">
            {Object.entries(t("services"))
              .filter(([key]) => key !== "title" && 
                !["restoration", "hr", "analysis"].includes(key))
              .map(([key, service]: [string, any]) => (
              <div key={key} className="bg-white p-4 md:p-6 rounded-lg hover:shadow-xl transition-shadow shadow-lg h-full flex flex-col">
                <h3 className="text-xl font-semibold text-black mb-3 md:mb-4">
                  {service.title}
                </h3>
                <div className="flex flex-col flex-grow">
                  <p className="text-black mb-4 text-base flex-grow">
                    {service.text}
                  </p>
                  <p className="text-black text-sm md:text-base mt-auto">
                    {service.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Calculator />
      <Footer />
    </div>
  );
};

export default Index;
