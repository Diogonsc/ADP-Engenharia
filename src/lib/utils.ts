import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Função para abrir WhatsApp com mensagem personalizada
export function openWhatsApp(message?: string) {
  const defaultMessage =
    "Olá! Gostaria de falar com um engenheiro da ADP sobre um projeto de linha de transmissão ou subestação.";
  const finalMessage = message || defaultMessage;
  const encodedMessage = encodeURIComponent(finalMessage);
  window.open(`https://wa.me/5521999999999?text=${encodedMessage}`, '_blank');
}