import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import ExperienceModal, { Experience } from './components/ExperienceModal';
import BookingModal from './components/BookingModal';

const TRANSLATIONS = {
  en: {
    nav: { book: "Reserve" },
    hero: { 
      subtitle: "Exclusive, tailor-made journeys through the heart of Puglia, designed for the world's most discerning travelers."
    },
    marquee: "Handmade Pasta • Olive Groves • Authentic Apulia • Private Chefs • Mediterranean Sea • ",
    reviewsTitle: "What Our Guests Say",
    reviews: [
      { name: "Sarah J.", text: "An unforgettable journey into the heart of Puglia. The pasta making class was the highlight of our trip!" },
      { name: "Michael T.", text: "The private chef experience was beyond words. Flawless service and incredible local flavors." },
      { name: "Emma L.", text: "A truly authentic and luxurious way to experience the real Italy. Highly recommended." }
    ],
    footer: { title: "Begin\nYour Journey", rights: "© 2026 Ostuni Experience", desc: "Bespoke Travel & Private Retreats", loc: "Puglia, Italy" },
    experiences: [
      {
        id: 'pasta-fresca',
        title: 'Handmade Fresh Pasta',
        num: '01',
        images: ['/assets/1.jpg', '/assets/1-b.jpg', '/assets/1-c.jpg'],
        shortDesc: 'Master the ancient art of making traditional Apulian Orecchiette.',
        fullDesc: 'Dive your hands into the flour and learn the secrets of traditional Apulian pasta making. Guided by a local expert "nonna", you will master the technique of shaping perfect Orecchiette and Maccheroni. After the hands-on workshop, sit down to enjoy your creations paired with local organic wine and extra virgin olive oil.',
        duration: '3 Hours of Culinary Tradition',
        location: 'Historic Masseria, Ostuni'
      },
      {
        id: 'tomato-sauce',
        title: 'The Tomato Sauce Ritual',
        num: '02',
        images: ['/assets/2.jpg', '/assets/2-b.jpg', '/assets/2-c.jpg'],
        shortDesc: 'Experience the quintessential Italian summer tradition: making "la passata".',
        fullDesc: 'Discover the authentic ritual of preparing real Italian tomato sauce. We will select the ripest, sun-drenched local tomatoes, boil them, and mill them together to create the perfect "passata". This sensory journey concludes with a rustic tasting of fresh bruschetta and your newly made sauce under the shade of ancient olive trees.',
        duration: 'Half Day Experience',
        location: 'Organic Farm, Valle d\'Itria'
      },
      {
        id: 'private-chef',
        title: 'Private Chef at your B&B',
        num: '03',
        images: ['/assets/3.jpg', '/assets/3-b.jpg', '/assets/3-c.jpg'],
        shortDesc: 'An exclusive Apulian dining experience in the comfort of your accommodation.',
        fullDesc: 'Transform your B&B or private villa into an exclusive restaurant. Our private chef will craft a customized, multi-course Apulian menu using only the finest seasonal ingredients from local markets. Relax and enjoy a flawless, intimate culinary experience without ever having to leave your holiday home.',
        duration: 'An Evening of Pure Taste',
        location: 'Your Accommodation'
      }
    ]
  },
  it: {
    nav: { book: "Prenota" },
    hero: { 
      subtitle: "Viaggi esclusivi e su misura nel cuore della Puglia, pensati per i viaggiatori più esigenti del mondo."
    },
    marquee: "Pasta Fatta a Mano • Ulivi Secolari • Puglia Autentica • Chef Privati • Mar Mediterraneo • ",
    reviewsTitle: "Dicono di Noi",
    reviews: [
      { name: "Sarah J.", text: "Un viaggio indimenticabile nel cuore della Puglia. Il corso di pasta fresca è stato il momento clou del nostro viaggio!" },
      { name: "Michael T.", text: "L'esperienza con lo chef privato è stata indescrivibile. Servizio impeccabile e sapori locali incredibili." },
      { name: "Emma L.", text: "Un modo veramente autentico ed esclusivo di vivere la vera Italia. Altamente raccomandato." }
    ],
    footer: { title: "Inizia\nIl Tuo Viaggio", rights: "© 2026 Ostuni Experience", desc: "Viaggi su Misura & Ritiri Privati", loc: "Puglia, Italia" },
    experiences: [
      {
        id: 'pasta-fresca',
        title: 'Pasta Fresca a Mano',
        num: '01',
        images: ['/assets/1.jpg', '/assets/1-b.jpg', '/assets/1-c.jpg'],
        shortDesc: 'Padroneggia l\'antica arte delle Orecchiette pugliesi fatte a mano.',
        fullDesc: 'Metti le mani in pasta e impara i segreti della tradizione culinaria pugliese. Guidato da un\'esperta "nonna" locale, imparerai la tecnica per dare forma a Orecchiette e Maccheroni perfetti. Dopo il laboratorio pratico, siediti per gustare le tue creazioni accompagnate da vino biologico locale e olio extravergine d\'oliva.',
        duration: '3 Ore di Tradizione Culinaria',
        location: 'Masseria Storica, Ostuni'
      },
      {
        id: 'tomato-sauce',
        title: 'La Salsa di Pomodoro',
        num: '02',
        images: ['/assets/2.jpg', '/assets/2-b.jpg', '/assets/2-c.jpg'],
        shortDesc: 'Vivi la tradizione estiva italiana per eccellenza: fare "la passata".',
        fullDesc: 'Scopri l\'autentico rito della preparazione della vera salsa di pomodoro italiana. Selezioneremo i pomodori locali più maturi e baciati dal sole, li bolliremo e li passeremo insieme per creare la "passata" perfetta. Questo viaggio sensoriale si conclude con una degustazione rustica di bruschette fresche e della tua salsa appena fatta, all\'ombra di ulivi secolari.',
        duration: 'Esperienza di Mezza Giornata',
        location: 'Azienda Agricola Biologica, Valle d\'Itria'
      },
      {
        id: 'private-chef',
        title: 'Chef a Domicilio B&B',
        num: '03',
        images: ['/assets/3.jpg', '/assets/3-b.jpg', '/assets/3-c.jpg'],
        shortDesc: 'Un\'esclusiva cena pugliese nel comfort del tuo alloggio.',
        fullDesc: 'Trasforma il tuo B&B o villa privata in un ristorante esclusivo. Il nostro chef privato creerà un menu pugliese su misura a più portate, utilizzando solo i migliori ingredienti di stagione provenienti dai mercati locali. Rilassati e goditi un\'esperienza culinaria intima e impeccabile senza mai dover lasciare la tua casa vacanze.',
        duration: 'Una Serata di Puro Gusto',
        location: 'Il Tuo Alloggio'
      }
    ]
  }
};

type Lang = 'en' | 'it';

function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
      className="fixed inset-0 bg-bg z-[9999] flex items-center justify-center"
    >
      <div className="text-[15vw] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-accent2 tracking-tighter">
        {progress}%
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [bookingExp, setBookingExp] = useState<Experience | null>(null);
  const [lang, setLang] = useState<Lang>('en');
  const [colorIndex, setColorIndex] = useState(0);
  const [showCookies, setShowCookies] = useState(true);

  const experienceColors = ['#C86B53', '#7A9A7A', '#A0522D', '#556B2F', '#D98A6C'];

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % experienceColors.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBook = (exp?: Experience) => {
    if (exp) {
      setBookingExp(exp);
    } else {
      window.open('https://api.whatsapp.com/send?phone=393492709028', '_blank');
    }
  };

  const t = TRANSLATIONS[lang];

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      <ExperienceModal experience={selectedExp} onClose={() => setSelectedExp(null)} onBook={() => handleBook(selectedExp!)} lang={lang} />
      <BookingModal experience={bookingExp} onClose={() => setBookingExp(null)} lang={lang} />

      <nav className="fixed top-0 left-0 w-full p-6 md:px-16 flex flex-col md:flex-row justify-between items-center z-50 bg-bg/60 backdrop-blur-xl border-b border-text/5">
        <div className="font-display font-bold text-2xl tracking-widest uppercase cursor-pointer">Ostuni</div>
        <div className="flex gap-6 text-sm font-medium uppercase text-text/60 mt-4 md:mt-0">
          <span className={`cursor-pointer transition-colors ${lang === 'en' ? 'text-accent1' : 'hover:text-accent1'}`} onClick={() => setLang('en')}>Eng</span>
          <span className={`cursor-pointer transition-colors ${lang === 'it' ? 'text-accent1' : 'hover:text-accent1'}`} onClick={() => setLang('it')}>Ita</span>
        </div>
        <button 
          onClick={() => handleBook()}
          className="mt-4 md:mt-0 px-8 py-3 bg-text text-bg rounded-full font-medium uppercase tracking-widest hover:bg-accent1 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
        >
          <MessageCircle size={18} />
          {t.nav.book}
        </button>
      </nav>

      <main>
        {/* Hero */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-20">
            <video 
              src="/assets/background.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-[2px]"></div>
          </div>
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={!loading ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            className="text-[14vw] leading-[0.85] font-display font-extrabold uppercase tracking-tighter text-center"
          >
            Ostuni<br/>
            <span className="text-accent1">Experience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={!loading ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-lg md:text-2xl font-sans font-light text-text/80 tracking-wide max-w-2xl mx-auto text-center px-4"
          >
            {t.hero.subtitle}
          </motion.p>
        </section>

        {/* Marquee */}
        <section className="py-12 bg-accent1 text-surface -rotate-2 scale-105 shadow-2xl relative z-10 overflow-hidden flex">
          <motion.div
            className="flex whitespace-nowrap w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            <div className="flex">
              <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase px-4">{t.marquee}</h2>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase px-4">{t.marquee}</h2>
            </div>
            <div className="flex">
              <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase px-4">{t.marquee}</h2>
              <h2 className="text-4xl md:text-6xl font-display font-extrabold uppercase px-4">{t.marquee}</h2>
            </div>
          </motion.div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 md:py-32 px-8 md:px-20 bg-bg">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-center mb-16">{t.reviewsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-2xl border border-text/10 bg-surface shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex text-accent1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text/80 italic mb-6">"{review.text}"</p>
                <p className="font-bold uppercase tracking-wider text-sm">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bending Grid */}
        <section className="pb-24 md:pb-32 px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.experiences.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`flex flex-col gap-6 cursor-pointer group ${i === 0 ? 'mt-0' : i === 1 ? 'md:mt-12' : 'md:mt-24'}`}
                onClick={() => setSelectedExp(item)}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                  <motion.img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-[120%] object-cover origin-top transition-transform duration-700 group-hover:scale-105"
                    initial={{ y: '-10%' }}
                    whileInView={{ y: '10%' }}
                    viewport={{ once: false }}
                    transition={{ ease: "linear" }}
                  />
                  <div 
                    className="absolute inset-0 mix-blend-color opacity-25 transition-colors duration-1000 ease-in-out group-hover:opacity-10"
                    style={{ backgroundColor: experienceColors[colorIndex] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex justify-between items-center border-t border-text/20 pt-4 font-display font-bold text-2xl uppercase group-hover:text-accent1 transition-colors duration-500">
                  {item.title}
                  <span className="font-sans font-normal text-sm text-accent2 group-hover:translate-x-1 transition-transform duration-500">{item.num}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="h-screen flex flex-col items-center justify-center bg-text text-bg relative overflow-hidden">
        <div className="cursor-pointer hover:opacity-70 transition-opacity group" onClick={() => handleBook()}>
          <h2 className="text-[12vw] md:text-[10vw] font-display font-extrabold leading-[0.9] uppercase tracking-tighter text-center pointer-events-none whitespace-pre-line group-hover:text-accent1 transition-colors duration-500">
            {t.footer.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8 text-accent2 group-hover:text-accent1 transition-colors duration-500">
            <MessageCircle size={32} />
            <span className="text-xl font-medium tracking-widest uppercase">WhatsApp</span>
          </div>
        </div>
        <div className="absolute bottom-8 w-full px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 font-medium uppercase text-xs tracking-wider opacity-70">
          <div>{t.footer.rights}</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent1 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent1 transition-colors">Cookie Policy</a>
          </div>
          <div>{t.footer.desc}</div>
          <div>{t.footer.loc}</div>
        </div>
      </footer>

      {showCookies && (
        <div className="fixed bottom-0 left-0 right-0 bg-text text-bg p-6 z-[100] flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
          <div className="text-sm max-w-3xl">
            <p className="font-bold mb-1 text-accent1">We value your privacy</p>
            <p className="opacity-80">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="#" className="underline hover:text-accent1">Privacy Policy</a> and <a href="#" className="underline hover:text-accent1">Cookie Policy</a>.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 mt-4 md:mt-0">
            <button 
              onClick={() => setShowCookies(false)}
              className="px-6 py-2 border border-bg/30 rounded-full text-sm hover:bg-bg/10 transition-colors"
            >
              Reject All
            </button>
            <button 
              onClick={() => setShowCookies(false)}
              className="px-6 py-2 bg-accent1 text-bg rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Accept All
            </button>
          </div>
        </div>
      )}
    </>
  );
}
