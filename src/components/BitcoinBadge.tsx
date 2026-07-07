export default function BitcoinBadge() {
  return (
    <div className="absolute bottom-2 left-2 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-[#F7931A] bg-black/80 text-center leading-none text-[#F7931A] shadow-sm">
      <span className="text-[7px] font-semibold tracking-wide">ACEPTAMOS</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
      >
        <path d="M17.06 10.5c.24-1.6-.98-2.46-2.65-3.03l.54-2.17-1.32-.33-.53 2.11c-.35-.09-.7-.17-1.06-.24l.53-2.13-1.32-.33-.54 2.17c-.29-.07-.57-.13-.84-.2l-1.82-.45-.35 1.41s.98.22.96.24c.53.13.63.49.61.77l-1.47 5.9c-.06.14-.2.36-.53.28.01.02-.96-.24-.96-.24l-.66 1.52 1.72.43c.32.08.63.17.94.24l-.55 2.2 1.32.33.54-2.17c.36.1.71.19 1.05.27l-.54 2.16 1.32.33.55-2.19c2.25.43 3.94.26 4.65-1.78.58-1.64-.03-2.58-1.21-3.2.86-.2 1.51-.76 1.68-1.92Zm-3.01 4.22c-.41 1.64-3.19.75-4.09.53l.73-2.93c.9.22 3.79.67 3.36 2.4Zm.41-4.24c-.37 1.49-2.69.73-3.44.55l.66-2.65c.75.19 3.17.54 2.78 2.1Z" />
      </svg>
      <span className="text-[8px] font-bold">Bitcoin</span>
    </div>
  );
}
