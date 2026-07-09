/**
 * Persistent devotional credit, shown on every screen throughout the app.
 * Desktop: full card docked bottom-right.
 * Mobile: compact pill anchored to the upper-right, below the header, so it
 * never overlaps the reader's bottom audio/run controls.
 */
export default function CreditBadge() {
  return (
    <div className="pointer-events-none fixed right-1.5 top-36 z-40 md:bottom-4 md:right-4 md:top-auto">
      <div className="flex max-w-[13rem] items-center gap-2 rounded-full border-2 border-primary/55 bg-secondary/95 px-2 py-1.5 text-secondary-foreground shadow-xl backdrop-blur-md md:gap-3 md:rounded-2xl md:px-4 md:py-3">
        <img
          src="/author.jpg"
          alt="राजकुमार अरथुना"
          className="h-9 w-9 shrink-0 rounded-full border-2 border-primary object-cover md:h-12 md:w-12"
        />
        <div className="min-w-0 text-left leading-tight">
          <p className="hidden text-[10px] uppercase tracking-wide text-primary/90 md:block">
            An effort by humble Rambhakt-
          </p>
          <p className="truncate font-serif text-xs font-bold md:text-sm">राजकुमार अरथुना</p>
          <p className="truncate text-[10px] text-primary md:text-xs">🌺 🙏 सीताराम 🙏 🌺</p>
        </div>
      </div>
    </div>
  );
}
