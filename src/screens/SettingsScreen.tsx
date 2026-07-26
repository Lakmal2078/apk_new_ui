import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGE_OPTIONS } from '../utils/language';
import { PrivacyPolicyModal } from '../components/PrivacyPolicyModal';
import { motion } from 'motion/react';
import {
  Settings,
  Globe,
  Lock,
  MessageSquare,
  User,
  RotateCcw,
  Save,
  Gift,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  FileText
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    isAppLockEnabled,
    toggleAppLock,
    securityPin,
    changeSecurityPin,
    userSettings,
    saveUserSettings,
    saveWhatsAppTemplates,
    resetWhatsAppTemplates
  } = useApp();

  // Settings State
  const [savedPlayerId, setSavedPlayerId] = useState<string>(userSettings.savedPlayerId);
  const [savedBank, setSavedBank] = useState<string>(userSettings.savedBank);
  const [newPin, setNewPin] = useState<string>('');

  // WhatsApp Templates State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [activeWaTab, setActiveWaTab] = useState<'depApproved' | 'depPending' | 'depRejected' | 'withApproved' | 'withPending' | 'withRejected'>('depApproved');
  const [waDepApproved, setWaDepApproved] = useState<string>(userSettings.waDepApprovedTemplate);
  const [waDepPending, setWaDepPending] = useState<string>(userSettings.waDepPendingTemplate);
  const [waDepRejected, setWaDepRejected] = useState<string>(userSettings.waDepRejectedTemplate);
  const [waWithApproved, setWaWithApproved] = useState<string>(userSettings.waWithApprovedTemplate);
  const [waWithPending, setWaWithPending] = useState<string>(userSettings.waWithPendingTemplate);
  const [waWithRejected, setWaWithRejected] = useState<string>(userSettings.waWithRejectedTemplate);

  const handleSaveUserPrefs = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserSettings(savedPlayerId, savedBank, language, userSettings.privacyPref);
  };

  const handleSaveTemplates = () => {
    saveWhatsAppTemplates({
      waDepApprovedTemplate: waDepApproved,
      waDepPendingTemplate: waDepPending,
      waDepRejectedTemplate: waDepRejected,
      waWithApprovedTemplate: waWithApproved,
      waWithPendingTemplate: waWithPending,
      waWithRejectedTemplate: waWithRejected
    });
  };

  const handleInsertPlaceholder = (placeholder: string) => {
    switch (activeWaTab) {
      case 'depApproved':
        setWaDepApproved((prev) => prev + ` ${placeholder}`);
        break;
      case 'depPending':
        setWaDepPending((prev) => prev + ` ${placeholder}`);
        break;
      case 'depRejected':
        setWaDepRejected((prev) => prev + ` ${placeholder}`);
        break;
      case 'withApproved':
        setWaWithApproved((prev) => prev + ` ${placeholder}`);
        break;
      case 'withPending':
        setWaWithPending((prev) => prev + ` ${placeholder}`);
        break;
      case 'withRejected':
        setWaWithRejected((prev) => prev + ` ${placeholder}`);
        break;
    }
  };

  // Compile active template preview string
  const getCompiledPreview = () => {
    let tpl = "";
    switch (activeWaTab) {
      case 'depApproved': tpl = waDepApproved; break;
      case 'depPending': tpl = waDepPending; break;
      case 'depRejected': tpl = waDepRejected; break;
      case 'withApproved': tpl = waWithApproved; break;
      case 'withPending': tpl = waWithPending; break;
      case 'withRejected': tpl = waWithRejected; break;
    }

    return tpl
      .replace('{PLAYER_ID}', savedPlayerId || '98234156')
      .replace('{AMOUNT}', '15,000')
      .replace('{BANK}', 'Bank of Ceylon (BOC)')
      .replace('{REF}', 'BOC20260725X89')
      .replace('{PAYOUT_REF}', 'PAY-BOC-99214')
      .replace('{REASON}', 'Invalid transfer reference');
  };

  const promoUrl = "https://reffpa.com/L?tag=d_2481353m_1622c_&site=2481353&ad=1622";

  return (
    <div className="max-w-3xl mx-auto space-y-5 pb-8 text-slate-100">
      {/* Header */}
      <div className="glass-panel p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 glow-cyan">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">{t('settings_screen_title')}</h2>
            <p className="text-xs text-slate-400 font-medium">{t('settings_screen_sub')}</p>
          </div>
        </div>
      </div>

      {/* 1. Language & Regional Settings */}
      <div className="glass-panel p-4 sm:p-5 space-y-3.5">
        <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 tracking-tight">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span>{t('settings_lang_title')}</span>
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {LANGUAGE_OPTIONS.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                onClick={() => setLanguage(opt.code)}
                className={`py-3 px-3 rounded-2xl border text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 glow-cyan'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. App Security & Lock Settings */}
      <div className="glass-panel p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 tracking-tight">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>{t('settings_sec_title')}</span>
          </h3>

          <button
            onClick={() => toggleAppLock(!isAppLockEnabled)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
              isAppLockEnabled
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 glow-cyan'
                : 'bg-slate-900 text-slate-400 border-slate-800'
            }`}
          >
            {isAppLockEnabled ? t('settings_enabled') : t('settings_disabled')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t('settings_curr_pin')}</label>
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-800 font-mono font-black text-amber-300 text-sm">
              •••• ({securityPin})
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t('settings_update_pin')}</label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="4 digits"
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs font-mono text-slate-100 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  changeSecurityPin(newPin);
                  setNewPin('');
                }}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shrink-0 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer glow-cyan"
              >
                {t('settings_update_btn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. User Defaults Form */}
      <div className="glass-panel p-4 sm:p-5 space-y-3.5">
        <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 tracking-tight">
          <User className="w-4 h-4 text-cyan-400" />
          <span>{t('settings_user_defaults')}</span>
        </h3>

        <form onSubmit={handleSaveUserPrefs} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">{t('settings_def_player_id')}</label>
            <input
              type="text"
              value={savedPlayerId}
              onChange={(e) => setSavedPlayerId(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-slate-100 font-black outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">{t('settings_def_bank')}</label>
            <input
              type="text"
              value={savedBank}
              onChange={(e) => setSavedBank(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-slate-100 font-bold outline-none"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black hover:from-cyan-400 hover:to-blue-500 transition-all shadow-lg shadow-cyan-500/20 cursor-pointer glow-cyan"
            >
              {t('settings_save_presets_btn')}
            </motion.button>
          </div>
        </form>
      </div>

      {/* 4. WhatsApp Automated Templates Configurator */}
      <div className="glass-panel p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-100 flex items-center gap-2 tracking-tight">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>{t('settings_wa_templates_title')}</span>
          </h3>

          <button
            onClick={resetWhatsAppTemplates}
            className="p-1.5 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-900 transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
            title="Reset to Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('settings_reset_btn')}</span>
          </button>
        </div>

        {/* Template Sub-tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'depApproved', label: 'Dep Approved' },
            { id: 'depPending', label: 'Dep Pending' },
            { id: 'depRejected', label: 'Dep Rejected' },
            { id: 'withApproved', label: 'Payout Approved' },
            { id: 'withPending', label: 'Payout Pending' },
            { id: 'withRejected', label: 'Payout Rejected' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveWaTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap border transition-all cursor-pointer ${
                activeWaTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 glow-cyan'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Placeholder Chips */}
        <div>
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider block mb-1.5">
            {t('settings_insert_chip')}:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['{PLAYER_ID}', '{AMOUNT}', '{BANK}', '{REF}', '{PAYOUT_REF}', '{REASON}'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleInsertPlaceholder(chip)}
                className="px-3 py-1 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-[11px] font-bold transition-all cursor-pointer"
              >
                + {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Active Template Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1">
            {t('settings_edit_tpl_text')}
          </label>
          <textarea
            rows={4}
            value={
              activeWaTab === 'depApproved' ? waDepApproved :
              activeWaTab === 'depPending' ? waDepPending :
              activeWaTab === 'depRejected' ? waDepRejected :
              activeWaTab === 'withApproved' ? waWithApproved :
              activeWaTab === 'withPending' ? waWithPending : waWithRejected
            }
            onChange={(e) => {
              const val = e.target.value;
              if (activeWaTab === 'depApproved') setWaDepApproved(val);
              else if (activeWaTab === 'depPending') setWaDepPending(val);
              else if (activeWaTab === 'depRejected') setWaDepRejected(val);
              else if (activeWaTab === 'withApproved') setWaWithApproved(val);
              else if (activeWaTab === 'withPending') setWaWithPending(val);
              else if (activeWaTab === 'withRejected') setWaWithRejected(val);
            }}
            className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl p-3.5 text-xs text-slate-100 font-mono leading-relaxed outline-none"
          />
        </div>

        {/* Live Chat Bubble Preview */}
        <div className="p-4 rounded-2xl bg-[#0B141A] border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between text-[10px] text-cyan-300 font-black uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {t('settings_wa_preview')}
            </span>
            <span className="text-slate-500">Fast 1XBet Bot</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#005C4B] text-slate-100 text-xs font-mono leading-relaxed whitespace-pre-wrap shadow-md">
            {getCompiledPreview()}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleSaveTemplates}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer glow-cyan"
        >
          <Save className="w-4 h-4" />
          <span>{t('settings_save_wa_btn')}</span>
        </motion.button>
      </div>

      {/* 5. Privacy Policy Section */}
      <div className="glass-panel p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-cyan-500/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 glow-cyan">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black text-slate-100 block tracking-tight">
              {t('privacy_policy_title')}
            </span>
            <p className="text-xs text-slate-400 font-medium">
              {t('privacy_policy_sub')}
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsPrivacyModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/40 hover:bg-cyan-500/20 text-cyan-300 font-black text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer glow-cyan"
        >
          <FileText className="w-4 h-4" />
          <span>{t('privacy_policy_btn')}</span>
        </motion.button>
      </div>

      {/* 6. Promo Code Banner */}
      <div className="glass-panel p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-amber-500/30 glow-amber">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-300 block tracking-tight">{t('settings_promo_title')}</span>
            <p className="text-xs text-slate-400 font-medium">
              {t('settings_promo_sub')}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.open(promoUrl, '_blank')}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:from-amber-300 hover:to-amber-400 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer glow-amber"
        >
          <span>{t('settings_claim_bonus')}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};

