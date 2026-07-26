import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SRI_LANKAN_BANKS } from '../utils/storage';
import { motion } from 'motion/react';
import {
  ArrowUpCircle,
  KeyRound,
  Lock
} from 'lucide-react';

export const WithdrawScreen: React.FC = () => {
  const {
    t,
    userSettings,
    addWithdrawal,
    showToast,
    setActiveTab
  } = useApp();

  const [playerId, setPlayerId] = useState<string>(userSettings.savedPlayerId || "98234156");
  const [selectedBankName, setSelectedBankName] = useState<string>(SRI_LANKAN_BANKS[0]);
  const [amount, setAmount] = useState<string>("10000");
  const [accountHolder, setAccountHolder] = useState<string>("K. Perera");
  const [accountNumber, setAccountNumber] = useState<string>("8839201923");
  const [secretCode, setSecretCode] = useState<string>("");

  const presets = [1000, 2500, 5000, 10000, 25000, 50000];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!playerId.trim()) {
      showToast(t('withdraw_err_player_id'));
      return;
    }
    if (isNaN(numericAmount) || numericAmount < 1000) {
      showToast(t('withdraw_err_min_amt'));
      return;
    }
    if (!accountHolder.trim() || !accountNumber.trim()) {
      showToast(t('withdraw_err_acc_info'));
      return;
    }

    addWithdrawal(
      playerId.trim(),
      selectedBankName,
      numericAmount,
      accountHolder.trim(),
      accountNumber.trim(),
      secretCode.trim()
    );

    // Reset secret code
    setSecretCode("");
    setActiveTab('history');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 pb-8">
      {/* Header */}
      <div className="glass-panel p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-300 glow-amber">
            <ArrowUpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-tight">{t('withdraw_screen_title')}</h2>
            <p className="text-xs text-slate-400 font-medium">{t('withdraw_screen_sub')}</p>
          </div>
        </div>
      </div>

      {/* Withdrawal Step-by-Step Instructions Card */}
      <div className="glass-panel p-4 sm:p-5 space-y-4 border-amber-500/30 glow-amber">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏧</span>
            <h3 className="text-base sm:text-lg font-black text-amber-300 tracking-tight">
              Withdrawal Step-by-Step
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            1xBet Cash Guide
          </span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-slate-200">
          {/* Step 1 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block mb-0.5">Login to the App</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                Open the <strong>1xBet App</strong> and go to <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">Profile → Withdraw Funds</code>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block mb-0.5">Select 1xBet Cash</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                Select <strong className="text-cyan-300">"1xBet Cash"</strong> from the available payment methods list.
              </p>
            </div>
          </div>

          {/* Step 3 - Location Info with copy buttons */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div className="w-full">
              <span className="font-extrabold text-amber-300 block mb-1">Enter City & Location</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">City</span>
                    <strong className="text-slate-100 font-mono text-xs">Walasmulla</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("Walasmulla");
                      showToast("City 'Walasmulla' copied!");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-black border border-amber-500/30 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Street</span>
                    <strong className="text-slate-100 font-mono text-xs">Beliatta Road 24/7</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("Beliatta Road 24/7");
                      showToast("Street 'Beliatta Road 24/7' copied!");
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-black border border-amber-500/30 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block mb-0.5">Enter Amount</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                Enter the amount you wish to withdraw and press <strong>Confirm</strong>.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              5
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block mb-0.5">Get Security Code</span>
              <p className="text-slate-300 leading-relaxed text-xs font-medium">
                After entering the 4-digit SMS code sent to your phone, the Withdrawal Request will be Approved.
                Then press the <strong className="text-amber-300">"Get Code"</strong> button in the app to receive your 🔐 <strong>Security Code</strong> (secret code).
              </p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex items-start gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              6
            </div>
            <div>
              <span className="font-extrabold text-amber-300 block mb-0.5">Send Details to Agent</span>
              <p className="text-slate-300 leading-relaxed text-xs mb-1.5 font-medium">
                Fill in the form below with:
              </p>
              <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-300 font-medium list-disc list-inside bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <li>Your 1xBet User ID</li>
                <li>Amount withdrawn</li>
                <li>🔐 Security Code</li>
                <li>Your Bank details</li>
              </ul>
            </div>
          </div>

          {/* Step 7 */}
          <div className="flex items-start gap-3 bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/30">
            <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
              7
            </div>
            <div>
              <span className="font-extrabold text-cyan-300 block mb-0.5">Receive Money Fast</span>
              <p className="text-slate-200 leading-relaxed text-xs font-medium">
                The agent enters your security code into the system and immediately transfers the funds directly into your provided Sri Lankan bank account!
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Player ID & Amount */}
        <div className="glass-panel p-4 sm:p-5 space-y-4">
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
            {t('withdraw_step1')}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_player_id_label')}</label>
              <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="e.g. 98234156"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 font-extrabold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_amt_label')}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Min 1,000 LKR"
                min="1000"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-300 font-black outline-none"
              />
            </div>
          </div>

          {/* Amount Presets */}
          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1.5">{t('withdraw_quick_presets')}</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setAmount(val.toString())}
                  className={`py-2 rounded-xl text-xs font-black transition-all border cursor-pointer ${
                    amount === val.toString()
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 2: Sri Lankan Receiving Bank Details */}
        <div className="glass-panel p-4 sm:p-5 space-y-3.5">
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
            {t('withdraw_step2')}
          </span>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_select_bank')}</label>
            <select
              value={selectedBankName}
              onChange={(e) => setSelectedBankName(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 font-bold outline-none focus:border-amber-400 transition-all cursor-pointer"
            >
              {SRI_LANKAN_BANKS.map((bankName) => (
                <option key={bankName} value={bankName}>
                  {bankName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_acc_holder')}</label>
              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                placeholder="Name as registered on Bank"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 font-extrabold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_acc_number')}</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="e.g. 8839201923"
                required
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-300 font-mono font-black outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Secret Withdrawal Code */}
        <div className="glass-panel p-4 sm:p-5 space-y-3.5">
          <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
            {t('withdraw_step3')}
          </span>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">{t('withdraw_secret_code_label')}</label>
            <div className="relative">
              <input
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                placeholder="Enter Code generated in 1XBet App (e.g. 998214)"
                className="w-full bg-slate-950/90 border border-slate-800 focus:border-amber-400 rounded-2xl px-3.5 py-3 pl-10 text-xs sm:text-sm text-slate-100 font-mono font-black outline-none"
              />
              <KeyRound className="w-4 h-4 text-amber-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 font-medium flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              {t('withdraw_code_help')}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer glow-amber"
        >
          <ArrowUpCircle className="w-5 h-5" />
          <span>{t('withdraw_submit_btn')}</span>
        </motion.button>
      </form>
    </div>
  );
};

