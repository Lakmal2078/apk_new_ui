import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import {
  ArrowDownCircle,
  Copy,
  Upload,
  CheckCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const DepositScreen: React.FC = () => {
  const {
    t,
    banks,
    userSettings,
    addDeposit,
    showToast,
    setActiveTab
  } = useApp();

  const [playerId, setPlayerId] = useState<string>(userSettings.savedPlayerId || "98234156");
  const [selectedBankName, setSelectedBankName] = useState<string>(
    banks.length > 0 ? banks[0].bankName : "LOLC Bank"
  );
  const [amount, setAmount] = useState<string>("5000");
  const [reference, setReference] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [slipImage, setSlipImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const activeBankObj = banks.find((b) => b.bankName === selectedBankName) || banks[0];

  const presets = [1000, 2500, 5000, 10000, 25000, 50000];

  const handleCopyBankDetails = () => {
    if (!activeBankObj) return;
    const details = `Bank: ${activeBankObj.bankName}\nHolder: ${activeBankObj.accountHolder}\nAcc: ${activeBankObj.accountNumber}\nBranch: ${activeBankObj.branch || "Main Branch"}`;
    navigator.clipboard.writeText(details);
    showToast(t('toast_copied', { label: activeBankObj.bankName }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      const reader = new FileReader();
      reader.onload = () => {
        setSlipImage(reader.result as string);
        setTimeout(() => {
          setIsAnalyzing(false);
          const autoRef = `REF${Math.floor(100000 + Math.random() * 900000)}`;
          setReference(autoRef);
          showToast(t('deposit_ocr_extracted', { ref: autoRef }));
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!playerId.trim()) {
      showToast(t('deposit_err_player_id'));
      return;
    }
    if (isNaN(numericAmount) || numericAmount < 1000) {
      showToast(t('deposit_err_min_amt'));
      return;
    }

    addDeposit(
      playerId.trim(),
      selectedBankName,
      numericAmount,
      reference.trim() || undefined,
      senderName.trim() || undefined,
      slipImage || undefined
    );

    // Reset inputs
    setReference("");
    setSlipImage(null);
    setActiveTab('history');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-8">
      {/* Header */}
      <div className="glass-panel p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 glow-cyan">
            <ArrowDownCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">{t('deposit_screen_title')}</h2>
            <p className="text-xs text-slate-400 font-medium">{t('deposit_screen_sub')}</p>
          </div>
        </div>
      </div>

      {/* Deposit Step-by-Step Instructions Card */}
      <div className="glass-panel p-4 sm:p-5 space-y-4 border-cyan-500/30 glow-cyan">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">💳</span>
            <h3 className="text-base sm:text-lg font-black text-cyan-300 tracking-tight">
              Deposit Step-by-Step
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 uppercase tracking-wider">
            1xBet Deposit Guide
          </span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
          {/* Step 1 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">බැංකු විස්තර ලබා ගන්න (Get Bank Details)</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                පහත පෝරමයෙන් ඔබ තැන්පත් කරන බැංකුව තෝරාගන්න, නැතහොත් <button type="button" onClick={() => setActiveTab('banks')} className="text-amber-300 underline font-extrabold cursor-pointer hover:text-amber-200">Banks</button> පිටුවෙන් අපගේ සක්‍රීය (Active) ගිණුම් අංකය සහ නම Copy කරගන්න.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">මුදල් තැන්පත් කරන්න (Transfer Money)</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                ඔබගේ Online Banking App එකෙන් (BOC, Sampath, Commercial, HNB, LOLC ආදී), ATM/CDM යන්ත්‍රයෙන් හෝ iPay හරහා අපගේ ගිණුමට මුදල් තැන්පත් කරන්න.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">රිසිට්පත / Reference සටහන් කරගන්න (Keep Receipt)</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                මුදල් යැවූ පසු ලැබෙන Slip/Screenshot එක ඡායාරූපයක් ලෙස තබාගන්න හෝ Transaction Reference / Ref No. සටහන් කරගන්න.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">1xBet ID සහ මුදල ඇතුළත් කරන්න (Enter Details)</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                පහත පෝරමයේ (Form) ඔබගේ <strong>1xBet User ID</strong> එක සහ ඔබ තැන්පත් කළ නිවැරදි මුදල ඇතුළත් කරන්න.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              5
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">රිසිට්පත Upload කර Submit කරන්න (Submit Request)</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                රිසිට්පතෙහි ඡායාරූපය Upload කර හෝ Ref Number එක යොදා <strong className="text-cyan-300">Submit Deposit Request</strong> බොත්තම ඔබන්න.
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex items-start gap-3 bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/30">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              6
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">ගිණුමට මුදල් එකතුවේ (Instant Top-Up)</span>
              <p className="text-slate-200 leading-relaxed text-xs font-medium">
                අපගේ Agent විසින් බැංකු තැන්පතුව පරීක්ෂා කර විනාඩි 5 - 10 ක් ඇතුළත ඔබගේ 1xBet ගිණුමට කෙලින්ම මුදල් බැර කරනු ඇත!
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Receiving Bank Account Info Card */}
        <div className="glass-panel p-4 sm:p-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">
              {t('deposit_step1')}
            </span>
            <button
              type="button"
              onClick={handleCopyBankDetails}
              className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{t('deposit_copy_btn')}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t('deposit_select_bank_label')}</label>
            <select
              value={selectedBankName}
              onChange={(e) => setSelectedBankName(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 font-bold outline-none focus:border-cyan-400 transition-all cursor-pointer"
            >
              {banks.map((b) => (
                <option key={b.id} value={b.bankName}>
                  {b.bankName} - {b.displayNumber}
                </option>
              ))}
            </select>
          </div>

          {activeBankObj && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2.5 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">{t('deposit_acc_holder')}:</span>
                <span className="font-extrabold text-slate-200">{activeBankObj.accountHolder}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">{t('deposit_acc_num')}:</span>
                <span className="font-mono font-black text-cyan-300 text-sm">{activeBankObj.displayNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 font-medium">{t('deposit_branch')}:</span>
                <span className="text-slate-300 font-medium">{activeBankObj.branch || "Main Branch"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Player ID & Deposit Amount */}
        <div className="glass-panel p-4 sm:p-5 space-y-4">
          <span className="text-xs font-black text-cyan-300 uppercase tracking-wider block">
            {t('deposit_step2')}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('deposit_player_id_label')}</label>
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="e.g. 98234156"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 font-extrabold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('deposit_amt_label')}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Min 1,000 LKR"
                min="1000"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-cyan-300 font-black outline-none"
              />
            </div>
          </div>

          {/* Amount Presets Chips */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">{t('deposit_quick_presets')}</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                    amount === val.toString()
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Transfer Receipt & Reference */}
        <div className="glass-panel p-4 sm:p-5 space-y-3.5">
          <span className="text-xs font-black text-cyan-300 uppercase tracking-wider block">
            {t('deposit_step3')}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('deposit_slip_ref_label')}</label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="e.g. BOC20260725X89"
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 font-mono outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('deposit_sender_name_label')}</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. K. Perera"
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-cyan-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 outline-none font-semibold"
              />
            </div>
          </div>

          {/* Slip Image Upload Dropzone */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">{t('deposit_upload_label')}</label>
            <label className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/60 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              {isAnalyzing ? (
                <div className="flex items-center gap-2 text-xs text-cyan-300 font-extrabold py-2">
                  <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
                  <span>{t('deposit_ocr_analyzing')}</span>
                </div>
              ) : slipImage ? (
                <div className="flex items-center gap-3 w-full">
                  <img src={slipImage} alt="Slip" className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
                  <div className="flex-1 text-xs">
                    <span className="font-extrabold text-cyan-300 block flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400" /> {t('deposit_slip_loaded')}
                    </span>
                    <span className="text-slate-400 text-[11px] font-medium">{t('deposit_click_change')}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2 space-y-1">
                  <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                  <span className="text-xs text-slate-300 font-bold block">{t('deposit_dropzone_prompt')}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{t('deposit_dropzone_supports')}</span>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-sm hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer glow-cyan"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{t('deposit_submit_btn')}</span>
        </motion.button>
      </form>
    </div>
  );
};

