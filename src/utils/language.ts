import { AppLanguage, LanguageOption } from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'si', name: 'සිංහල', flag: '🇱🇰' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'தமிழ்', flag: '🇱🇰' }
];

export const STRINGS: Record<string, Record<AppLanguage, string>> = {
  // App Core & Navigation
  app_name: {
    si: 'Fast 1XBet Cash',
    en: 'Fast 1XBet Cash',
    ta: 'Fast 1XBet Cash'
  },
  app_tagline: {
    si: 'ශ්‍රී ලංකා නිල Cashier සහ ක්ෂණික බැංකු ගෙවීම් පද්ධතිය',
    en: 'Sri Lanka Cashier Bot & Instant Bank Gateway',
    ta: 'இலங்கை காசாளர் போட் & உடனடி வங்கி நுழைவாயில்'
  },
  admin_mode_badge: {
    si: 'පරිපාලක මාදිලිය',
    en: 'ADMIN MODE',
    ta: 'நிர்வாக முறை'
  },
  nav_home: {
    si: 'මුල් පිටුව',
    en: 'Home',
    ta: 'முகப்பு'
  },
  nav_deposit: {
    si: 'තැන්පතු',
    en: 'Deposit',
    ta: 'வைப்பு'
  },
  nav_withdraw: {
    si: 'ලබාගැනීම්',
    en: 'Withdraw',
    ta: 'திரும்பப் பெறல்'
  },
  nav_history: {
    si: 'වාර්තා',
    en: 'History',
    ta: 'வரலாறு'
  },
  nav_banks: {
    si: 'බැංකු ගිණුම්',
    en: 'Banks',
    ta: 'வங்கிகள்'
  },
  nav_aichat: {
    si: 'AI සහායක',
    en: 'AI Support',
    ta: 'AI உதவி'
  },
  nav_admin: {
    si: 'පරිපාලක',
    en: 'Admin',
    ta: 'நிர்வாகி'
  },
  nav_settings: {
    si: 'සැකසුම්',
    en: 'Settings',
    ta: 'அமைப்புகள்'
  },
  admin_on: {
    si: 'පරිපාලක සක්‍රියයි',
    en: 'Admin On',
    ta: 'நிர்வாகி ஆன்'
  },
  admin_off: {
    si: 'පරිපාලක අක්‍රියයි',
    en: 'Admin Off',
    ta: 'நிர்வாகி ஆஃப்'
  },

  // Statuses
  status_approved: {
    si: 'අනුමතයි',
    en: 'APPROVED',
    ta: 'அங்கீகரிக்கப்பட்டது'
  },
  status_pending: {
    si: 'පෝලිමේ',
    en: 'PENDING',
    ta: 'நிலுவையில் உள்ளது'
  },
  status_ai_review: {
    si: 'AI සමාලෝචනය',
    en: 'AI REVIEW',
    ta: 'AI மறுஆய்வு'
  },
  status_rejected: {
    si: 'ප්‍රතික්ෂේපිතයි',
    en: 'REJECTED',
    ta: 'நிராகரிக்கப்பட்டது'
  },

  // Toasts & Notifications
  toast_dark_theme: {
    si: 'අඳුරු තේමාව සක්‍රිය කරන ලදී',
    en: 'Dark Theme Applied',
    ta: 'இருண்ட தீம் பயன்படுத்தப்பட்டது'
  },
  toast_light_theme: {
    si: 'ආලෝක තේමාව සක්‍රිය කරන ලදී',
    en: 'Light Theme Applied',
    ta: 'ஒளி தீம் பயன்படுத்தப்பட்டது'
  },
  toast_admin_enabled: {
    si: 'පරිපාලක පාලන මාදිලිය සක්‍රිය කරන ලදී',
    en: 'Admin Control Mode Enabled',
    ta: 'நிர்வாக கட்டுப்பாட்டு முறை செயல்படுத்தப்பட்டது'
  },
  toast_admin_disabled: {
    si: 'පරිශීලක මාදිලියට මාරු විය',
    en: 'Switched to User Mode',
    ta: 'பயனர் பயன்முறைக்கு மாறப்பட்டது'
  },
  toast_lock_enabled: {
    si: 'PIN අංකය සහිත ආරක්ෂිත අගුල සක්‍රියයි',
    en: 'App Lock Enabled with PIN',
    ta: 'PIN உடன் ஆப் லாக் இயக்கப்பட்டது'
  },
  toast_lock_disabled: {
    si: 'ආරක්ෂිත අගුල අක්‍රිය කරන ලදී',
    en: 'App Lock Disabled',
    ta: 'ஆப் லாக் முடக்கப்பட்டது'
  },
  toast_pin_updated: {
    si: 'ආරක්ෂිත PIN අංකය {pin} ලෙස යාවත්කාලීන විය',
    en: 'Security PIN updated to {pin}',
    ta: 'பாதுகாப்பு PIN {pin} என புதுப்பிக்கப்பட்டது'
  },
  toast_pin_length_error: {
    si: 'PIN අංකය අංක 4ක් විය යුතුය',
    en: 'PIN must be exactly 4 digits',
    ta: 'PIN சரியாக 4 இலக்கங்களாக இருக்க வேண்டும்'
  },
  toast_app_locked: {
    si: 'ආරක්ෂාව සඳහා යෙදුම අගුළු දැමුණි',
    en: 'App Locked for Security',
    ta: 'பாதுகாப்பிற்காக பயன்பாடு பூட்டப்பட்டது'
  },
  toast_app_unlocked: {
    si: 'යෙදුම සාර්ථකව අගුළු හරින ලදී!',
    en: 'App Unlocked Successfully!',
    ta: 'பயன்பாடு வெற்றிகரமாக திறக்கப்பட்டது!'
  },
  toast_pin_incorrect: {
    si: 'වැරදි PIN අංකයකි. නැවත උත්සාහ කරන්න.',
    en: 'Incorrect PIN. Please try again.',
    ta: 'தவறான PIN. மீண்டும் முயற்சிக்கவும்.'
  },
  toast_bio_verified: {
    si: 'ජෛවමිතික තහවුරු විය! අගුළු හරින ලදී.',
    en: 'Biometric Touch Verified! App Unlocked.',
    ta: 'பயோமெட்ரிக் சரிபார்க்கப்பட்டது! பயன்பாடு திறக்கப்பட்டது.'
  },
  toast_lang_switched: {
    si: 'භාෂාව සිංහල ලෙස මාරු විය',
    en: 'Language switched to ENGLISH',
    ta: 'மொழி தமிழுக்கு மாற்றப்பட்டது'
  },
  toast_prefs_saved: {
    si: 'පරිශීලක මනාප සුරකින ලදී!',
    en: 'User Preferences Saved!',
    ta: 'பயனர் விருப்பத்தேர்வுகள் சேமிக்கப்பட்டன!'
  },
  toast_deposit_submitted: {
    si: 'තැන්පතු පත්‍රිකාව #{id} සමාලෝචනය සඳහා යොමු කරන ලදී!',
    en: 'Deposit Slip #{id} submitted for review!',
    ta: 'வைப்புச் சீட்டு #{id} மதிப்பாய்விற்கு சமர்ப்பிக்கப்பட்டது!'
  },
  toast_deposit_approved: {
    si: 'තැන්පතුව #{id} අනුමත කර ගිණුම්ගත කරන ලදී!',
    en: 'Deposit #{id} APPROVED & credited!',
    ta: 'வைப்பு #{id} அங்கீகரிக்கப்பட்டு வரவு வைக்கப்பட்டது!'
  },
  toast_deposit_rejected: {
    si: 'තැන්පතුව #{id} ප්‍රතික්ෂේප විය ({reason})',
    en: 'Deposit #{id} REJECTED ({reason})',
    ta: 'வைப்பு #{id} நிராகரிக்கப்பட்டது ({reason})'
  },
  toast_withdrawal_queued: {
    si: 'මුදල් ලබාගැනීමේ ඉල්ලීම #{id} පෝලිම්ගත විය!',
    en: 'Withdrawal Request #{id} queued for payout!',
    ta: 'திரும்பப் பெறல் கோரிக்கை #{id} வரிசையில் சேர்க்கப்பட்டது!'
  },
  toast_payout_approved: {
    si: 'මුදල් ගෙවීම #{id} Ref {payoutRef} සමඟ අනුමත විය!',
    en: 'Payout #{id} APPROVED with Ref {payoutRef}',
    ta: 'கொடுப்பனவு #{id} Ref {payoutRef} உடன் அங்கீகரிக்கப்பட்டது'
  },
  toast_payout_rejected: {
    si: 'මුදල් ගෙවීම #{id} ප්‍රතික්ෂේප විය ({reason})',
    en: 'Payout #{id} REJECTED ({reason})',
    ta: 'கொடுப்பனவு #{id} நிராகரிக்கப்பட்டது ({reason})'
  },
  toast_bank_added: {
    si: '{bankName} ගිණුම සාර්ථකව එකතු කරන ලදී!',
    en: 'Added {bankName} account successfully!',
    ta: '{bankName} கணக்கு வெற்றிகரமாக சேர்க்கப்பட்டது!'
  },
  toast_chat_cleared: {
    si: 'සංවාද වාර්තා මකා දමන ලදී',
    en: 'Chat History Cleared',
    ta: 'அரட்டை வரலாறு அழிக்கப்பட்டது'
  },
  toast_wa_saved: {
    si: 'WhatsApp ප්‍රතිචාර ආකෘති සුරකින ලදී!',
    en: 'WhatsApp Response Templates Saved!',
    ta: 'WhatsApp மறுமொழி வார்ப்புருக்கள் சேமிக்கப்பட்டன!'
  },
  toast_wa_reset: {
    si: 'WhatsApp ආකෘති යථා තත්ත්වයට පත් කරන ලදී',
    en: 'WhatsApp Templates Reset to Default',
    ta: 'WhatsApp வார்ப்புருக்கள் மீட்டமைக்கப்பட்டன'
  },
  toast_no_csv: {
    si: 'අපනයනය කිරීමට වාර්තා නොමැත',
    en: 'No records available to export',
    ta: 'ஏற்றுமதி செய்ய பதிவுகள் எதுவும் இல்லை'
  },
  toast_csv_exported: {
    si: 'CSV ගොනුව අපනයනය කරන ලදී (ගනුදෙනු {count})',
    en: 'CSV Exported ({count} transactions)',
    ta: 'CSV ஏற்றுமதி செய்யப்பட்டது ({count} பரிவர்த்தனைகள்)'
  },
  toast_copied: {
    si: '{label} පිටපත් කර ගන්නා ලදී!',
    en: 'Copied {label} to clipboard!',
    ta: '{label} கிளிப்போர்டுக்கு நகலெடுக்கப்பட்டது!'
  },
  toast_promo_open: {
    si: '1XBet ප්‍රවර්ධන ලියාපදිංචි පිටුව විවෘත වේ...',
    en: 'Opening 1XBet Promo Registration Page...',
    ta: '1XBet விளம்பரப் பதிவுப் பக்கம் திறக்கிறது...'
  },

  // Home Screen
  home_sri_lanka_cashier: {
    si: 'ශ්‍රී ලංකා නිල CASHIER',
    en: 'SRI LANKA OFFICIAL CASHIER',
    ta: 'இலங்கை அதிகாரப்பூர்வ காசாளர்'
  },
  home_player_id: {
    si: 'ක්‍රීඩක ID අංකය:',
    en: 'Player ID:',
    ta: 'வீரர் ஐடி:'
  },
  home_hub_title: {
    si: 'Fast 1XBet මුදල් මධ්‍යස්ථානය',
    en: 'Fast 1XBet Cash Hub',
    ta: 'Fast 1XBet பண மையம்'
  },
  home_hub_sub: {
    si: 'BOC, People\'s, Sampath සහ Commercial Bank සඳහා පැය 24 පුරාම ක්ෂණික බැංකු හුවමාරු සේවාව.',
    en: 'Instant 24/7 bank transfer processing for BOC, People\'s Bank, Sampath & Commercial Bank.',
    ta: 'BOC, People\'s, Sampath மற்றும் Commercial வங்கிகளுக்கான உடனடி 24/7 வங்கி பரிமாற்ற செயலாக்கம்.'
  },
  home_deposit_now: {
    si: 'දැන් තැන්පත් කරන්න',
    en: 'DEPOSIT NOW',
    ta: 'இப்போது வைப்பு செய்யவும்'
  },
  home_cash_out: {
    si: 'මුදල් ලබාගන්න',
    en: 'CASH OUT',
    ta: 'பணத்தை திரும்பப் பெறுக'
  },
  home_total_deposits: {
    si: 'මුළු තැන්පතු',
    en: 'Total Deposits',
    ta: 'மொத்த வைப்புகள்'
  },
  home_slip_submissions: {
    si: 'තැන්පතු පත්‍රිකා',
    en: 'slip submissions',
    ta: 'வைப்பு சமர்ப்பிப்புகள்'
  },
  home_total_withdrawals: {
    si: 'මුළු ලබාගැනීම්',
    en: 'Total Withdrawals',
    ta: 'மொத்த திரும்பப் பெறுதல்கள்'
  },
  home_payout_requests: {
    si: 'ලබාගැනීම් ඉල්ලීම්',
    en: 'payout requests',
    ta: 'கொடுப்பனவு கோரிக்கைகள்'
  },
  home_success_rate: {
    si: 'සාර්ථකත්ව අනුපාතය',
    en: 'Success Rate',
    ta: 'வெற்றி விகிதம்'
  },
  home_approved_count: {
    si: 'අනුමත වූ සංඛ්‍යාව',
    en: 'approved',
    ta: 'அங்கீகரிக்கப்பட்டது'
  },
  home_active_banks: {
    si: 'සක්‍රිය බැංකු',
    en: 'Active Banks',
    ta: 'செயலில் உள்ள வங்கிகள்'
  },
  home_online_gateway: {
    si: 'සක්‍රිය පද්ධතිය',
    en: 'Online Gateway',
    ta: 'ஆன்லைன் நுழைவாயில்'
  },
  home_quick_actions: {
    si: 'ඉක්මන් ක්‍රියාමාර්ග',
    en: 'Cashier Quick Actions',
    ta: 'விரைவான நடவடிக்கைகள்'
  },
  home_promo_title: {
    si: 'ප්‍රවර්ධන කේතය: VGSL',
    en: 'PROMO CODE: VGSL',
    ta: 'விளம்பரக் குறியீடு: VGSL'
  },
  home_promo_badge: {
    si: '200% බෝනස්',
    en: '200% BONUS',
    ta: '200% போனஸ்'
  },
  home_promo_desc: {
    si: '200% පළමු තැන්පතු බෝනස් එක ලබාගැනීමට 1XBet ලියාපදිංචි වීමේදී VGSL කේතය යොදන්න.',
    en: 'Register on 1XBet with promo code VGSL for 200% first deposit bonus.',
    ta: '200% முதல் வைப்பு போனஸுக்கு VGSL விளம்பரக் குறியீட்டைக் கொண்டு 1XBet இல் பதிவுசெய்க.'
  },
  home_claim_bonus: {
    si: 'බෝනස් ලබාගන්න',
    en: 'CLAIM BONUS',
    ta: 'போனஸைக் கோருங்கள்'
  },
  home_recent_tx: {
    si: 'මෑත කාලීන ගනුදෙනු',
    en: 'Recent Transactions',
    ta: 'சமீபத்திய பரிவர்த்தனைகள்'
  },
  home_view_all: {
    si: 'සියල්ල බලන්න ({count})',
    en: 'View All ({count})',
    ta: 'அனைத்தையும் காண்க ({count})'
  },
  home_no_transactions: {
    si: 'මෑත කාලීන ගනුදෙනු නොමැත. ආරම්භ කිරීමට තැන්පතුවක් හෝ මුදල් ලබාගැනීමක් සිදුකරන්න!',
    en: 'No recent transactions. Submit a deposit or withdrawal to get started!',
    ta: 'சமீபத்திய பரிவர்த்தனைகள் எதுவும் இல்லை. தொடங்க ஒரு வைப்பு அல்லது திரும்பப் பெறுதலைச் சமர்ப்பிக்கவும்!'
  },

  // Deposit Screen
  dep_title: {
    si: '1XBet ගිණුමට මුදල් තැන්පත් කිරීම',
    en: 'Deposit Funds to 1XBet Account',
    ta: '1XBet கணக்கிற்கு பணத்தை வைப்பு செய்க'
  },
  dep_sub: {
    si: 'ක්ෂණික AI OCR රිසිට්පත් පරීක්ෂාව සහ ශ්‍රී ලංකා බැංකු ගිණුම්ගත කිරීම',
    en: 'Instant AI OCR slip verification & Sri Lankan bank crediting',
    ta: 'உடனடி AI OCR சீட்டு சரிபார்ப்பு மற்றும் இலங்கை வங்கி வரவு'
  },
  dep_step1: {
    si: 'පියවර 1: තැන්පතු බැංකුව තෝරන්න',
    en: 'Step 1: Select Deposit Bank',
    ta: 'படி 1: வைப்பு வங்கியைத் தேர்ந்தெடுக்கவும்'
  },
  dep_copy_details: {
    si: 'විස්තර පිටපත් කරන්න',
    en: 'Copy Details',
    ta: 'விவரங்களை நகலெடு'
  },
  dep_select_bank_label: {
    si: 'තැන්පතු භාරගන්නා බැංකු ගිණුම',
    en: 'Select Bank Account',
    ta: 'வங்கி கணக்கைத் தேர்ந்தெடுக்கவும்'
  },
  dep_acc_holder: {
    si: 'ගිණුම් හිමියා:',
    en: 'Account Holder:',
    ta: 'கணக்கு வைத்திருப்பவர்:'
  },
  dep_acc_number: {
    si: 'ගිණුම් අංකය:',
    en: 'Account Number:',
    ta: 'கணக்கு எண்:'
  },
  dep_branch: {
    si: 'ශාඛාව:',
    en: 'Branch:',
    ta: 'கிளை:'
  },
  dep_step2: {
    si: 'පියවර 2: ක්‍රීඩක ID අංකය සහ මුදල (LKR)',
    en: 'Step 2: Player ID & Amount (LKR)',
    ta: 'படி 2: வீரர் ஐடி & தொகை (LKR)'
  },
  dep_player_id_label: {
    si: '1XBet ක්‍රීඩක ID අංකය',
    en: '1XBet Player ID',
    ta: '1XBet வீரர் ஐடி'
  },
  dep_amount_label: {
    si: 'තැන්පතු මුදල (LKR)',
    en: 'Deposit Amount (LKR)',
    ta: 'வைப்புத் தொகை (LKR)'
  },
  dep_amount_placeholder: {
    si: 'අවම 1,000 LKR',
    en: 'Min 1,000 LKR',
    ta: 'குறைந்தபட்சம் 1,000 LKR'
  },
  dep_quick_presets: {
    si: 'ඉක්මන් මුදල් ප්‍රමාණ (LKR):',
    en: 'Quick Presets (LKR):',
    ta: 'விரைவான அளவுகள் (LKR):'
  },
  dep_step3: {
    si: 'පියවර 3: තැන්පතු පත්‍රිකාව සහ රිසිට්පත් අංකය (AI පරීක්ෂාව)',
    en: 'Step 3: Transfer Slip & Reference (OCR Verification)',
    ta: 'படி 3: பரிமாற்றச் சீட்டு மற்றும் குறிப்பு எண் (OCR சரிபார்ப்பு)'
  },
  dep_ref_label: {
    si: 'බැංකු රිසිට්පත් අංකය (Reference No.)',
    en: 'Bank Slip Reference No.',
    ta: 'வங்கி சீட்டு குறிப்பு எண்'
  },
  dep_ref_placeholder: {
    si: 'උදා: BOC20260725X89',
    en: 'e.g. BOC20260725X89',
    ta: 'எ.கா. BOC20260725X89'
  },
  dep_sender_label: {
    si: 'යවන්නාගේ නම / ගිණුම (අත්‍යවශ්‍ය නොවේ)',
    en: 'Sender Name / Acc (Optional)',
    ta: 'அனுப்புனர் பெயர் / கணக்கு (விருப்பமானது)'
  },
  dep_upload_label: {
    si: 'තැන්පතු රිසිට්පත් ඡායාරූපය එක් කරන්න',
    en: 'Upload Transfer Receipt Image',
    ta: 'பரிமாற்ற ரசீது படத்தை பதிவேற்றவும்'
  },
  dep_analyzing: {
    si: 'AI මඟින් රිසිට්පත පරීක්ෂා කරයි...',
    en: 'AI OCR Analyzing Transfer Slip...',
    ta: 'AI OCR பரிமாற்றச் சீட்டை ஆய்வு செய்கிறது...'
  },
  dep_slip_loaded: {
    si: 'රිසිට්පත ඇතුළත් කරන ලදී',
    en: 'Transfer Slip Loaded',
    ta: 'பரிமாற்றச் சீட்டு ஏற்றப்பட்டது'
  },
  dep_click_change: {
    si: 'වෙනස් කිරීමට ක්ලික් කරන්න',
    en: 'Click to change image',
    ta: 'படத்தை மாற்ற கிளிக் செய்யவும்'
  },
  dep_click_drop: {
    si: 'රිසිට්පත් ඡායාරූපය මෙතැනට යොමු කරන්න',
    en: 'Click or Drop Bank Slip Photo Here',
    ta: 'வங்கி சீட்டு புகைப்படத்தை இங்கே பதிவேற்றவும்'
  },
  dep_supports: {
    si: 'JPG, PNG, WEBP සහාය දක්වයි',
    en: 'Supports JPG, PNG, WEBP',
    ta: 'JPG, PNG, WEBP ஆதரிக்கிறது'
  },
  dep_submit_btn: {
    si: 'තැන්පතු පත්‍රිකාව ඉදිරිපත් කරන්න',
    en: 'SUBMIT DEPOSIT SLIP NOW',
    ta: 'வைப்புச் சீட்டை இப்போது சமர்ப்பிக்கவும்'
  },

  // Withdraw Screen
  with_title: {
    si: '1XBet මුදල් ලබාගැනීම / බැංකු ගෙවීම්',
    en: 'Withdraw Cash / Bank Payout',
    ta: 'பணத்தை திரும்பப் பெறுதல் / வங்கி கொடுப்பனவு'
  },
  with_sub: {
    si: 'විනාඩි 5-15 ක් ඇතුළත ශ්‍රී ලංකා බැංකු ගිණුම් වෙත ක්ෂණික ගෙවීම්',
    en: '5 to 15 minutes instant bank payout to Sri Lankan accounts',
    ta: '5 முதல் 15 நிமிடங்களில் நேரடி வங்கி கொடுப்பனவு'
  },
  with_step1: {
    si: 'පියවර 1: ක්‍රීඩක ID සහ ලබාගන්නා මුදල',
    en: 'Step 1: Player ID & Withdrawal Amount',
    ta: 'படி 1: வீரர் ஐடி & திரும்பப் பெறும் தொகை'
  },
  with_amount_label: {
    si: 'ලබාගන්නා මුදල (LKR)',
    en: 'Withdrawal Amount (LKR)',
    ta: 'திரும்பப் பெறும் தொகை (LKR)'
  },
  with_step2: {
    si: 'පියවර 2: මුදල් ලබාගන්නා බැංකු ගිණුම් විස්තර',
    en: 'Step 2: Receiving Bank Account Details',
    ta: 'படி 2: பெறும் வங்கி கணக்கு விவரங்கள்'
  },
  with_select_bank: {
    si: 'බැංකුව තෝරන්න',
    en: 'Select Bank',
    ta: 'வங்கியைத் தேர்ந்தெடுக்கவும்'
  },
  with_holder_label: {
    si: 'ගිණුම් හිමියාගේ සම්පූර්ණ නම',
    en: 'Account Holder Full Name',
    ta: 'கணக்கு வைத்திருப்பவரின் முழு பெயர்'
  },
  with_acc_label: {
    si: 'බැංකු ගිණුම් අංකය',
    en: 'Bank Account Number',
    ta: 'வங்கி கணக்கு எண்'
  },
  with_step3: {
    si: 'පියවර 3: 1XBet රහස් සංකේතය (Secret Code)',
    en: 'Step 3: 1XBet Withdrawal Secret Code',
    ta: 'படி 3: 1XBet இரகசியக் குறியீடு'
  },
  with_code_label: {
    si: '1XBet Cash රහස් අංකය',
    en: '1XBet Cash Secret Code',
    ta: '1XBet Cash இரகசியக் குறியீடு'
  },
  with_code_placeholder: {
    si: '1XBet ඇප් එකෙන් ලබාගත් අංක 6ක Secret Code එක සටහන් කරන්න',
    en: 'Enter Code generated in 1XBet App (e.g. 998214)',
    ta: '1XBet பயன்பாட்டில் உருவாக்கப்பட்ட 6 இலக்கக் குறியீட்டை உள்ளிடவும்'
  },
  with_tip: {
    si: '1XBet ඇප් එකේ Cashier > Withdraw > Fast 1XBet Cash වෙත ගොස් ලබාගන්නා අංක 6ක Secret Code එක මෙහි සටහන් කරන්න.',
    en: 'Generate the withdrawal request inside your 1XBet account under Cashier > Withdraw > Fast 1XBet Cash and copy the 6-digit Secret Code here.',
    ta: '1XBet கணக்கில் Cashier > Withdraw > Fast 1XBet Cash கீழ் கோரிக்கையை உருவாக்கி 6 இலக்க இரகசியக் குறியீட்டை இங்கே நகலெடுக்கவும்.'
  },
  with_submit_btn: {
    si: 'මුදල් ලබාගැනීමේ ඉල්ලීම ඉදිරිපත් කරන්න',
    en: 'REQUEST INSTANT BANK PAYOUT NOW',
    ta: 'உடனடி வங்கி கொடுப்பனவை இப்போது கோருங்கள்'
  },

  // History Screen & Details Modal
  hist_title: {
    si: 'ගනුදෙනු වාර්තා සහ විගණන ලොගය',
    en: 'Transaction History & Audit Ledger',
    ta: 'பரிவர்த்தனை வரலாறு மற்றும் தணிக்கைப் பதிவு'
  },
  hist_sub: {
    si: 'තැන්පතු සහ මුදල් ලබාගැනීමේ ඉල්ලීම් සජීවීව නිරීක්ෂණය කරන්න',
    en: 'Real-time tracking of deposit slips and bank payout requests',
    ta: 'வைப்பு மற்றும் கொடுப்பனவு கோரிக்கைகளின் நிகழ்நேர கண்காணிப்பு'
  },
  hist_search_placeholder: {
    si: 'Player ID, බැංකුව, රිසිට්පත් අංකය අනුව සොයන්න...',
    en: 'Search Player ID, Bank Name, Ref, Acc...',
    ta: 'வீரர் ஐடி, வங்கி பெயர், குறிப்பு எனத் தேடவும்...'
  },
  hist_filter_all: {
    si: 'සියලු ගනුදෙනු',
    en: 'All Types',
    ta: 'அனைத்து வகைகள்'
  },
  hist_filter_deposits: {
    si: 'තැන්පතු',
    en: 'Deposits',
    ta: 'வைப்புகள்'
  },
  hist_filter_withdrawals: {
    si: 'ලබාගැනීම්',
    en: 'Withdrawals',
    ta: 'திரும்பப் பெறுதல்கள்'
  },
  hist_export_csv: {
    si: 'CSV අපනයනය',
    en: 'Export CSV',
    ta: 'CSV ஏற்றுமதி'
  },
  hist_filtered_vol: {
    si: 'තෝරාගත් වටිනාකම:',
    en: 'Filtered Volume:',
    ta: 'வடிகட்டப்பட்ட அளவு:'
  },
  hist_tx_count: {
    si: 'ගනුදෙනු',
    en: 'Transactions',
    ta: 'பரிவர்த்தனைகள்'
  },
  hist_pending_queue: {
    si: 'පෝලිමේ ඇති',
    en: 'Pending Queue:',
    ta: 'நிலுவை வரிசை:'
  },
  hist_awaiting_review: {
    si: 'සමාලෝචනය වෙමින් පවතී',
    en: 'Awaiting Review',
    ta: 'காத்திருக்கிறது'
  },
  hist_no_records: {
    si: 'ඔබ සෙවූ පරාමිතීන්ට ගැලපෙන ගනුදෙනු වාර්තා හමු නොවුණි.',
    en: 'No transaction records match your search filter.',
    ta: 'உங்கள் தேடலுக்கு எந்தப் பரிவர்த்தனை பதிவுகளும் பொருந்தவில்லை.'
  },

  // Transaction Detail Modal
  tx_deposit_slip: {
    si: 'තැන්පතු පත්‍රිකාව #{id}',
    en: 'Deposit Slip #{id}',
    ta: 'வைப்புச் சீட்டு #{id}'
  },
  tx_payout_request: {
    si: 'ගෙවීම් ඉල්ලීම #{id}',
    en: 'Payout Request #{id}',
    ta: 'கொடுப்பனவு கோரிக்கை #{id}'
  },
  tx_tx_id: {
    si: 'ගනුදෙනු ID අංකය',
    en: 'Transaction ID',
    ta: 'பரிவர்த்தனை ஐடி'
  },
  tx_player_id: {
    si: '1XBet ක්‍රීඩක ID අංකය',
    en: '1XBet Player ID',
    ta: '1XBet வீரர் ஐடி'
  },
  tx_amount: {
    si: 'මුදල',
    en: 'Amount',
    ta: 'தொகை'
  },
  tx_bank_name: {
    si: 'බැංකුවේ නම',
    en: 'Bank Name',
    ta: 'வங்கி பெயர்'
  },
  tx_date_time: {
    si: 'දිනය සහ වේලාව',
    en: 'Date & Time',
    ta: 'தேதி & நேரம்'
  },
  tx_slip_ref: {
    si: 'රිසිට්පත් අංකය (Reference)',
    en: 'Bank Slip Reference',
    ta: 'வங்கி சீட்டு குறிப்பு'
  },
  tx_sender_name: {
    si: 'යවන්නාගේ නම / ගිණුම',
    en: 'Sender Name / Account',
    ta: 'அனுப்புனர் பெயர் / கணக்கு'
  },
  tx_ai_ocr_analysis: {
    si: 'AI කැෂියර් රිසිට්පත් පරීක්ෂාව',
    en: 'AI Cashier OCR Slip Analysis',
    ta: 'AI காசாளர் OCR சீட்டு பகுப்பாய்வு'
  },
  tx_uploaded_slip: {
    si: 'ඇතුළත් කළ රිසිට්පත් ඡායාරූපය',
    en: 'Uploaded Transfer Slip',
    ta: 'பதிவேற்றப்பட்ட பரிமாற்றச் சீட்டு'
  },
  tx_acc_holder: {
    si: 'ගිණුම් හිමියා',
    en: 'Account Holder',
    ta: 'கணக்கு வைத்திருப்பவர்'
  },
  tx_acc_number: {
    si: 'ගිණුම් අංකය',
    en: 'Account Number',
    ta: 'கணக்கு எண்'
  },
  tx_secret_code: {
    si: 'ලබාගැනීමේ රහස් අංකය (Secret Code)',
    en: 'Withdrawal Secret Code',
    ta: 'திரும்பப் பெறுதல் இரகசியக் குறியீடு'
  },
  tx_payout_ref: {
    si: 'බැංකු ගෙවීම් අංකය (Payout Ref)',
    en: 'Bank Payout Ref',
    ta: 'வங்கி கொடுப்பனவு குறிப்பு'
  },
  tx_rejection_reason: {
    si: 'ප්‍රතික්ෂේප වීමට හේතුව:',
    en: 'Rejection Reason:',
    ta: 'நிராகரிப்பு காரணம்:'
  },
  tx_close_details: {
    si: 'විස්තර වසන්න',
    en: 'Close Details',
    ta: 'மூடு'
  },

  // Banks Screen
  bank_title: {
    si: 'තැන්පතු භාරගන්නා බැංකු ගිණුම්',
    en: 'Deposit Receiving Bank Accounts',
    ta: 'வைப்பு பெறப்படும் வங்கி கணக்குகள்'
  },
  bank_sub: {
    si: 'පහත සඳහන් ඕනෑම සක්‍රිය ශ්‍රී ලංකා බැංකු ගිණුමකට මුදල් තැන්පත් කරන්න',
    en: 'Transfer funds to any active Sri Lankan bank account listed below',
    ta: 'கீழே பட்டியலிடப்பட்டுள்ள எந்தவொரு செயலில் உள்ள இலங்கை வங்கி கணக்கிற்கும் பணத்தை அனுப்பவும்'
  },
  bank_active: {
    si: 'සක්‍රියයි',
    en: 'ACTIVE',
    ta: 'செயலில் உள்ளது'
  },
  bank_copy_info: {
    si: 'විස්තර පිටපත් කරන්න',
    en: 'COPY INFO',
    ta: 'நகலெடு'
  },
  bank_main_branch: {
    si: 'ප්‍රධාන ශාඛාව',
    en: 'Main Branch',
    ta: 'முதன்மை கிளை'
  },

  // AI Chat Screen
  chat_title: {
    si: '1XBet AI සහායක බොට්',
    en: '1XBet AI Support Bot',
    ta: '1XBet AI உதவி பாட்'
  },
  chat_sub: {
    si: 'පැය 24 පුරාම ක්ෂණික තැන්පතු සහ ලබාගැනීම් සහාය',
    en: 'Instant 24/7 Deposit & Withdraw Help',
    ta: 'உடனடி 24/7 வைப்பு & திரும்பப் பெறுதல் உதவி'
  },
  chat_clear_title: {
    si: 'සංවාද මකා දමන්න',
    en: 'Clear History',
    ta: 'வரலாற்றை அழி'
  },
  chat_quick_q: {
    si: 'ඉක්මන් ප්‍රශ්න:',
    en: 'QUICK QUESTIONS:',
    ta: 'விரைவான கேள்விகள்:'
  },
  chat_q_deposit: {
    si: 'මුදල් තැන්පත් කරන්නේ කෙසේද?',
    en: 'How to deposit money?',
    ta: 'பணத்தை எவ்வாறு வைப்பு செய்வது?'
  },
  chat_q_promo: {
    si: 'ප්‍රවර්ධන කේතය කුමක්ද?',
    en: 'What is the promo code?',
    ta: 'விளம்பரக் குறியீடு என்ன?'
  },
  chat_q_limits: {
    si: 'මුදල් ලබාගැනීමේ සීමාවන්',
    en: 'Withdrawal limits & speed',
    ta: 'திரும்பப் பெறுதல் வரம்புகள்'
  },
  chat_q_banks: {
    si: 'බැංකු ගිණුම් විස්තර',
    en: 'Sri Lanka Bank Accounts',
    ta: 'இலங்கை வங்கி கணக்குகள்'
  },
  chat_input_placeholder: {
    si: '1XBet Cash පිළිබඳව AI සහායකගෙන් අසන්න...',
    en: 'Ask AI Assistant about 1XBet Cash...',
    ta: '1XBet Cash பற்றி AI உதவியாளரிடம் கேட்கவும்...'
  },

  // Admin Center Screen
  admin_locked_title: {
    si: 'පරිපාලක පාලන මධ්‍යස්ථානය අගුළු දමා ඇත',
    en: 'Admin Control Center Locked',
    ta: 'நிர்வாக மையம் பூட்டப்பட்டுள்ளது'
  },
  admin_locked_desc: {
    si: 'පරිපාලක මාදිලිය අක්‍රියයි. පරිශීලක තැන්පතු පත්‍රිකා පරීක්ෂා කිරීමට Admin Mode සක්‍රිය කරන්න.',
    en: 'Admin Mode is currently disabled in your app session. Toggle Admin Mode on to review user deposit slips and issue bank payouts.',
    ta: 'நிர்வாகி முறை தற்போது முடக்கப்பட்டுள்ளது. பயனர்களின் வைப்பு சீட்டுகளை மதிப்பாய்வு செய்ய நிர்வாக பயன்முறையை இயக்கவும்.'
  },
  admin_enable_btn: {
    si: 'පරිපාලක මාදිලිය සක්‍රිය කරන්න',
    en: 'Enable Admin Mode Now',
    ta: 'நிர்வாகி பயன்முறையை இப்போது இயக்கு'
  },
  admin_live_badge: {
    si: 'සජීවී පරිපාලක',
    en: 'LIVE ADMIN',
    ta: 'நேரலை நிர்வாகி'
  },
  admin_exit_btn: {
    si: 'පරිපාලක මාදිලියෙන් වෙන්වන්න',
    en: 'Exit Admin Mode',
    ta: 'நிர்வாக முறையிலிருந்து வெளியேறு'
  },
  admin_tab_pending_dep: {
    si: 'පෝලිමේ ඇති තැන්පතු ({count})',
    en: 'Pending Deposits ({count})',
    ta: 'நிலுவையில் உள்ள வைப்புகள் ({count})'
  },
  admin_tab_pending_payout: {
    si: 'පෝලිමේ ඇති ගෙවීම් ({count})',
    en: 'Pending Payouts ({count})',
    ta: 'நிலுவையில் உள்ள கொடுப்பனவுகள் ({count})'
  },
  admin_tab_analytics: {
    si: 'ගනුදෙනු විශ්ලේෂණය',
    en: 'Volume Analytics',
    ta: 'தொகுதி பகுப்பாய்வு'
  },
  admin_tab_audit: {
    si: 'විගණන සටහන්',
    en: 'Audit Logs',
    ta: 'தணிக்கை பதிவுகள்'
  },
  admin_tab_add_bank: {
    si: 'අලුත් බැංකුවක් එකතු කරන්න',
    en: 'Add Bank Account',
    ta: 'புதிய வங்கியைச் சேர்'
  },
  admin_pending_dep_title: {
    si: 'අනුමැතිය සඳහා පෝලිමේ ඇති තැන්පතු පත්‍රිකා',
    en: 'Pending Deposit Slips Awaiting Admin Approval',
    ta: 'நிர்வாகி ஒப்புதலுக்காக காத்திருக்கும் வைப்புச் சீட்டுகள்'
  },
  admin_all_dep_processed: {
    si: 'සියලුම තැන්පතු පත්‍රිකා සමාලෝචනය කර ඇත!',
    en: 'All deposit slips have been processed!',
    ta: 'அனைத்து வைப்புச் சீட்டுகளும் செயலாக்கப்பட்டுள்ளன!'
  },
  admin_approve_dep: {
    si: 'තැන්පතුව අනුමත කරන්න',
    en: 'Approve Deposit',
    ta: 'வைப்பை அங்கீகரிக்கவும்'
  },
  admin_reject_reason_placeholder: {
    si: 'ප්‍රතික්ෂේප වීමට හේතුව...',
    en: 'Rejection reason...',
    ta: 'நிராகரிப்பு காரணம்...'
  },
  admin_reject_btn: {
    si: 'ප්‍රතික්ෂේප කරන්න',
    en: 'Reject',
    ta: 'நிராகரி'
  },
  admin_pending_payouts_title: {
    si: 'පෝලිමේ ඇති මුදල් ලබාගැනීමේ ඉල්ලීම්',
    en: 'Pending Cash Withdrawal Requests',
    ta: 'நிலுவையில் உள்ள திரும்பப் பெறுதல் கோரிக்கைகள்'
  },
  admin_no_payouts: {
    si: 'පෝලිමේ ඇති ගෙවීම් නොමැත!',
    en: 'No pending payout requests!',
    ta: 'நிலுவையில் உள்ள கொடுப்பனவு கோரிக்கைகள் எதுவும் இல்லை!'
  },
  admin_payout_ref_placeholder: {
    si: 'බැංකු ගෙවීම් අංකය (උදා: PAY-COMB-901)',
    en: 'Bank Payout Ref (e.g. PAY-COMB-901)',
    ta: 'வங்கி கொடுப்பனவு குறிப்பு'
  },
  admin_approve_payout: {
    si: 'මුදල් ගෙවීම අනුමත කරන්න',
    en: 'Approve & Send Payout',
    ta: 'அங்கீகரித்து கொடுப்பனவை அனுப்பு'
  },
  admin_audit_title: {
    si: 'පරිපාලක සජීවී විගණන ලොගය',
    en: 'Live Admin Audit Trail',
    ta: 'நேரலை நிர்வாக தணிக்கைப் பதிவு'
  },
  admin_add_bank_title: {
    si: 'තැන්පතු භාරගන්නා අලුත් බැංකු ගිණුමක් එකතු කරන්න',
    en: 'Add Deposit Receiving Bank Account',
    ta: 'புதிய வைப்பு வங்கி கணக்கைச் சேர்க்கவும்'
  },
  admin_save_bank_btn: {
    si: 'බැංකු ගිණුම සුරකින්න',
    en: 'SAVE BANK ACCOUNT',
    ta: 'வங்கி கணக்கைச் சேமிக்கவும்'
  },
  admin_tab_banks: {
    si: 'බැංකු කළමනාකරණය',
    en: 'Manage Banks',
    ta: 'வங்கிகள் நிர்வாகம்'
  },
  admin_edit_bank_modal_title: {
    si: 'බැංකු ගිණුම් විස්තර සංස්කරණය',
    en: 'Edit Bank Account Details',
    ta: 'வங்கி கணக்கு விவரங்களைத் திருத்துக'
  },
  admin_update_bank_btn: {
    si: 'විස්තර යාවත්කාලීන කරන්න',
    en: 'UPDATE BANK DETAILS',
    ta: 'வங்கி விவரங்களைப் புதுப்பி'
  },
  toast_bank_updated: {
    si: '{bankName} ගිණුම් විස්තර යාවත්කාලීන විය!',
    en: 'Updated {bankName} details successfully!',
    ta: '{bankName} விவரங்கள் புதுப்பிக்கப்பட்டன!'
  },
  toast_bank_deleted: {
    si: 'බැංකු ගිණුම මකා දමන ලදී!',
    en: 'Bank account deleted successfully!',
    ta: 'வங்கி கணக்கு நீக்கப்பட்டது!'
  },

  // Settings Screen
  sett_title: {
    si: 'යෙදුම් සැකසුම් සහ මනාප',
    en: 'App Settings & Preferences',
    ta: 'பயன்பாட்டு அமைப்புகள்'
  },
  sett_sub: {
    si: 'භාෂාව, ආරක්ෂිත PIN අංකය, WhatsApp ස්වයංක්‍රීය පණිවිඩ ආකෘති',
    en: 'Language, security PIN, WhatsApp automated response templates',
    ta: 'மொழி, பாதுகாப்பு PIN, WhatsApp தானியங்கி மறுமொழி வார்ப்புருக்கள்'
  },
  sett_lang_title: {
    si: 'භාෂාව තෝරන්න (සිංහල / English / தமிழ்)',
    en: 'Language Selection (සිංහල / English / தமிழ்)',
    ta: 'மொழியைத் தேர்ந்தெடுக்கவும் (සිංහල / English / தமிழ்)'
  },
  sett_security_title: {
    si: 'යෙදුම් ආරක්ෂණ අගුල (PIN සහ Biometrics)',
    en: 'App Security Lock (PIN & Biometrics)',
    ta: 'பயன்பாட்டு பாதுகாப்பு பூட்டு'
  },
  sett_current_pin: {
    si: 'දැනට පවතින PIN අංකය',
    en: 'Current Security PIN',
    ta: 'தற்போதைய பாதுகாப்பு PIN'
  },
  sett_update_pin: {
    si: 'අලුත් PIN අංකය ඇතුළත් කරන්න (අංක 4ක්)',
    en: 'Update Security PIN (4 Digits)',
    ta: 'பாதுகாப்பு PIN ஐ புதுப்பிக்கவும் (4 இலக்கங்கள்)'
  },
  sett_update_btn: {
    si: 'යාවත්කාලීන කරන්න',
    en: 'UPDATE',
    ta: 'புதுப்பி'
  },
  sett_presets_title: {
    si: 'පෙරනිමි ක්‍රීඩක තොරතුරු',
    en: 'Default Player Presets',
    ta: 'இயல்புநிலை அமைப்புகள்'
  },
  sett_default_player_id: {
    si: 'පෙරනිමි 1XBet ක්‍රීඩක ID අංකය',
    en: 'Default 1XBet Player ID',
    ta: 'இயல்புநிலை 1XBet வீரர் ஐடி'
  },
  sett_default_bank: {
    si: 'පෙරනිමි බැංකු ගිණුම',
    en: 'Default Bank Account',
    ta: 'இயல்புநிலை வங்கி கணக்கு'
  },
  sett_save_presets_btn: {
    si: 'තොරතුරු සුරකින්න',
    en: 'SAVE DEFAULT PRESETS',
    ta: 'இயல்புநிலைகளைச் சேமி'
  },
  sett_wa_title: {
    si: 'WhatsApp ස්වයංක්‍රීය ප්‍රතිචාර ආකෘති',
    en: 'WhatsApp Response Automated Templates',
    ta: 'WhatsApp தானியங்கி மறுமொழி வார்ப்புருக்கள்'
  },
  sett_reset_btn: {
    si: 'යථා තත්ත්වයට',
    en: 'Reset',
    ta: 'மீட்டமை'
  },
  sett_insert_chip_label: {
    si: 'වෙනස් වන තොරතුරු ඇතුළත් කිරීමට ක්ලික් කරන්න:',
    en: 'Click chip to insert placeholder:',
    ta: 'ஒதுக்கிடத்தை செருக சிப்பை கிளிக் செய்க:'
  },
  sett_edit_tpl_label: {
    si: 'පණිවිඩ ආකෘතිය වෙනස් කරන්න',
    en: 'Edit Automated Template Text',
    ta: 'தானியங்கி வார்ப்புரு உரையைத் திருத்துக'
  },
  sett_preview_label: {
    si: 'සජීවී WhatsApp පණිවිඩ පූර්ව දර්ශනය',
    en: 'Live WhatsApp Response Preview',
    ta: 'நேரலை WhatsApp மறுமொழி முன்னோட்டம்'
  },
  sett_save_templates_btn: {
    si: 'WHATSAPP ආකෘති සුරකින්න',
    en: 'SAVE WHATSAPP TEMPLATES',
    ta: 'WHATSAPP வார்ப்புருக்களைச் சேமிக்கவும்'
  },

  // Lock Screen Modal
  lock_modal_title: {
    si: 'ආරක්ෂිත PIN අංකය ඇතුළත් කරන්න',
    en: 'Enter Security PIN',
    ta: 'பாதுகாப்பு PIN ஐ உள்ளிடவும்'
  },
  lock_modal_prompt: {
    si: '1XBet Cashier පද්ධතියට පිවිසීමට අංක 4ක PIN එක සටහන් කරන්න',
    en: 'Enter 4-digit PIN to unlock Fast Cashier App',
    ta: 'பயன்பாட்டைத் திறக்க 4 இலக்க PIN ஐ உள்ளிடவும்'
  },
  lock_modal_err: {
    si: 'වැරදි PIN අංකයකි!',
    en: 'Incorrect Security PIN!',
    ta: 'தவறான பாதுகாப்பு PIN!'
  },
  lock_modal_bio_btn: {
    si: 'ඇඟිලි සලකුණ භාවිතයෙන් අගුළු හරින්න',
    en: 'Tap for Biometric / Touch Unlock',
    ta: 'கைரேகை மூலம் திறக்கவும்'
  },
  lock_modal_tip: {
    si: 'මුල් PIN අංකය: {pin} (හෝ ඇඟිලි සලකුණ තබන්න)',
    en: 'Default PIN: {pin} (or Tap Fingerprint)',
    ta: 'இயல்புநிலை PIN: {pin} (அல்லது கைரேகை)'
  },

  // FAQ Section
  faq_title: {
    si: 'නිතර අසන ප්‍රශ්න',
    en: 'Frequently Asked Questions',
    ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்'
  },
  faq_sub: {
    si: '1XBet ශ්‍රී ලංකා Cashier පිළිබඳ දැනගත යුතු කරුණු',
    en: 'Instant answers about 1XBet Sri Lanka Cashier',
    ta: '1XBet இலங்கை காசாளர் பற்றிய உடனடி பதில்கள்'
  },
  faq_q1: {
    si: 'බැංකු තැන්පතුවක් 1XBet ගිණුමට එකතු වීමට කොපමණ වේලාවක් ගතවේද?',
    en: 'How long does a bank deposit take to credit to 1XBet?',
    ta: '1XBet கணக்கில் வங்கி வைப்பு வரவு வைக்க எவ்வளவு நேரம் ஆகும்?'
  },
  faq_a1: {
    si: 'BOC, People\'s, Sampath, හෝ Commercial Bank හරහා සිදුකරන තැන්පතු AI මඟින් පරීක්ෂා කිරීමෙන් පසු විනාඩි 2-5ක් ඇතුළත ගිණුම්ගත වේ.',
    en: 'Most automated deposits via Bank of Ceylon (BOC), Commercial Bank, Sampath Bank, or People\'s Bank are credited within 2 to 5 minutes after our AI verifies your bank slip reference.',
    ta: 'இலங்கை வங்கி (BOC), கொமர்ஷல் வங்கி, சம்பத் வங்கி அல்லது மக்கள் வங்கி வழியிலான வைப்புகள் 2 முதல் 5 நிமிடங்களுக்குள் வரவு வைக்கப்படும்.'
  },
  faq_q2: {
    si: 'අවම සහ උපරිම තැන්පතු / මුදල් ලබාගැනීමේ සීමාවන් මොනවාද?',
    en: 'What is the minimum & maximum deposit / withdrawal amount?',
    ta: 'குறைந்தபட்ச & அதிகபட்ச வைப்பு / திரும்பப் பெறல் தொகை என்ன?'
  },
  faq_a2: {
    si: 'අවම තැන්පතුව සහ අවම ලබාගැනීම LKR 1,000 වේ. එක් වරකදී ලබාගත හැකි උපරිම මුදල LKR 500,000 වේ.',
    en: 'Minimum deposit is LKR 1,000. Minimum withdrawal is LKR 1,000. Maximum withdrawal per single bank transfer request is LKR 500,000.',
    ta: 'குறைந்தபட்ச வைப்பு மற்றும் திரும்பப் பெறல் LKR 1,000. ஒரு கோரிக்கைக்கான அதிகபட்ச திரும்பப் பெறல் LKR 500,000.'
  },
  faq_q3: {
    si: '200% බෝනස් සඳහා VGSL ප්‍රවර්ධන කේතය භාවිතා කරන්නේ කෙසේද?',
    en: 'How do I use the 200% Bonus Promo Code VGSL?',
    ta: '200% போனஸ் விளம்பரக் குறியீடு VGSL ஐ எவ்வாறு பயன்படுத்துவது?'
  },
  faq_a3: {
    si: '1XBet හි ලියාපදිංචි වීමේදී VGSL ප්‍රවර්ධන කේතය යොදන්න. මෙම ඇප් එක හරහා පළමු තැන්පතුව සිදුකර LKR 50,000 දක්වා බෝනස් ලබාගන්න.',
    en: 'When registering a new account on 1XBet, enter VGSL in the promo code field. Make your first deposit through this cashier app to instantly claim up to 50,000 LKR bonus.',
    ta: '1XBet இல் பதிவுசெய்யும் போது Promo Code புலத்தில் VGSL ஐ உள்ளிடவும். உங்கள் முதல் வைப்பைச் செய்து 50,000 LKR வரை போனஸைப் பெறுங்கள்.'
  },
  faq_q4: {
    si: 'තැන්පතුව ප්‍රමාද වුවහොත් හෝ AI REVIEW ලෙස පෙන්වන්නේ නම් කුමක් කළ යුතුද?',
    en: 'What should I do if my deposit is delayed or under review?',
    ta: 'எனது வைப்பு தாமதமானால் அல்லது மதிப்பாய்வில் இருந்தால் நான் என்ன செய்ய வேண்டும்?'
  },
  faq_a4: {
    si: 'ඔබගේ තැන්පතු තත්ත්වය \'AI REVIEW\' ලෙස ඇත්නම් රිසිට්පත් ඡායාරූපය පැහැදිලිදැයි බලන්න. පැය 24 පුරා ක්‍රියාත්මක AI සහායක සමඟද කතාබහ කළ හැක.',
    en: 'If your deposit status shows \'AI REVIEW\' or \'PENDING\', ensure your uploaded slip photo clearly shows the transfer reference number and date. You can also chat with our 24/7 AI Support Bot or send a message to admin.',
    ta: 'உங்கள் வைப்பு நிலை \'AI REVIEW\' எனக் காட்டினால் ரசீது புகைப்படம் தெளிவாக உள்ளதா என்பதை உறுதிப்படுத்தவும். 24/7 AI உதவி பாட் மூலமும் உதவி பெறலாம்.'
  },

  // Chart
  chart_title: {
    si: 'මුදල් ප්‍රවාහ විශ්ලේෂණය ({year})',
    en: 'Financial Volume Analytics ({year})',
    ta: 'நிதி தொகுதி பகுப்பாய்வு ({year})'
  },
  chart_sub: {
    si: 'මාසික තැන්පතු සහ මුදල් ලබාගැනීම් සංසන්දනය',
    en: 'Monthly breakdown of deposit slips vs payout withdrawals',
    ta: 'மாதவிடாய் வைப்புகள் மற்றும் திரும்பப் பெறுதல்களின் முறிவு'
  },
  chart_deposits: {
    si: 'තැන්පතු:',
    en: 'Deposits:',
    ta: 'வைப்புகள்:'
  },
  chart_payouts: {
    si: 'ගෙවීම්:',
    en: 'Payouts:',
    ta: 'கொடுப்பனவுகள்:'
  },
  privacy_policy_title: {
    si: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය (Privacy Policy)',
    en: 'Privacy Policy - Fast Xbet Official Sri Lanka',
    ta: 'தனியுரிமைக் கொள்கை (Privacy Policy)'
  },
  privacy_policy_sub: {
    si: 'ඔබගේ දත්ත ආරක්ෂාව, රහස්‍යභාවය සහ සේවා කොන්දේසි කියවන්න',
    en: 'Read details regarding data protection, confidentiality, and service disclaimer',
    ta: 'தரவு பாதுகாப்பு மற்றும் தனியுரிமை விவரங்களைப் படிக்கவும்'
  },
  privacy_policy_btn: {
    si: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය නරඹන්න',
    en: 'View Privacy Policy',
    ta: 'தனியுரிமைக் கொள்கையைப் பார்க்கவும்'
  }
};

export function getTranslation(
  key: string,
  lang: AppLanguage,
  replacements?: Record<string, string | number>
): string {
  const dict = STRINGS[key];
  let text = dict ? (dict[lang] || dict['en'] || key) : key;
  if (replacements) {
    Object.entries(replacements).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
  }
  return text;
}

export function formatCurrency(amount: number, lang: AppLanguage): string {
  const formattedNum = amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (lang === 'si') {
    return `LKR ${formattedNum}`;
  } else if (lang === 'ta') {
    return `LKR ${formattedNum}`;
  }
  return `${formattedNum} LKR`;
}

export function formatDate(timestamp: number, lang: AppLanguage): string {
  const dateObj = new Date(timestamp);
  const localeMap: Record<AppLanguage, string> = {
    si: 'si-LK',
    en: 'en-US',
    ta: 'ta-LK'
  };
  return dateObj.toLocaleString(localeMap[lang] || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
