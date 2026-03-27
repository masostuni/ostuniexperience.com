import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export interface Experience {
  id: string;
  title: string;
  num: string;
  images: string[];
  shortDesc: string;
  fullDesc: string;
  duration: string;
  location: string;
}

interface ExperienceModalProps {
  experience: Experience | null;
  onClose: () => void;
  onBook: () => void;
  lang: 'en' | 'it';
}

const TRANSLATIONS = {
  en: {
    bookBtn: "Reserve Your Private Experience"
  },
  it: {
    bookBtn: "Prenota la Tua Esperienza Privata"
  }
};

export default function ExperienceModal({ experience, onClose, onBook, lang }: ExperienceModalProps) {
  const t = TRANSLATIONS[lang];
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (experience) setImgIndex(0);
  }, [experience]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (experience) {
      setImgIndex((prev) => (prev + 1) % experience.images.length);
    }
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (experience) {
      setImgIndex((prev) => (prev - 1 + experience.images.length) % experience.images.length);
    }
  };

  return (
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full md:w-[600px] md:left-1/2 md:-translate-x-1/2 md:bottom-8 bg-surface border border-text/10 md:rounded-3xl rounded-t-3xl p-8 z-[101] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-text/50 hover:text-text transition-colors bg-bg rounded-full p-2">
              <X size={20} />
            </button>

            <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-inner relative group">
              <img src={experience.images[imgIndex]} alt={experience.title} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              
              {experience.images.length > 1 && (
                <>
                  <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg/50 backdrop-blur-sm text-text p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg/50 backdrop-blur-sm text-text p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-bg">
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {experience.images.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIndex ? 'bg-surface' : 'bg-surface/50'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-display font-bold uppercase leading-tight pr-8">{experience.title}</h3>
                <span className="font-sans font-bold text-accent1 text-xl">{experience.num}</span>
              </div>
              
              <p className="text-text/80 text-lg font-medium">{experience.shortDesc}</p>
              
              <div className="flex gap-4 py-4 border-y border-text/10">
                <div className="flex items-center gap-2 text-text/60 text-sm font-medium uppercase tracking-wider">
                  <Clock size={16} className="text-accent2" /> {experience.duration}
                </div>
                <div className="flex items-center gap-2 text-text/60 text-sm font-medium uppercase tracking-wider">
                  <MapPin size={16} className="text-accent1" /> {experience.location}
                </div>
              </div>

              <p className="text-text/70 leading-relaxed">
                {experience.fullDesc}
              </p>

              <div className="pt-6">
                <button
                  onClick={() => {
                    onClose();
                    onBook();
                  }}
                  className="w-full py-4 bg-text text-bg font-bold uppercase tracking-widest rounded-xl hover:bg-accent1 hover:text-surface transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300"
                >
                  <Calendar size={20} />
                  {t.bookBtn}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
