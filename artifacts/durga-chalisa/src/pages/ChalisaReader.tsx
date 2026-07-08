import React, { useRef, useEffect, useState } from 'react';
import { durgaChalisa } from '@/data/durga-chalisa';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { useSyncedScroll } from '@/hooks/use-synced-scroll';
import { useSearch } from '@/hooks/use-search';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { 
  Play, Pause, Volume2, VolumeX, Sun, Moon, 
  Search, Settings2, LocateFixed
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ChalisaReader() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);

  const { theme, toggleTheme } = useTheme();
  const { 
    isPlaying: audioPlaying, 
    togglePlayPause: toggleAudio, 
    progress: audioProgress, 
    seek: audioSeek, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute,
    playbackRate,
    setPlaybackRate,
    audioRef,
  } = useAudioPlayer();

  // The teleprompter's scroll position is derived directly from the audio's
  // live playback position, so speed changes (via playbackRate) and the
  // scroll always stay perfectly in sync -- no independent timer to drift.
  const { isFollowing, resync } = useSyncedScroll(scrollRef, audioRef, audioPlaying);

  const { query, setQuery, results } = useSearch();

  const isPlaying = audioPlaying;
  const togglePlayback = toggleAudio;

  // Highlight effect clear
  useEffect(() => {
    if (activeHighlightId === null) return;
    const timer = setTimeout(() => setActiveHighlightId(null), 3000);
    return () => clearTimeout(timer);
  }, [activeHighlightId]);

  const scrollToLine = (id: number) => {
    const el = document.getElementById(`verse-${id}`);
    if (el && scrollRef.current) {
      // Offset a bit so it's not glued to the top
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      scrollRef.current.scrollBy({
        top: elTop - containerTop - 150,
        behavior: 'smooth'
      });
      setActiveHighlightId(id);
      setQuery(''); // clear search after selection
    }
  };

  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-background overflow-hidden selection:bg-primary/30">
      
      {/* Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10 mix-blend-multiply dark:mix-blend-color-burn" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>

      {/* Top Bar - Minimalist App Header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-primary text-xl" aria-hidden="true">ॐ</span>
          <h1 className="text-xl font-bold font-serif tracking-wide text-foreground">श्री दुर्गा चालीसा</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:bg-muted/50 rounded-full"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowControls(p => !p)}
            className="text-foreground hover:bg-muted/50 rounded-full"
            aria-label={showControls ? 'Hide controls' : 'Show controls'}
            aria-pressed={showControls}
          >
            <Settings2 className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div className="max-w-2xl mx-auto px-6 py-24 pb-48 flex flex-col gap-6 text-center">
          {durgaChalisa.map((verse) => (
            <div 
              key={verse.id} 
              id={`verse-${verse.id}`}
              className={cn(
                "transition-all duration-700 ease-out px-4 py-3 rounded-xl",
                verse.type === 'doha' ? "font-serif text-3xl md:text-4xl text-primary font-bold my-4 leading-relaxed" : "font-sans text-2xl md:text-3xl text-foreground/90 font-semibold leading-loose",
                activeHighlightId === verse.id ? "bg-primary/20 scale-105 shadow-lg" : "bg-transparent scale-100"
              )}
            >
              {verse.text}
            </div>
          ))}
          
          {/* Footer Credits inside scroll area */}
          <div className="mt-24 pt-8 border-t border-border/50 text-sm font-sans text-muted-foreground pb-20">
            <p>
              Inspired by <a href="https://github.com/CRAJKUMARSINGH/sUNDARKAND-dISPLAY" target="_blank" rel="noreferrer" className="text-primary hover:underline hover:text-primary/80 transition-colors">Sundarkand Display</a> — प्रस्तुति: राजकुमार अरथुना
            </p>
          </div>
        </div>
      </main>

      {/* Controls Overlay */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 z-30 transition-transform duration-500 ease-in-out p-4",
        showControls ? "translate-y-0" : "translate-y-[120%]"
      )}>
        <div className="max-w-xl mx-auto bg-card/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 md:p-5 flex flex-col gap-5">
          
          {/* Search Row */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="खोजें (Search word or line 0-85)..."
              className="pl-9 bg-background/50 border-border/50 focus-visible:ring-primary/50 text-base py-5 rounded-xl placeholder:font-serif"
            />
            {results.length > 0 && query && (
              <div className="absolute bottom-[calc(100%+0.5rem)] left-0 right-0 max-h-60 overflow-y-auto bg-popover border border-border rounded-xl shadow-xl flex flex-col p-1 z-50">
                {results.slice(0, 10).map(r => (
                  <button 
                    key={r.id}
                    onClick={() => scrollToLine(r.id)}
                    className="text-left px-4 py-3 hover:bg-muted/50 rounded-lg text-lg font-sans transition-colors"
                  >
                    <span className="text-xs text-muted-foreground mr-3 font-mono">{r.id}</span>
                    <span className="text-foreground">{r.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Unified Player: one play button drives both the chant audio and the teleprompter scroll together */}
          <div className="bg-background/50 rounded-xl p-3 flex flex-col gap-3 border border-border/30">
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="icon"
                onClick={togglePlayback}
                className="rounded-full w-14 h-14 shrink-0 shadow-md"
                aria-label={isPlaying ? 'Pause aarti' : 'Play aarti'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </Button>

              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    दुर्गा चालीसा आरती
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="h-7 w-7 rounded-full text-foreground hover:bg-muted -mr-1"
                    aria-label={isMuted || volume === 0 ? 'Unmute audio' : 'Mute audio'}
                    aria-pressed={isMuted}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                </div>
                <Slider
                  value={[audioProgress]}
                  onValueChange={([v]) => audioSeek(v)}
                  min={0} max={1} step={0.001}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 px-1 pt-1 border-t border-border/30">
              <Button
                variant="ghost"
                size="icon"
                onClick={resync}
                disabled={isFollowing}
                className="h-8 w-8 rounded-full text-foreground hover:bg-muted shrink-0 disabled:opacity-30"
                aria-label="Resync teleprompter to the chant"
                title="स्क्रॉल को आरती से फिर मिलाएं"
              >
                <LocateFixed className={cn("w-5 h-5", !isFollowing && "text-primary animate-pulse")} />
              </Button>
              <span className="text-xs text-muted-foreground shrink-0">गति</span>
              <Slider
                value={[playbackRate]}
                onValueChange={([v]) => setPlaybackRate(v)}
                min={0.5} max={2} step={0.1}
                className="flex-1"
              />
              <div className="flex items-center gap-1.5 shrink-0 w-20">
                <Volume2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={([v]) => { setVolume(v); if (v > 0 && isMuted) toggleMute(); }}
                  min={0} max={1} step={0.01}
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating hint + shortcut back to the synced position while the reader is scrolling freely */}
      {audioPlaying && !isFollowing && (
        <button
          onClick={resync}
          className={cn(
            "absolute right-4 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-lg text-sm font-semibold transition-all hover:brightness-110 active:scale-95",
            showControls ? "bottom-[15.5rem] md:bottom-64" : "bottom-6"
          )}
        >
          <LocateFixed className="w-4 h-4" />
          लय में लौटें
        </button>
      )}

    </div>
  );
}
