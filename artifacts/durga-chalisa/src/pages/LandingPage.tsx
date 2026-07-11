import { ArrowRight, BookOpen, Headphones, Search, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const features = [
  { icon: Headphones, title: 'सुनते हुए पढ़ें',   text: 'ऑडियो की गति से स्वतः स्क्रोल — पाठ और ध्वनि एकसाथ।' },
  { icon: BookOpen,   title: 'तीन पवित्र पाठ',    text: 'जय आद्या शक्ति · श्री दुर्गा चालीसा · विश्वंभरी स्तुति।' },
  { icon: Search,     title: 'तुरंत खोज',         text: 'शब्द या पंक्ति संख्या — सीधे उस पंक्ति पर जाएं।' },
  { icon: Sparkles,   title: 'शांत पाठ मोड',       text: 'दिन / रात मोड, बड़े अक्षर — मंदिर, परिवार, साधना।' },
];

const texts = [
  { num: '१', title: 'जय आद्या शक्ति', sub: 'Jay Adhyashakti Aarti',  line: 'ॐ जयो जयो माँ जगदम्बे', dur: '~15 मिनट' },
  { num: '२', title: 'श्री दुर्गा चालीसा', sub: 'Durga Chalisa',      line: 'नमो नमो दुर्गे सुख करनी।', dur: '~8 मिनट' },
  { num: '३', title: 'विश्वंभरी स्तुति', sub: 'Vishwambhari Stuti',   line: 'माम् पाहि ॐ भगवति भव दुःख कापो', dur: '~7 मिनट' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="min-h-screen overflow-x-hidden text-[#FFF8EC]"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(212,160,23,0.18) 0%, transparent 60%), linear-gradient(180deg,#1A0A00 0%,#2C1000 100%)',
        fontFamily: '"Tiro Devanagari Hindi","Noto Sans Devanagari",serif',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 py-3 sm:px-8"
        style={{ borderBottom: '2px solid #C4890A', background: 'linear-gradient(135deg,#3A1200 0%,#5C1E00 50%,#3A1200 100%)' }}
      >
        <a href="/" className="flex items-center gap-3 min-w-0">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl"
            style={{ border: '2px solid #D4A017', color: '#D4A017', background: 'rgba(212,160,23,0.12)' }}
          >
            ॐ
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A017] sm:text-xs">Durga Chalisa Plus</p>
            <h1 className="truncate text-base font-bold sm:text-xl">दुर्गा पाठ टेलीप्रॉम्प्टर</h1>
          </div>
        </a>
        <button
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-full text-sm text-[#D4A017] transition hover:bg-[rgba(212,160,23,0.15)]"
          aria-label="toggle theme"
          style={{ border: '1px solid rgba(196,137,10,0.4)' }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 pt-14 pb-16 text-center sm:px-8 md:flex-row md:text-left md:pt-20 md:pb-24">
        <div className="flex-1">
          {/* badge */}
          <div
            className="mb-5 inline-block px-4 py-1.5 text-sm font-semibold tracking-widest text-[#D4A017]"
            style={{ border: '1px solid rgba(196,137,10,0.5)', borderRadius: 4, background: 'rgba(90,30,0,0.5)' }}
          >
            ॥ मातृशक्ति पाठ ॥
          </div>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl" style={{ color: '#FFF8EC' }}>
            जय आद्या शक्ति
          </h2>
          <p className="mt-1 text-2xl font-semibold sm:text-3xl md:text-4xl" style={{ color: '#FF6B00', textShadow: '0 2px 6px rgba(255,107,0,0.35)' }}>
            दुर्गा चालीसा · विश्वंभरी
          </p>

          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-[#F5E6A3]/80 sm:text-lg md:mx-0">
            मंदिर, परिवार और व्यक्तिगत साधना के लिए साफ, बड़े अक्षरों वाला
            devotional teleprompter — हिंदी पाठ, ऑडियो, खोज और शांत reading
            mode एक ही जगह।
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row md:items-start">
            <a
              href="/reader"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded px-7 text-base font-bold text-[#FFF8EC] shadow-md transition hover:brightness-110 active:scale-95 sm:w-auto"
              style={{ background: 'linear-gradient(135deg,#C04B00,#FF6B00)', border: '1px solid #FF6B00' }}
            >
              पाठ प्रारंभ करें <ArrowRight className="h-5 w-5" />
            </a>
            <a
              href="#credits"
              className="inline-flex h-12 w-full items-center justify-center rounded px-7 text-base font-bold transition hover:brightness-110 active:scale-95 sm:w-auto"
              style={{ border: '1px solid #C4890A', color: '#D4A017', background: 'rgba(90,30,0,0.5)' }}
            >
              साभार देखें
            </a>
          </div>
        </div>

        {/* Preview card */}
        <div className="w-full max-w-xs flex-shrink-0">
          <div
            className="rounded p-5 shadow-2xl"
            style={{ border: '2px solid #C4890A', background: 'linear-gradient(135deg,#3A1200 0%,#2C1000 100%)' }}
          >
            <p
              className="pb-3 text-center text-sm font-bold tracking-widest text-[#D4A017]"
              style={{ borderBottom: '1px solid rgba(196,137,10,0.4)' }}
            >
              ॥ पाठ सूची ॥
            </p>
            <div className="mt-4 space-y-4 text-center">
              <div>
                <p className="text-xl font-semibold text-[#FFF8EC]">ॐ जयो जयो माँ जगदम्बे</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-[#D4A017]/70">आद्या शक्ति</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#FFF8EC]/90">नमो नमो दुर्गे सुख करनी।</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-[#D4A017]/70">दुर्गा चालीसा</p>
              </div>
              <div>
                <p className="text-base font-semibold text-[#FFF8EC]/80">माम् पाहि ॐ भगवति</p>
                <p className="mt-0.5 text-xs uppercase tracking-widest text-[#D4A017]/70">विश्वंभरी स्तुति</p>
              </div>
            </div>
            <div
              className="mt-5 rounded px-4 py-2 text-center text-sm text-[#F5E6A3]/60"
              style={{ background: 'rgba(212,160,23,0.08)' }}
            >
              ऑडियो · खोज · दिन/रात मोड
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section
        className="py-12"
        style={{ borderTop: '1px solid rgba(196,137,10,0.3)', borderBottom: '1px solid rgba(196,137,10,0.3)', background: 'rgba(58,18,0,0.4)' }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 sm:px-8 md:grid-cols-4 md:gap-8">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
              <span
                className="grid h-11 w-11 place-items-center rounded-full"
                style={{ background: 'rgba(212,160,23,0.12)', color: '#D4A017', border: '1px solid rgba(196,137,10,0.35)' }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-[#F5E6A3]">{title}</p>
                <p className="mt-1 text-sm leading-6 text-[#F5E6A3]/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Three Texts ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-[#D4A017]">तीन पवित्र पाठ</p>
        <div className="grid gap-5 sm:grid-cols-3">
          {texts.map(({ num, title, sub, line, dur }) => (
            <a
              key={title}
              href="/reader"
              className="group flex flex-col gap-3 rounded p-5 transition hover:brightness-110 active:scale-[0.98]"
              style={{ border: '2px solid rgba(196,137,10,0.35)', background: 'rgba(58,18,0,0.6)' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold" style={{ color: 'rgba(212,160,23,0.4)' }}>{num}</span>
                <span className="rounded-full px-2 py-0.5 text-xs text-[#D4A017]" style={{ background: 'rgba(212,160,23,0.08)' }}>{dur}</span>
              </div>
              <div>
                <p className="text-xl font-bold text-[#FFF8EC]">{title}</p>
                <p className="text-xs text-[#D4A017]/60">{sub}</p>
              </div>
              <p className="mt-auto text-sm italic leading-relaxed text-[#F5E6A3]/60">"{line}"</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── Credits — imported from Sundarkand Display ──────────────── */}
      <section
        id="credits"
        className="px-4 py-16 sm:px-8"
        style={{ borderTop: '2px solid #C4890A' }}
      >
        <div className="mx-auto max-w-2xl">

          {/* Author — exact Sundarkand Display style */}
          <div className="text-center">
            <div
              className="mx-auto mb-4 overflow-hidden rounded-full"
              style={{ width: 96, height: 96, border: '2px solid #C4890A', boxShadow: '0 2px 8px rgba(212,160,23,0.4)' }}
            >
              <img src="/author.jpg" alt="राजकुमार अरथुना" className="h-full w-full object-cover" loading="lazy" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5E6A3]/60">An effort by humble Rambhakt-</p>
            <h3 className="mt-2 text-3xl font-bold sm:text-4xl" style={{ color: '#FF6B00', textShadow: '0 2px 6px rgba(255,107,0,0.35)' }}>
              राजकुमार अरथुना
            </h3>
            <p className="mt-3 text-2xl" style={{ color: '#D4A017' }}>🌺 🙏 सीताराम 🙏 🌺</p>
          </div>

          {/* Divider */}
          <div className="my-10 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: 'rgba(196,137,10,0.3)' }} />
            <span className="text-[#D4A017]/50">❧</span>
            <div className="h-px flex-1" style={{ background: 'rgba(196,137,10,0.3)' }} />
          </div>

          {/* Credit grid */}
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            {[
              {
                title: 'Inspired by',
                body: (
                  <>
                    <a href="https://sundarkand-display.netlify.app/" target="_blank" rel="noreferrer"
                      className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>
                      Sundarkand Display ↗
                    </a>
                    <p className="mt-1 leading-6 text-[#F5E6A3]/60">
                      Layout, side-border design, credits card and color language directly imported from the Sundarkand Teleprompter project by the same author.
                    </p>
                  </>
                ),
              },
              {
                title: 'Text Sources',
                body: (
                  <ul className="mt-1 space-y-1 leading-7 text-[#F5E6A3]/60">
                    <li>श्री दुर्गा चालीसा — traditional Hindi text</li>
                    <li>जय आद्या शक्ति — composed by <span className="text-[#F5E6A3]/80">Shivānand Swami</span></li>
                    <li>विश्वंभरी स्तुति — by <span className="text-[#F5E6A3]/80">Rasika Canda</span></li>
                  </ul>
                ),
              },
              {
                title: 'Audio',
                body: (
                  <p className="leading-6 text-[#F5E6A3]/60">
                    Jay Adhyashakti + Vishwambhari — combined recording (0:00–15:04 Aarti · 15:04 onward Stuti + Karpura Gauram). Durga Chalisa — original recording.
                  </p>
                ),
              },
              {
                title: 'Built with',
                body: (
                  <p className="leading-6 text-[#F5E6A3]/60">
                    React · Vite · Tailwind CSS · shadcn/ui · Wouter · Tiro Devanagari Hindi
                  </p>
                ),
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="rounded p-4"
                style={{ border: '1px solid rgba(196,137,10,0.3)', background: 'rgba(58,18,0,0.5)' }}
              >
                <p className="mb-1 font-bold text-[#D4A017]">{title}</p>
                {body}
              </div>
            ))}
          </div>

          {/* Note */}
          <div
            className="mt-8 rounded px-5 py-4 text-sm"
            style={{ border: '1px solid rgba(196,137,10,0.35)', background: 'rgba(212,160,23,0.06)' }}
          >
            <p className="font-bold text-[#D4A017]">पाठ टिप्पणी</p>
            <p className="mt-1 leading-7 text-[#F5E6A3]/70">
              <span className="font-medium text-[#F5E6A3]">जय आद्या शक्ति</span> की दूसरी पंक्ति में{' '}
              <em>द्वितीय बे स्वरूप</em> — <span className="font-semibold text-[#FF6B00]">Dwitiya Bay Swarup</span> —
              दिव्य द्वैत स्वरूप (Divine dual form of Shiva-Shakti)।
            </p>
          </div>

          <p className="mt-10 text-center text-xs text-[#F5E6A3]/30">
            © {new Date().getFullYear()} Durga Chalisa Plus ·{' '}
            <a href="https://github.com/CRAJKUMARSINGH/Durga-Chalisa-Plus" target="_blank" rel="noreferrer"
              className="hover:underline" style={{ color: '#D4A017' }}>GitHub ↗</a>
          </p>
        </div>
      </section>
    </div>
  );
}
