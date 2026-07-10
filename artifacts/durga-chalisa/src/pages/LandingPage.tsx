import { ArrowRight, BookOpen, Headphones, Moon, Search, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

/* ─── Feature cards ────────────────────────────────────────────────── */
const features = [
  {
    icon: Headphones,
    title: 'सुनते हुए पढ़ें',
    text: 'ऑडियो की गति से स्वतः स्क्रोल — पाठ और ध्वनि एकसाथ।',
  },
  {
    icon: BookOpen,
    title: 'तीन पवित्र पाठ',
    text: 'जय आद्या शक्ति · श्री दुर्गा चालीसा · विश्वंभरी स्तुति।',
  },
  {
    icon: Search,
    title: 'तुरंत खोज',
    text: 'शब्द या पंक्ति संख्या — सीधे उस पंक्ति पर जाएं।',
  },
  {
    icon: Sparkles,
    title: 'शांत पाठ मोड',
    text: 'दिन / रात मोड, बड़े अक्षर — मंदिर, परिवार, साधना।',
  },
];

/* ─── Texts shown in the hero preview card ─────────────────────────── */
const previewLines = [
  { label: 'विश्वंभरी स्तुति', line: 'माम् पाहि ॐ भगवति भव दुःख कापो', size: 'text-xl md:text-2xl' },
  { label: 'दुर्गा चालीसा', line: 'नमो नमो दुर्गे सुख करनी।', size: 'text-lg md:text-xl' },
  { label: 'आद्या शक्ति आरती', line: 'ॐ जयो जयो माँ जगदम्बे..', size: 'text-lg md:text-xl' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">

      {/* ── aged-paper texture ── */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
      />

      {/* ═══════════════════════ HEADER ════════════════════════════════ */}
      <header className="relative z-20 border-b-2 border-primary/35 bg-card/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-primary/45 bg-primary/10 font-serif text-2xl text-primary sm:h-11 sm:w-11">
              ॐ
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary sm:text-xs">
                Durga Chalisa Plus
              </p>
              <h1 className="truncate font-serif text-base font-bold sm:text-xl md:text-2xl">
                दुर्गा पाठ टेलीप्रॉम्प्टर
              </h1>
            </div>
          </a>
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full text-foreground/70 transition hover:bg-primary/10 hover:text-primary"
            aria-label={theme === 'dark' ? 'उजाला मोड' : 'रात्रि मोड'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <main className="relative z-10">

        {/* ═══════════════════════ HERO ══════════════════════════════════ */}
        <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 pt-12 pb-16 sm:px-6 md:flex-row md:items-start md:gap-14 md:pt-20 md:pb-24">

          {/* Left: text */}
          <div className="flex-1 text-center md:text-left">
            {/* श्लोक badge */}
            <div className="mb-5 inline-block rounded-sm border-y-2 border-primary/40 px-3 py-1.5 font-serif text-sm text-primary sm:text-base">
              ॥ मातृशक्ति पाठ ॥
            </div>

            <h2 className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
              जय आद्या शक्ति
            </h2>
            <p className="mt-1 font-serif text-2xl font-semibold text-primary sm:text-3xl md:text-4xl">
              दुर्गा चालीसा · विश्वंभरी
            </p>

            <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg md:mx-0">
              मंदिर, परिवार और व्यक्तिगत साधना के लिए साफ, बड़े अक्षरों वाला
              devotional teleprompter — हिंदी पाठ, ऑडियो, खोज और शांत reading
              mode एक ही जगह।
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
              <a
                href="/reader"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-md bg-primary px-7 text-base font-bold text-primary-foreground shadow-md transition hover:brightness-110 active:scale-95 sm:w-auto sm:text-lg"
              >
                पाठ प्रारंभ करें
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#credits"
                className="inline-flex h-13 w-full items-center justify-center rounded-md border-2 border-primary/40 px-7 text-base font-bold transition hover:bg-primary/8 active:scale-95 sm:w-auto sm:text-lg"
              >
                साभार देखें
              </a>
            </div>
          </div>

          {/* Right: preview card */}
          <div className="w-full max-w-sm flex-shrink-0 md:max-w-xs lg:max-w-sm">
            <div className="relative">
              <div className="absolute -inset-2 border border-primary/20 rounded-sm" />
              <div className="relative rounded-sm border-2 border-primary/45 bg-card/95 p-5 shadow-2xl">
                <p className="border-b-2 border-primary/25 pb-3 text-center font-serif text-base font-bold text-primary">
                  ॥ पाठ सूची ॥
                </p>
                <div className="mt-4 space-y-4">
                  {previewLines.map(({ label, line, size }) => (
                    <div key={label} className="text-center">
                      <p className={`font-serif font-semibold leading-relaxed ${size}`}>{line}</p>
                      <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-sm bg-primary/8 px-4 py-2.5 text-center text-sm text-muted-foreground">
                  ऑडियो · खोज · दिन/रात मोड
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════ FEATURES STRIP ════════════════════════ */}
        <section className="border-y-2 border-primary/20 bg-card/50 py-12">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 md:gap-8">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ TEXTS PREVIEW ═════════════════════════ */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-primary">
            तीन पवित्र पाठ
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                num: '१',
                title: 'जय आद्या शक्ति',
                sub: 'Jay Adhyashakti Aarti',
                line: 'ॐ जयो जयो माँ जगदम्बे',
                duration: '15 मिनट',
              },
              {
                num: '२',
                title: 'श्री दुर्गा चालीसा',
                sub: 'Durga Chalisa',
                line: 'नमो नमो दुर्गे सुख करनी।',
                duration: '8 मिनट',
              },
              {
                num: '३',
                title: 'विश्वंभरी स्तुति',
                sub: 'Vishwambhari Stuti',
                line: 'माम् पाहि ॐ भगवति भव दुःख कापो',
                duration: '7 मिनट',
              },
            ].map(({ num, title, sub, line, duration }) => (
              <a
                key={title}
                href="/reader"
                className="group flex flex-col gap-3 rounded-sm border-2 border-primary/25 bg-card/80 p-5 transition hover:border-primary/55 hover:shadow-lg active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-primary/40 group-hover:text-primary/70 transition">
                    {num}
                  </span>
                  <span className="rounded-full bg-primary/8 px-2 py-0.5 text-xs text-muted-foreground">
                    {duration}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-xl font-bold">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <p className="mt-auto font-serif text-sm leading-relaxed text-foreground/70 italic">
                  "{line}"
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ CREDITS ════════════════════════════════ */}
        <section id="credits" className="border-t-2 border-primary/20 bg-card/40 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-2xl">

            {/* Author */}
            <div className="text-center">
              <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/50 sm:h-28 sm:w-28">
                <img
                  src="/author.jpg"
                  alt="राजकुमार अरथुना"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                Created by
              </p>
              <h3 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">राजकुमार अरथुना</h3>
              <p className="mt-1 text-muted-foreground">An effort by a humble Rambhakt</p>
              <p className="mt-3 font-serif text-2xl text-primary">🌺 🙏 सीताराम 🙏 🌺</p>
            </div>

            {/* Divider */}
            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-1 bg-primary/20" />
              <span className="font-serif text-primary/50">॥</span>
              <div className="h-px flex-1 bg-primary/20" />
            </div>

            {/* Acknowledgements grid */}
            <div className="grid gap-6 text-sm sm:grid-cols-2">
              <div className="rounded-sm border border-primary/20 bg-card/60 p-4">
                <p className="mb-1 font-bold text-foreground">Inspired by</p>
                <a
                  href="https://sundarkand-display.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  Sundarkand Display ↗
                </a>
                <p className="mt-1 leading-6 text-muted-foreground">
                  Layout, design language and credit style lovingly borrowed from
                  the Sundarkand Teleprompter project.
                </p>
              </div>

              <div className="rounded-sm border border-primary/20 bg-card/60 p-4">
                <p className="mb-1 font-bold text-foreground">Text Sources</p>
                <ul className="mt-1 space-y-1 leading-7 text-muted-foreground">
                  <li>श्री दुर्गा चालीसा — traditional Hindi text</li>
                  <li>
                    जय आद्या शक्ति — Gujarati aarti,{' '}
                    <span className="text-foreground/80">
                      composed by Shivānand Swami
                    </span>
                  </li>
                  <li>
                    विश्वंभरी स्तुति — Gujarati stuti,{' '}
                    <span className="text-foreground/80">Rasika Canda</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-sm border border-primary/20 bg-card/60 p-4">
                <p className="mb-1 font-bold text-foreground">Audio</p>
                <p className="leading-6 text-muted-foreground">
                  Jay Adhyashakti &amp; Vishwambhari — combined recording
                  (0:00–15:04 Aarti · 15:04–end Stuti + Karpura Gauram).
                  Durga Chalisa — original recording.
                </p>
              </div>

              <div className="rounded-sm border border-primary/20 bg-card/60 p-4">
                <p className="mb-1 font-bold text-foreground">Built with</p>
                <p className="leading-6 text-muted-foreground">
                  React · Vite · Tailwind CSS · shadcn/ui · Wouter · Tiro
                  Devanagari Hindi (Google Fonts)
                </p>
              </div>
            </div>

            {/* Note on "द्वितीय" correction */}
            <div className="mt-8 rounded-sm border border-primary/25 bg-primary/5 px-5 py-4 text-sm">
              <p className="font-bold text-primary">पाठ टिप्पणी</p>
              <p className="mt-1 leading-7 text-muted-foreground">
                <span className="font-medium text-foreground">जय आद्या शक्ति</span> की दूसरी पंक्ति में{' '}
                <em>द्वितीय मेहस्वरूप</em> का अर्थ है{' '}
                <span className="font-semibold text-foreground">Degswarup</span> —
                दिव्य द्वैत स्वरूप (Divine dual form)।
              </p>
            </div>

            <p className="mt-10 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} Durga Chalisa Plus · Open source ·{' '}
              <a
                href="https://github.com/CRAJKUMARSINGH/Durga-Chalisa-Plus"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                GitHub ↗
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
