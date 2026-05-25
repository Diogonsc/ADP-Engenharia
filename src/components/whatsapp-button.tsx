import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SiteLogo } from "@/components/site-logo";
import { openWhatsApp } from "@/lib/utils";
import { useGtag } from "@/hooks/use-gtag";
import { cn } from "@/lib/utils";

const WHATSAPP_MESSAGE =
  "Olá! Gostaria de falar com um engenheiro da ADP sobre um projeto de linha de transmissão ou subestação.";

function checkBusinessHours() {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();

  return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
}

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { trackConversion } = useGtag();

  useEffect(() => {
    setIsOnline(checkBusinessHours());

    const interval = setInterval(() => {
      setIsOnline(checkBusinessHours());
    }, 60_000);

    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 13_000);

    return () => {
      clearInterval(interval);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleWhatsAppClick = () => {
    trackConversion("lead_whatsapp", 1.0, "BRL", {
      custom_parameters: {
        source: "whatsapp_button",
        service: "engenharia",
      },
    });

    openWhatsApp(WHATSAPP_MESSAGE);
    setShowTooltip(false);
  };

  return (
    <div className="whatsapp-widget fixed right-6 bottom-16 z-998 sm:bottom-[4.5rem]">
      {showTooltip && (
        <div
          className="whatsapp-modal animate-whatsapp-tooltip"
          role="dialog"
          aria-label="Convite para conversar no WhatsApp"
        >
          <Card className="whatsapp-modal__card gap-0 overflow-visible rounded-lg border-border bg-bg-primary py-0 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <CardContent className="relative p-4 sm:p-5">
              <Button
                type="button"
                onClick={() => setShowTooltip(false)}
                variant="ghost"
                size="icon-sm"
                className="absolute top-2 right-2 text-text-muted hover:text-text-primary"
                aria-label="Fechar"
              >
                <X className="size-4" aria-hidden />
              </Button>

              <div className="pr-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-md bg-brand-subtle p-2">
                    <SiteLogo className="size-full object-contain" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-base font-semibold text-text-primary">
                      ADP Engenharia
                    </p>
                    <p className="text-sm text-text-secondary">
                      {isOnline
                        ? "Equipe disponível agora"
                        : "Fora do horário de atendimento"}
                    </p>
                  </div>
                </div>

                <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                  <span className="font-semibold text-text-primary">Olá!</span>{" "}
                  Preciso de apoio técnico sobre LT, subestação ou automação.
                </p>

                <div className="mb-4 flex items-center gap-2 text-xs text-text-muted">
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      isOnline ? "bg-brand-vivid" : "bg-border",
                    )}
                    aria-hidden
                  />
                  <span>Segunda a sexta, 8h às 18h</span>
                </div>

                <Button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full"
                >
                  Iniciar conversa no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Button
        type="button"
        onClick={handleWhatsAppClick}
        size="icon"
        className={cn(
          "size-14 shrink-0 rounded-full bg-brand-vivid text-white shadow-lg",
          "transition-all duration-300 hover:-translate-y-px hover:bg-brand-light",
          "animate-pulse-ring",
        )}
        aria-label="Falar no WhatsApp com a ADP Engenharia"
      >
        <FaWhatsapp className="size-7" aria-hidden />
      </Button>
    </div>
  );
}
