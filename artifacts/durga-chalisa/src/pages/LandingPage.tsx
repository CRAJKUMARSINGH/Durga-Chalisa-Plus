import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Moon, Music2, Search, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const paaths = [
  {
    order: '१',
    title: 'श्री दुर्गा चालीसा',
    subtitle: 'नमो नमो दुर्गे सुख करनी',
    text: 'चालीस चौपाइयों में माँ दुर्गा की स्तुति और महिमा।',
  },
  {
    order: '२',
    title: 'जय आद्या शक्ति आरती',
    subtitle: 'ॐ जयो जयो माँ जगदम्बे',
    text: 'दुर्गा पाठ के पश्चात आद्या शक्ति की पावन आरती।',
  },
  {
    order: '३',
    title: 'विश्वंभरी स्तुति',
    subtitle: 'माम् पाहि ॐ भगवति भव दुःख कापो',
    text: 'अंत में विश्वंभरी माता की मंगल स्तुति।',
  },
];

const features = [
  { icon: Music2, title: 'सुनते हुए पढ़ें', text: 'एक ही स्क्रीन पर ध्वनि, प्रगति और पाठ साथ-साथ।' },
  { icon: BookOpen, title: 'तीनों पाठ एक साथ', text: 'दुर्गा चालीसा, आद्या शक्ति आरती और विश्वंभरी स्तुति — एक ही ऐप में।' },
  { icon: Search, title: 'तुरंत खोज', text: 'शब्द या पंक्ति संख्या से सीधे उस स्थान पर जाएं।' },
];

const tickerText =
  '॥ या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता, नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥   ✿   ॥ नमो नमो दुर्गे सुख करनी ॥   ✿   ॥ ॐ जयो जयो माँ जगदम्बे ॥   ✿   ';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(1100px 600px at 50% -10%, hsl(35 92% 52% / 0.22), transparent 60%), radial-gradient(900px 500px at 100% 100%, hsl(352 65% 35% / 0.18), transparent 55%)',
        }}
      />

      {/* Running devotional ticker */}
      <div className="relative z-20 overflow-hidden border-b-2 border-primary/40 bg-secondary py-2 text-secondary-foreground">
        <div className="marquee font-serif text-base tracking-wide">
          <span>{tickerText}</span>
          <span>{tickerText}</span>
        </div>
      </div>

      <header className="relative z-20 border-b-2 border-primary/40 bg-card/85 px-5 py-4 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-primary/45 bg-primary/10 font-serif text-2xl text-primary">
              ॐ
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Durga Chalisa Plus</p>
              <h1 className="truncate font-serif text-xl font-bold md:text-2xl">दुर्गा पाठ टेलीप्रॉम्प्टर</h1>
            </div>
          </a>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full"
            aria-label={theme === 'dark' ? 'उजाला मोड' : 'रात्रि मोड'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1fr_0.85fr] md:py-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border-y-2 border-primary/35 py-2 pr-4 font-serif text-lg text-primary">
              ॥ मातृशक्ति पाठ ॥
            </div>
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              <span className="text-gold-gradient">श्री दुर्गा चालीसा</span>
              <span className="mt-3 block text-2xl font-semibold text-foreground/80 md:text-4xl">
                आद्या शक्ति आरती · विश्वंभरी स्तुति
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              मंदिर, परिवार और व्यक्तिगत साधना के लिए साफ, बड़े अक्षरों वाला devotional teleprompter। पहले दुर्गा
              चालीसा, फिर आद्या शक्ति आरती और अंत में विश्वंभरी स्तुति — तीनों पाठ एक ही ऐप में, ऑडियो और खोज के साथ।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-md px-7 text-lg font-bold shadow-lg"
                onClick={() => {
                  window.location.href = '/reader';
                }}
              >
                पाठ प्रारंभ करें
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-14 rounded-md border-2 border-primary/40 px-7 text-lg font-bold"
                onClick={() => document.getElementById('credits')?.scrollIntoView({ behavior: 'smooth' })}
              >
                साभार देखें
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 border-2 border-primary/20" />
            <div className="relative border-2 border-primary/45 bg-card/90 p-5 shadow-2xl">
              <div className="border-b-2 border-primary/30 pb-4 text-center font-serif text-xl font-bold text-primary">
                ॥ पाठ क्रम ॥
              </div>
              <div className="grid gap-3 py-5">
                {paaths.map(({ order, title, subtitle }) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-md border border-primary/25 bg-primary/5 px-4 py-3 text-left"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-primary/40 bg-primary/10 font-serif text-2xl font-bold text-primary">
                      {order}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-serif text-xl font-bold">{title}</span>
                      <span className="block truncate font-serif text-sm text-muted-foreground">{subtitle}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="border-t-2 border-primary/30 pt-4 text-center font-serif text-lg text-primary">
                🌺 🙏 सीताराम 🙏 🌺
              </p>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-primary/25 bg-card/55 px-5 py-14">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-l-2 border-primary/35 pl-5">
                <Icon className="mb-4 h-7 w-7 text-primary" />
                <h3 className="font-serif text-2xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="credits" className="px-5 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-primary/55 shadow-lg">
              <img src="/author.jpg" alt="राजकुमार अरथुना" className="h-full w-full object-cover" />
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Credits &amp; Acknowledgments</p>
            <p className="mt-3 font-serif text-lg text-muted-foreground">An effort by humble Rambhakt-</p>
            <h3 className="mt-1 font-serif text-4xl font-bold">राजकुमार अरथुना</h3>
            <p className="mt-3 font-serif text-2xl text-primary">🌺 🙏 सीताराम 🙏 🌺</p>
            <p className="mt-6 text-sm text-muted-foreground">
              श्री दुर्गा चालीसा, आद्या शक्ति आरती एवं विश्वंभरी स्तुति। React, Vite, Tailwind CSS और shadcn/ui से
              निर्मित।
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
