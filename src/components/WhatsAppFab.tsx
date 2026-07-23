const WHATSAPP_URL =
  'https://wa.me/917973070600?text=Namaste%20Achari%20Tiwari%2C%20I%27d%20like%20help%20with%20your%20products.';

const WhatsAppFab = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Achari Tiwari on WhatsApp"
    className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 inline-flex min-h-14 min-w-14 items-center justify-center gap-2.5 rounded-full border border-[#17320d] bg-[#25D366] p-1.5 text-[#10250a] shadow-[0_7px_0_#17320d,0_14px_28px_rgba(23,50,13,0.25)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_9px_0_#17320d,0_18px_32px_rgba(23,50,13,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b58235] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f6f0e4] active:translate-y-0.5 active:shadow-[0_4px_0_#17320d,0_9px_20px_rgba(23,50,13,0.24)] sm:pr-4"
  >
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#fffaf1]/80 bg-[#17320d] text-white">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-6 w-6 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"
        fill="currentColor"
      >
        <path d="M27.2 4.66A15.5 15.5 0 0 0 2.8 23.35L.6 31.4l8.24-2.16A15.48 15.48 0 0 0 16.25 31h.01A15.5 15.5 0 0 0 27.2 4.66ZM16.26 28.38h-.01a12.86 12.86 0 0 1-6.56-1.8l-.47-.28-4.89 1.28 1.3-4.76-.3-.49a12.87 12.87 0 1 1 10.93 6.05Zm7.05-9.64c-.39-.2-2.29-1.13-2.64-1.26-.36-.13-.62-.2-.88.2-.26.38-1 1.25-1.23 1.51-.23.26-.45.3-.84.1a10.55 10.55 0 0 1-3.1-1.91 11.61 11.61 0 0 1-2.15-2.68c-.23-.39-.03-.6.17-.79.18-.17.39-.45.58-.68.2-.22.26-.38.39-.64.13-.26.06-.49-.03-.68-.1-.2-.88-2.13-1.2-2.91-.32-.76-.65-.66-.88-.67h-.75c-.26 0-.68.1-1.04.49-.36.38-1.36 1.32-1.36 3.23 0 1.91 1.39 3.75 1.58 4.01.2.26 2.73 4.17 6.61 5.85.93.4 1.65.64 2.21.82.93.29 1.77.25 2.44.15.75-.11 2.29-.94 2.61-1.84.33-.9.33-1.68.23-1.84-.09-.16-.35-.26-.74-.45Z" />
      </svg>
    </span>
    <span className="hidden pr-1 text-xs font-bold uppercase tracking-[0.12em] sm:inline">WhatsApp</span>
  </a>
);

export default WhatsAppFab;
