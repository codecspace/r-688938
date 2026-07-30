/** Minimal branded fallback for lazy route chunks. */
const RouteFallback = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center gap-5 bg-lion-paper">
    <div className="w-9 h-9 rounded-full border-2 border-lion-gold/25 border-t-lion-gold animate-spin" />
    <span className="text-[10px] uppercase tracking-[0.32em] text-lion-stone">Lionvest Realty</span>
  </div>
);

export default RouteFallback;
