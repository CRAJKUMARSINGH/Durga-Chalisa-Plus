import { useRef, useEffect, useState } from 'react';
import { durgaChalisaHindi, hindiAarti, vishwambhariHindi } from '@/data/hindi-aarti';
import { useAudioPlayer, type AudioSegment } from '@/hooks/use-audio-player';
import { useSyncedScroll } from '@/hooks/use-synced-scroll';
import { useSearch } from '@/hooks/use-search';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import {
  ArrowLeft,
  BookOpen,
  LocateFixed,
  Moon,
  Pause,
  Play,
  Search,
  Settings2,
  Sun,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

type SegmentType = 'vishwambhari' | 'durga-chalisa' | 'hindi-aarti';

/**
 * jay_adhyashakti_aarti.mp3 track layout (user-confirmed):
 *   0:00  →  15:04  (904s)  = Jay Adhyashakti Aarti
 *   15:04 →  16:36  (996s)  = Karpura Gauram mantra (intro to Vishwambhari)
 *   16:36 →  end            = Vishwambhari Stuti
 *
 * Vishwambhari segment starts at 15:04 (904s) to include Karpura Gauram
 * as its opening mantra, matching the docx structure.
 */
const AARTI_END_SEC     = 904;  // 15:04
const VISHWAMBHARI_START_SEC = 904;  // 15:04 (Karpura Gauram + Vishwambhari)

const segmentData = {
  vishwambhari: {
    verses: vishwambhariHindi,
    title: 'विश्वंभरी स्तुति',
    audioLabel: 'विश्वंभरी / माम् पाहि',
    searchPlaceholder: 'खोजें: शब्द या पंक्ति संख्या',
    audioUrl: '/assets/jay_adhyashakti_aarti.mp3',
    audioSegment: { startTime: VISHWAMBHARI_START_SEC, endTime: undefined, scrollDelaySec: 90 },
  },
  'durga-chalisa': {
    verses: durgaChalisaHindi,
    title: 'श्री दुर्गा चालीसा',
    audioLabel: 'श्री दुर्गा चालीसा',
    searchPlaceholder: 'खोजें: शब्द या पंक्ति संख्या',
    audioUrl: '/assets/durga_chalisa_original.mp3',
    audioSegment: { startTime: 0, endTime: undefined },
  },
  'hindi-aarti': {
    verses: hindiAarti,
    title: 'जय आद्या शक्ति आरती',
    audioLabel: 'जय आद्या शक्ति आरती',
    searchPlaceholder: 'खोजें: शब्द या पंक्ति संख्या',
    audioUrl: '/assets/jay_adhyashakti_aarti.mp3',
    audioSegment: { startTime: 0, endTime: AARTI_END_SEC },
  },
};

const segmentButtons: { id: SegmentType; label: string }[] = [
  { id: 'vishwambhari', label: 'विश्वंभरी' },
  { id: 'durga-chalisa', label: 'दुर्गा चालीसा' },
  { id: 'hindi-aarti', label: 'आद्या शक्ति' },
];

export default function ChalisaReader() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);
  const [activeHighlightId, setActiveHighlightId] = useState<number | null>(null);
  const [currentSegment, setCurrentSegment] = useState<SegmentType>('vishwambhari');
  const [audioVerseIdx, setAudioVerseIdx] = useState<number | null>(null);

  const { theme, toggleTheme } = useTheme();
  const currentData = segmentData[currentSegment];
  const {
    isPlaying: audioPlaying,
    togglePlayPause: toggleAudio,
    progress: audioProgress,
    seek: audioSeek,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    audioRef,
    currentTime,
    duration,
  } = useAudioPlayer(currentData.audioUrl, currentData.audioSegment);

  const { isFollowing, resync } = useSyncedScroll(
    scrollRef,
    audioRef,
    audioPlaying,
    currentData.verses,
    currentData.audioSegment,
  );
  const { query, setQuery, results } = useSearch(currentData.verses);

  useEffect(() => {
    if (activeHighlightId === null) return;
    const timer = window.setTimeout(() => setActiveHighlightId(null), 3000);
    return () => window.clearTimeout(timer);
  }, [activeHighlightId]);

  useEffect(() => {
    setQuery('');
    setActiveHighlightId(null);
    setAudioVerseIdx(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentSegment, setQuery]);

  // Track which verse the audio is currently on for live highlighting.
  useEffect(() => {
    if (!audioPlaying) return;
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      if (audio.duration > 0) {
        const seg = currentData.audioSegment;
        const segStart = seg?.startTime ?? 0;
        const segEnd   = seg?.endTime   ?? audio.duration;
        const segDur   = Math.max(segEnd - segStart, 1);
        const elapsed  = Math.max(0, audio.currentTime - segStart);
        const ratio    = Math.min(elapsed / segDur, 1);

        // Only count chantable lines (skip headers)
        const chantable = currentData.verses.filter(v => v.type !== 'header');
        const idx = Math.min(Math.floor(ratio * chantable.length), chantable.length - 1);
        setAudioVerseIdx(chantable[idx]?.id ?? null);
      }
    };

    audio.addEventListener('timeupdate', update);
    return () => audio.removeEventListener('timeupdate', update);
  }, [audioPlaying, audioRef, currentData.verses, currentData.audioSegment]);

  const scrollToLine = (id: number) => {
    const el = document.getElementById(`verse-${id}`);
    if (el && scrollRef.current) {
      const containerTop = scrollRef.current.getBoundingClientRect().top;
      const elTop = el.getBoundingClientRect().top;
      scrollRef.current.scrollBy({
        top: elTop - containerTop - 150,
        behavior: 'smooth',
      });
      setActiveHighlightId(id);
      setQuery('');
    }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-background selection:bg-primary/25">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
      />

      <header className="relative z-20 border-b-2 border-primary/40 bg-card/90 px-3 py-3 shadow-sm backdrop-blur-md md:px-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                window.location.href = '/';
              }}
              className="h-9 w-9 shrink-0 rounded-full"
              aria-label="मुखपृष्ठ पर जाएं"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <BookOpen className="h-4 w-4" />
                Durga Chalisa Plus
              </div>
              <h1 className="truncate font-serif text-xl font-bold text-foreground md:text-3xl">{currentData.title}</h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {segmentButtons.map((item) => (
              <Button
                key={item.id}
                variant={currentSegment === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentSegment(item.id)}
                className="hidden rounded-full px-4 font-semibold sm:inline-flex"
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-full"
              aria-label={theme === 'dark' ? 'उजाला मोड' : 'रात्रि मोड'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowControls((p) => !p)}
              className="h-9 w-9 rounded-full"
              aria-label={showControls ? 'नियंत्रण छिपाएं' : 'नियंत्रण दिखाएं'}
              aria-pressed={showControls}
            >
              <Settings2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="relative z-20 grid grid-cols-3 border-b border-primary/25 bg-background/80 sm:hidden">
        {segmentButtons.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentSegment(item.id)}
            className={cn(
              'h-11 text-sm font-semibold transition-colors',
              currentSegment === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <main ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto scroll-smooth no-scrollbar">
        <div className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-16 pb-56 text-center md:px-8">
          <div className="mb-4 border-y-2 border-primary/35 py-4 font-serif text-lg text-muted-foreground">
            ॥ मातृशक्ति पाठ ॥
          </div>

          {currentData.verses.map((verse) => {
            // For aarti verses that pack multiple phrases on one line (comma-separated),
            // split them for display so each phrase gets its own line — easier to read
            // and follow while singing. Doha refrain lines and headers stay as-is.
            const displayParts =
              verse.type === 'chaupai' && verse.text.includes(', ')
                ? verse.text.split(', ')
                : [verse.text];

            return (
              <div
                key={verse.id}
                id={`verse-${verse.id}`}
                className={cn(
                  'rounded-md px-3 py-2 transition-all duration-500 ease-out',
                  verse.type === 'header'
                    ? 'verse-header my-3 font-serif text-sm font-semibold uppercase tracking-widest text-primary/60'
                    : verse.type === 'doha'
                      ? 'my-3 font-serif text-2xl font-bold leading-relaxed text-primary md:text-3xl'
                      : 'font-serif text-xl font-semibold leading-relaxed text-foreground/90 md:text-2xl',
                  activeHighlightId === verse.id
                    ? 'scale-[1.02] bg-primary/15 shadow-lg'
                    : audioVerseIdx === verse.id && verse.type !== 'header'
                      ? 'bg-primary/10 text-foreground shadow-md'
                      : 'bg-transparent',
                )}
              >
                {displayParts.map((part, i) => (
                  <span key={i} className="block">
                    {part}
                  </span>
                ))}
              </div>
            );
          })}

          <div className="mt-20 border-t-2 border-primary/30 pt-8 text-sm text-muted-foreground">
            {/* Credits widget — Sundarkand Display .tp-credits style */}
            <div style={{
              display: 'inline-flex', flexDirection: 'column', alignItems: 'center',
              padding: '1rem', border: '1px solid rgba(196,137,10,0.5)',
              borderRadius: '8px', background: 'rgba(58,18,0,0.85)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}>
              <img
                src="/author.jpg"
                alt="राजकुमार अरथुना"
                style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  border: '2px solid #C4890A', objectFit: 'cover',
                  marginBottom: '0.5rem',
                  boxShadow: '0 2px 8px rgba(212,160,23,0.4)',
                }}
              />
              <div style={{ fontSize: '0.72rem', color: '#F5E6A3', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                An effort by a humble Rambhakt
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#FF6B00', textShadow: '0 2px 6px rgba(255,107,0,0.35)' }}>
                राजकुमार अरथुना
              </div>
              <div style={{ fontSize: '0.78rem', color: '#D4A017', marginTop: '0.25rem' }}>
                🌺 🙏 सीताराम 🙏 🌺
              </div>
              <a
                href="https://sundarkand-display.netlify.app/"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.65rem', color: 'rgba(245,230,163,0.5)', marginTop: '0.5rem' }}
              >
                Inspired by Sundarkand Display ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 z-30 p-3 transition-transform duration-500 ease-in-out md:p-4',
          showControls ? 'translate-y-0' : 'translate-y-[120%]',
        )}
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4 rounded-md border-2 border-primary/35 bg-card/95 p-4 shadow-2xl backdrop-blur-xl md:p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={currentData.searchPlaceholder}
              className="h-11 rounded-md border-primary/25 bg-background/70 pl-9 font-serif text-base"
            />
            {results.length > 0 && query && (
              <div className="absolute bottom-[calc(100%+0.5rem)] left-0 right-0 z-50 flex max-h-60 flex-col overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-xl">
                {results.slice(0, 10).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => scrollToLine(r.id)}
                    className="rounded-sm px-4 py-3 text-left font-serif text-lg transition-colors hover:bg-muted/70"
                  >
                    <span className="mr-3 font-mono text-xs text-muted-foreground">{r.id}</span>
                    <span className="text-foreground">{r.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 rounded-md border border-border/60 bg-background/55 p-3">
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="icon"
                onClick={toggleAudio}
                className="h-14 w-14 shrink-0 rounded-full shadow-md"
                aria-label={audioPlaying ? 'विराम' : 'प्रारंभ'}
              >
                {audioPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-0.5 h-6 w-6" />}
              </Button>

              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {currentData.audioLabel}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="h-8 w-8 rounded-full"
                    aria-label={isMuted || volume === 0 ? 'ध्वनि चालू करें' : 'ध्वनि बंद करें'}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <Slider value={[audioProgress]} onValueChange={([v]) => audioSeek(v)} min={0} max={1} step={0.001} />
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-border/40 px-1 pt-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={resync}
                disabled={isFollowing}
                className="h-8 w-8 shrink-0 rounded-full disabled:opacity-30"
                aria-label="पाठ को ध्वनि से फिर मिलाएं"
                title="पाठ को ध्वनि से फिर मिलाएं"
              >
                <LocateFixed className={cn('h-5 w-5', !isFollowing && 'animate-pulse text-primary')} />
              </Button>
              <span className="text-xs text-muted-foreground">स्क्रोल ध्वनि की मूल गति से जुड़ा है</span>
              <div className="ml-auto flex w-24 shrink-0 items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[isMuted ? 0 : volume]}
                  onValueChange={([v]) => {
                    setVolume(v);
                    if (v > 0 && isMuted) toggleMute();
                  }}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {audioPlaying && !isFollowing && (
        <button
          onClick={resync}
          className={cn(
            'absolute right-4 z-30 flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 active:scale-95',
            showControls ? 'bottom-[15.5rem] md:bottom-64' : 'bottom-6',
          )}
        >
          <LocateFixed className="h-4 w-4" />
          लय में लौटें
        </button>
      )}
    </div>
  );
}
