import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, FileText, Lock, Eye, AlertTriangle, Phone, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = React.memo(({ isOpen, onClose }) => {
  const { language } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="glass-panel p-5 sm:p-6 max-w-2xl w-full my-8 border-cyan-500/40 glow-cyan relative space-y-5"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 glow-cyan shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase tracking-wider">
                  Official Legal Notice
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight mt-0.5">
                  Privacy Policy - Fast Xbet Official Sri Lanka
                </h2>
                <p className="text-xs text-slate-400 font-medium">
                  පෞද්ගලිකත්ව ප්‍රතිපත්තිය | ආරක්ෂිත ගනුදෙනු සහ දත්ත ආරක්ෂණය
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-100 hover:bg-slate-800 cursor-pointer transition-all shrink-0"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Policy Content */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-200 max-h-[60vh] overflow-y-auto pr-1 leading-relaxed">
            
            {/* Section 1 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-black">
                <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1. එකතු කරන තොරතුරු (Information We Collect)</span>
              </div>
              <p className="text-slate-400 text-xs font-medium">
                අපගේ සේවාව ලබා දීම සඳහා අපි ඔබගෙන් පහත තොරතුරු පමණක් ඉල්ලා සිටින්නෙමු:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300 font-medium text-xs">
                <li>ඔබගේ 1xBet පරිශීලක හැඳුනුම්පත (User ID).</li>
                <li>මුදල් තැන්පත් කළ බව තහවුරු කරන රිසිට්පත් (Deposit Receipts).</li>
                <li>මුදල් ලබා ගැනීම සඳහා අවශ්‍ය වන ආරක්ෂක කේත (Security Codes).</li>
                <li>ඔබගේ බැංකු ගිණුම් විස්තර (මුදල් එවීමට පමණක්).</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-black">
                <Eye className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>2. තොරතුරු භාවිතා කරන ආකාරය (How We Use Information)</span>
              </div>
              <p className="text-slate-400 text-xs font-medium">
                ඔබ ලබා දෙන තොරතුරු භාවිතා කරනුයේ:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-slate-300 font-medium text-xs">
                <li>ඔබගේ 1xBet ගිණුමට මුදල් තැන්පත් කිරීමට.</li>
                <li>ඔබ ඉල්ලා සිටින මුදල් ලබා ගැනීම් (Withdrawals) තහවුරු කර ඔබගේ බැංකු ගිණුමට එවීම සඳහා පමණි.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-black">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3. දත්ත ආරක්ෂණය (Data Protection)</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 font-medium text-xs">
                <li>ඔබගේ කිසිදු පෞද්ගලික තොරතුරක් බාහිර පාර්ශවයන් වෙත විකිණීම හෝ හුවමාරු කිරීම සිදු නොකෙරේ.</li>
                <li>සියලුම ගනුදෙනු විස්තර රහසිගතව තබා ගන්නා අතර, සේවාව අවසන් වූ පසු අනවශ්‍ය දත්ත පද්ධතියෙන් ඉවත් කරනු ලැබේ.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-black">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>4. වගකීම් සහතිකය (Disclaimer)</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300 font-medium text-xs">
                <li>අප සේවාව ලබා දෙන්නේ තැන්පතු සහ මුදල් ලබා ගැනීම් පහසු කිරීමට පමණි.</li>
                <li>1xBet ආයතනය සමඟ ඇති වන තාක්ෂණික ගැටලු හෝ ක්‍රීඩාවෙන් වන පාඩු සම්බන්ධයෙන් අප වගකීමක් දරනු නොලැබේ.</li>
                <li>ඔබගේ 1xBet ගිණුමේ රහස්‍යභාවය සුරැකීම ඔබ සතු වගකීමකි.</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-300 font-black">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>5. අප හා සම්බන්ධ වීමට (Contact Us)</span>
                </div>
                <p className="text-slate-300 text-xs font-semibold">
                  පෞද්ගලිකත්වය පිළිබඳ කිසියම් ගැටලුවක් ඇත්නම් අප හා සම්බන්ධ වන්න.
                </p>
              </div>

              <a
                href="https://wa.me/94765865387"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 shrink-0"
              >
                <span>+94 76 586 5387</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Footer Action */}
          <div className="border-t border-slate-800 pt-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 glow-cyan"
            >
              තේරුම් ගතිමි / ACCEPT & CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});

PrivacyPolicyModal.displayName = 'PrivacyPolicyModal';
