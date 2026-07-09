import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Moon, Music2, Search, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const readerHighlights = [
  { icon: Music2, title: 'सुनते हुए पढ़ें', text: 'एक ही स्क्रीन पर ध्वनि, प्रगति और पाठ।' },
  { icon: BookOpen, title: 'तीन पवित्र पाठ', text: 'विश्वंभरी स्तुति, दुर्गा चालीसा और जय आद्या शक्ति आरती।' },
  { icon: Search, title: 'तुरंत खोज', text: 'शब्द या पंक्ति संख्या से सीधे स्थान पर जाएं।' },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.08] mix-blend-multiply dark:mix-blend-screen"
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}
      />

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
        <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1fr_0.82fr] md:py-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 border-y-2 border-primary/35 py-2 pr-4 font-serif text-lg text-primary">
              ॥ मातृशक्ति पाठ ॥
            </div>
            <h2 className="font-serif text-5xl font-bold leading-tight md:text-7xl">
              विश्वंभरी स्तुति
              <span className="mt-2 block text-3xl text-primary md:text-5xl">दुर्गा चालीसा · आद्या शक्ति आरती</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              मंदिर, परिवार और व्यक्तिगत साधना के लिए साफ, बड़े अक्षरों वाला devotional teleprompter. हिंदी पाठ,
              ऑडियो नियंत्रण, खोज और शांत reading mode एक ही जगह।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-14 rounded-md px-7 text-lg font-bold"
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
                ॥ पाठ सूची ॥
              </div>
              <div className="space-y-5 py-6 text-center font-serif">
                <p className="text-3xl font-bold leading-relaxed">माम् पाहि ॐ भगवति भव दुःख कापो</p>
                <p className="text-2xl font-semibold leading-relaxed text-foreground/90">
                  नमो नमो दुर्गे सुख करनी।
                </p>
                <p className="text-2xl font-semibold leading-relaxed text-foreground/85">
                  ॐ जयो जयो माँ जगदम्बे..
                </p>
                <p className="text-lg text-muted-foreground">विश्वंभरी / दुर्गा चालीसा / आद्या शक्ति / खोज / ऑडियो</p>
              </div>
              <div className="grid gap-3 border-t-2 border-primary/30 pt-4">
                {readerHighlights.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="grid grid-cols-[2.5rem_1fr] items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/12 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-bold">{title}</span>
                      <span className="text-sm text-muted-foreground">{text}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y-2 border-primary/25 bg-card/55 px-5 py-14">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {readerHighlights.map(({ icon: Icon, title, text }) => (
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
            <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-2 border-primary/55">
              <img src="/author.jpg" alt="राजकुमार अरथुना" className="h-full w-full object-cover" />
            </div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Credits & Acknowledgments</p>
            <h3 className="mt-3 font-serif text-4xl font-bold">राजकुमार अरथुना</h3>
            <p className="mt-2 text-lg text-muted-foreground">An effort by humble Rambhakt-</p>
            <p className="mt-3 font-serif text-2xl text-primary">🌺 🙏 सीताराम 🙏 🌺</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Credit style and inspiration imported from{' '}
              <a
                href="https://sundarkand-display.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Sundarkand Display
              </a>
              . Built with React, Vite, Tailwind CSS, and shadcn/ui.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
