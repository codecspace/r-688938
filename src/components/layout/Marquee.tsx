interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  textClassName?: string;
}

/**
 * Infinite scrolling ticker band. Used as a rhythm-setting divider between
 * major sections — a small recurring motif rather than another one-off
 * effect, the way habanify-style sites repeat one signature move well.
 */
const Marquee = ({ items, className = "", reverse = false, textClassName = "" }: MarqueeProps) => {
  const content = [...items, ...items];

  return (
    <div className={`marquee-row overflow-hidden ${className}`}>
      <div
        className="marquee-track"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {content.map((item, i) => (
          <span
            key={i}
            className={`flex items-center shrink-0 px-6 whitespace-nowrap text-sm md:text-base uppercase tracking-[0.3em] font-medium ${textClassName}`}
          >
            {item}
            <span className="ml-6 text-lion-gold text-xs">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
