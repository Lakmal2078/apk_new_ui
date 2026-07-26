import React, { useState, memo } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export const FaqSection: React.FC = memo(() => {
  const { t } = useApp();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { questionKey: 'faq_q1', answerKey: 'faq_a1' },
    { questionKey: 'faq_q2', answerKey: 'faq_a2' },
    { questionKey: 'faq_q3', answerKey: 'faq_a3' },
    { questionKey: 'faq_q4', answerKey: 'faq_a4' }
  ];

  return (
    <div className="glass-panel p-5 text-slate-100">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-9 h-9 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 glow-cyan">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-cyan-300 tracking-tight">{t('faq_title')}</h3>
          <p className="text-xs text-slate-400 font-medium">{t('faq_sub')}</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-md transition-all">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-3.5 text-left text-xs sm:text-sm font-bold text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
              >
                <span>{t(faq.questionKey)}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-300 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-400 border-t border-slate-800/60 leading-relaxed font-medium">
                      {t(faq.answerKey)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
});

FaqSection.displayName = 'FaqSection';

