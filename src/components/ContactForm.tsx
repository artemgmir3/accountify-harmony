
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { CalculatorFormData } from "./calculator/types";
import { useLanguage } from "@/context/LanguageContext";
import { Instagram, Send } from "lucide-react";

interface ContactFormProps {
  calculatedCost?: number;
  calculatorData?: CalculatorFormData & { calculatorType: string };
}

const ContactForm = ({ calculatedCost, calculatorData }: ContactFormProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            ...formData,
            calculated_cost: calculatedCost,
            ownership_type: calculatorData?.ownershipType,
            tax_system: calculatorData?.taxSystem,
            employee_count: calculatorData?.employeeCount,
            outgoing_ttn: calculatorData?.outgoingTTN,
            incoming_ttn: calculatorData?.incomingTTN,
            vehicle_count: calculatorData?.vehicleCount,
            has_client_bank: calculatorData?.hasClientBank,
            has_fea: calculatorData?.hasFEA,
            advance_reports_count: calculatorData?.advanceReportsCount,
            acts_count: calculatorData?.actsCount,
            incoming_ttn_positions: calculatorData?.incomingTTNPositions,
            outgoing_ttn_positions: calculatorData?.outgoingTTNPositions,
            retail_points: calculatorData?.retailPoints,
            calculator_type: calculatorData?.calculatorType,
            wildberries: calculatorData?.hasWB,
            ozon: calculatorData?.hasOZON,
          }
        ]);

      if (error) throw error;

      toast({
        title: t("contact.success.title"),
        description: t("contact.success.description"),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="max-w-site2 bg1 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        {/* Контактная информация */}
        <div className="p-8 rounded-lg shadow-xl bg-white">
          <h3 className="text-2xl font-bold text-black mb-6">
            {t("contact.info.title")}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-cxl mb-2">{t("contact.info.phone")}</p>
              <a href="tel:+375447247827" className="text-cxl">+375 (44) 724-78-27</a>
            </div>
            <div>
              <p className="text-cxl2 mb-2">{t("contact.info.email")}</p>
              <a href="mailto:info@bilanx.by" className="text-cxl2">info@bilanx.by</a>
            </div>
          </div>
          <div className="flex md:justify-start space-x-4 mt-4">
            <p className="text-cxl2">{t("contact.info.instagram")}</p>
          </div>
          <div className="flex md:justify-start space-x-4 mt-2">
            <p className="text-cxl2">bilanx.by</p>
            <a
              href="https://www.instagram.com/bilanx.by?igsh=b3Z0YngwdHpwdTZy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-burgundy-dark mt-2"
            >
              <Instagram size={16} />
            </a>
          </div>
          <div className="flex md:justify-start space-x-4 mt-4">
            <p className="text-cxl2">{t("contact.info.telegram")}</p>
          </div>
          <div className="flex md:justify-start space-x-4 mt-2">
            <p className="text-cxl2">@bilanx.by</p>
            <a
              href="https://t.me/bilanxby"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-burgundy-dark mt-2"
            >
              <Send size={16} />
            </a>
          </div>
        </div>

        {/* Форма заявки */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h3 className="text-2xl font-bold text-black mb-6">
            {t("contact.title")}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {calculatedCost && (
              <div className="mb-6">
                <p className="text-xxcl text-black">
                  {calculatedCost} BYN
                </p>
              </div>
            )}

            <Input 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("contact.form.name")}
              required 
              className="focus:border-gold"
            />
            <Input 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("contact.form.email")}
              required 
              className="focus:border-gold"
            />
            <Input 
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("contact.form.phone")}
              required 
              className="focus:border-gold"
            />
            <Textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t("contact.form.message")}
              className="h-32 focus:border-gold" 
            />
            <Button 
              type="submit" 
              className="w-full bg-gold hover:bg-gold-dark text-black transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
