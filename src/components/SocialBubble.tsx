import Image from "next/image";

export default function SocialBubble() {
  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-2">
      <a
        href="#"
        aria-label="Instagram"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-rs-red text-white shadow-sm transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
      <a
        href="#"
        aria-label="TikTok"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm transition-transform hover:scale-110"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M16.5 3c.4 2 1.8 3.5 3.8 3.8v2.9c-1.4 0-2.7-.4-3.8-1.2v6.4a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.9a2.8 2.8 0 1 0 1.9 2.7V3h2.9Z" />
        </svg>
      </a>
      <a
        href="https://www.wallapop.com/user/hectorr-472977162?_pid=wi&_uid=38659665"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Wallapop"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#3FE6C9] to-[#00B876] shadow-sm transition-transform hover:scale-110"
      >
        <div className="relative h-6 w-6 overflow-hidden rounded-full">
          <Image src="/wallapop.png" alt="Wallapop" fill sizes="24px" className="object-cover" />
        </div>
      </a>
    </div>
  );
}
