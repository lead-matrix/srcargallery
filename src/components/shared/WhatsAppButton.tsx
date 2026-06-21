import { MessageCircle, Phone } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Call button */}
      <a
        href="tel:+8801401238019"
        aria-label="Call SR Car Gallery"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0A1628] border border-[#B8943F]/25 text-white shadow-md hover:bg-[#162B52] hover:-translate-y-0.5 transition-all duration-300"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* WhatsApp button */}
      <a
        href="https://wa.me/8801401238019?text=Hello%20SR%20Car%20Gallery!%20I'm%20interested%20in%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] transition-all duration-300 whatsapp-btn"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  )
}
