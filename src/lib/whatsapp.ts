import { primaryWhatsapp } from "@/config/site"

export const defaultWhatsappMessage = "Olá! Vi o site e gostaria de um orçamento de mudança."

export function whatsappLink(message: string = defaultWhatsappMessage, number: string = primaryWhatsapp.number) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
