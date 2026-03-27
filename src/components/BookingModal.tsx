import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar as CalendarIcon, CreditCard, CheckCircle2 } from 'lucide-react';
import { Experience } from './ExperienceModal';

interface BookingModalProps {
  experience: Experience | null;
  onClose: () => void;
  lang: 'en' | 'it';
}

const TRANSLATIONS = {
  en: {
    title: "Reserve Your Experience",
    date: "Select Date",
    guests: "Number of Guests",
    payStripe: "Pay with Credit Card",
    payPayPal: "Pay with PayPal",
    success: "Booking Confirmed!",
    successDesc: "We've sent you an email with all the details.",
    close: "Close"
  },
  it: {
    title: "Prenota la tua Esperienza",
    date: "Seleziona Data",
    guests: "Numero di Ospiti",
    payStripe: "Paga con Carta di Credito",
    payPayPal: "Paga con PayPal",
    success: "Prenotazione Confermata!",
    successDesc: "Ti abbiamo inviato un'email con tutti i dettagli.",
    close: "Chiudi"
  }
};

export default function BookingModal({ experience, onClose, lang }: BookingModalProps) {
  const t = TRANSLATIONS[lang];
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');

  const handlePayment = () => {
    if (!date) {
      alert(lang === 'it' ? 'Seleziona una data' : 'Please select a date');
      return;
    }
    setStep('success');
  };

  return (
    <AnimatePresence>
      {experience && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-md z-[200]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-surface border border-text/10 rounded-3xl p-8 z-[201] shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-text/50 hover:text-text transition-colors bg-bg rounded-full p-2">
              <X size={20} />
            </button>

            {step === 'form' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase leading-tight pr-8 mb-2">{t.title}</h3>
                  <p className="text-accent1 font-medium">{experience.title}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-text/70 mb-2">
                      {t.date}
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50" size={18} />
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-bg border border-text/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-accent1 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-wider text-text/70 mb-2">
                      {t.guests}
                    </label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-bg border border-text/10 rounded-xl py-3 px-4 focus:outline-none focus:border-accent1 transition-colors appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handlePayment}
                    className="w-full py-3.5 bg-[#635BFF] text-white font-bold rounded-xl hover:bg-[#5851E5] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <CreditCard size={18} />
                    {t.payStripe}
                  </button>
                  <button 
                    onClick={handlePayment}
                    className="w-full py-3.5 bg-[#FFC439] text-[#003087] font-bold rounded-xl hover:bg-[#F4BB36] transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
                    </svg>
                    {t.payPayPal}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-20 h-20 bg-accent1/10 text-accent1 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold uppercase">{t.success}</h3>
                <p className="text-text/70">{t.successDesc}</p>
                <button 
                  onClick={onClose}
                  className="mt-8 px-8 py-3 bg-text text-bg font-bold uppercase tracking-widest rounded-xl hover:bg-accent1 hover:text-surface transition-colors inline-block"
                >
                  {t.close}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
