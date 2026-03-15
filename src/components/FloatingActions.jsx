export default function FloatingActions() {
  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-50 flex flex-col items-end gap-5">
      
      {/* WhatsApp - Luxury Green Gloss */}
      <a
        href="https://wa.me/918805647199"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative overflow-hidden w-15 h-15 rounded-full bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] shadow-[0_15px_35px_rgba(37,211,102,0.4)] grid place-items-center ring-4 ring-white/90 hover:scale-110 hover:shadow-[0_20px_45px_rgba(37,211,102,0.6)] transition-all duration-300 animate-premium-bounce shiny-sweep"
        style={{ width: '60px', height: '60px' }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white" className="relative z-10 drop-shadow-lg">
          <path d="M20.52 3.48A11.79 11.79 0 0 0 12 .75C5.85.75.87 5.73.87 11.9c0 2.05.54 4.06 1.56 5.83L.75 23.25l5.69-1.51a11.9 11.9 0 0 0 5.56 1.42h.01c6.15 0 11.13-4.98 11.13-11.15 0-2.98-1.16-5.78-3.62-8.53ZM12 21.12h-.01a10.17 10.17 0 0 1-5.18-1.42l-.37-.22-3.38.9.9-3.29-.24-.34a10.21 10.21 0 0 1-1.6-5.42c0-5.64 4.59-10.23 10.24-10.23 2.73 0 5.29 1.05 7.22 2.95a10.12 10.12 0 0 1 3 7.19c0 5.64-4.59 10.18-10.19 10.18Zm5.6-7.64c-.3-.15-1.76-.86-2.03-.95-.27-.1-.46-.15-.66.15-.2.3-.76.95-.93 1.14-.17.2-.34.23-.64.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.51.15-.17.2-.3.3-.51.1-.2.05-.39-.02-.55-.08-.15-.66-1.58-.9-2.16-.24-.58-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.08-.79.39-.27.3-1.04 1.02-1.04 2.47s1.07 2.86 1.22 3.05c.15.2 2.1 3.21 5.07 4.5.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.07-.12-.27-.2-.57-.35Z"/>
        </svg>
      </a>

      {/* Call - Premium Blue Chrome */}
      <a
        href="tel:8805647199"
        aria-label="Call Expert"
        className="relative overflow-hidden w-15 h-15 rounded-full bg-gradient-to-br from-[#0ea5e9] via-[#2563eb] to-[#1e40af] shadow-[0_15px_35px_rgba(37,99,235,0.4)] grid place-items-center ring-4 ring-white/90 hover:scale-110 hover:shadow-[0_20px_45px_rgba(37,99,235,0.6)] transition-all duration-300 animate-premium-bounce shiny-sweep"
        style={{ width: '60px', height: '60px', animationDelay: '500ms' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="relative z-10 drop-shadow-lg">
          <path d="M6.62 10.79a15.09 15.09 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.25c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C11.27 22 2 12.73 2 2a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/>
        </svg>
      </a>
    </div>
  )
}