// Hook personalizado para Google Ads gtag
export const useGtag = () => {
    /**
     * Rastreia uma conversão do Google Ads
     * @param conversionId - ID da conversão configurado no Google Ads (ex: 'lead_form')
     * @param value - Valor da conversão (opcional)
     * @param currency - Moeda (padrão: BRL)
     * @param customParams - Parâmetros personalizados adicionais
     */
    const trackConversion = (
      conversionId: string,
      value?: number,
      currency: string = 'BRL',
      customParams?: Record<string, any>
    ) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': `AW-17481696146/${conversionId}`,
          'value': value || 1.0,
          'currency': currency,
          ...customParams
        });
      }
    };
  
    /**
     * Rastreia um evento personalizado
     * @param action - Nome da ação (ex: 'button_click')
     * @param category - Categoria do evento (ex: 'engagement')
     * @param label - Rótulo opcional
     * @param value - Valor numérico opcional
     */
    const trackEvent = (
      action: string,
      category: string,
      label?: string,
      value?: number
    ) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        });
      }
    };
  
    /**
     * Rastreia uma visualização de página
     * @param pageTitle - Título da página
     * @param pageLocation - URL completa da página
     */
    const trackPageView = (pageTitle: string, pageLocation: string) => {
      if (typeof window !== 'undefined' && window.gtag) {
        // Atualizar configuração do Google Ads
        window.gtag('config', 'AW-17481696146', {
          page_title: pageTitle,
          page_location: pageLocation
        });
        
        // Também enviar como evento para melhor tracking
        window.gtag('event', 'page_view', {
          page_title: pageTitle,
          page_location: pageLocation,
          page_path: new URL(pageLocation).pathname
        });
      }
    };
  
    /**
     * Rastreia uma conversão com Enhanced Conversions (dados melhorados)
     * @param conversionId - ID da conversão
     * @param userData - Dados do usuário (email, telefone, etc.) - serão hasheados automaticamente
     * @param value - Valor da conversão
     * @param currency - Moeda
     */
    const trackConversionEnhanced = (
      conversionId: string,
      userData?: {
        email?: string;
        phone_number?: string;
        first_name?: string;
        last_name?: string;
      },
      value?: number,
      currency: string = 'BRL'
    ) => {
      if (typeof window !== 'undefined' && window.gtag) {
        const conversionData: any = {
          'send_to': `AW-17481696146/${conversionId}`,
          'value': value || 1.0,
          'currency': currency
        };
  
        // Adicionar dados do usuário se fornecidos (serão hasheados pelo Google)
        if (userData) {
          conversionData.user_data = userData;
        }
  
        window.gtag('event', 'conversion', conversionData);
      }
    };
  
    return {
      trackConversion,
      trackEvent,
      trackPageView,
      trackConversionEnhanced
    };
  };
  
  // Declaração global do gtag
  declare global {
    interface Window {
      gtag: (...args: any[]) => void;
      dataLayer: any[];
    }
  }