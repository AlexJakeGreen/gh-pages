// constants
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

// ── tuning presets ────────────────────────────────────────────────────────
const TUNING_PRESETS = {
    guitarStandard:  { instrument: 'Guitar',      name: 'Standard',            strings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
    guitarDropD:     { instrument: 'Guitar',      name: 'Drop D',              strings: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
    guitarHalfDown:  { instrument: 'Guitar',      name: 'Half-Step Down',      strings: ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'] },
    guitarFullDown:  { instrument: 'Guitar',      name: 'Full-Step Down',      strings: ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'] },
    guitarDropC:     { instrument: 'Guitar',      name: 'Drop C',              strings: ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'] },

    bassStandard:    { instrument: 'Bass Guitar', name: 'Standard',            strings: ['E1', 'A1', 'D2', 'G2'] },
    bassDropD:       { instrument: 'Bass Guitar', name: 'Drop D',              strings: ['D1', 'A1', 'D2', 'G2'] },

    ukuleleStandard: { instrument: 'Ukulele',     name: 'Standard (Re-entrant)', strings: ['G4', 'C4', 'E4', 'A4'] },
    ukuleleLowG:     { instrument: 'Ukulele',     name: 'Low G',               strings: ['G3', 'C4', 'E4', 'A4'] },

    mandolinStandard:{ instrument: 'Mandolin',    name: 'Standard',            strings: ['G3', 'D4', 'A4', 'E5'] },

    banjoOpenG:      { instrument: 'Banjo',       name: 'Open G (5-string)',   strings: ['G4', 'D3', 'G3', 'B3', 'D4'] },
};

// ── i18n ──────────────────────────────────────────────────────────────────
// English strings are used as lookup keys, so anything missing from a
// translation table just falls back to displaying the English original.
const I18N = {
    ua: {
        'Online': 'Онлайн',
        'How to use': 'Як користуватись',
        'Allow microphone access': 'Дозвольте доступ до мікрофона',
        'Play a single string': 'Зіграйте одну струну',
        'Tune until the indicator shows green and the note is stable in the center':
            'Налаштовуйте, поки індикатор не стане зеленим, а нота — стабільною по центру',
        '💡 Play any string to start tuning': '💡 Зіграйте будь-яку струну, щоб почати налаштування',
        'Tuning tips': 'Поради з налаштування',
        'Pluck one string at a time': 'Щипайте по одній струні за раз',
        'Avoid background noise': 'Уникайте фонового шуму',
        'Tune in a quiet environment': 'Налаштовуйте в тихому середовищі',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Гц) стандартний стрій',
        '🔒 We do not store or record your audio': '🔒 Ми не зберігаємо і не записуємо ваше аудіо',
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Усі права захищені',
        'Privacy Policy': 'Політика конфіденційності',
        'Terms of Use': 'Умови використання',
        'Contact': 'Контакти',
        'Share': 'Поділитись',
        'TOO LOW': 'ЗАНАДТО НИЗЬКО',
        'TOO HIGH': 'ЗАНАДТО ВИСОКО',

        'Press start to tune': 'Натисніть старт для налаштування',
        'Microphone is active': 'Мікрофон активний',
        'listening...': 'слухаю...',
        'no signal': 'немає сигналу',
        'web audio not supported': 'Web Audio не підтримується',
        'mic access denied': 'доступ до мікрофона заборонено',
        'no mic found': 'мікрофон не знайдено',
        'Mic error': 'Помилка мікрофона',

        'IN TUNE!': 'НАЛАШТОВАНО!',
        'TUNE SHARP!': 'ЗАВИЩЕНО!',
        'TUNE FLAT!': 'ЗАНИЖЕНО!',

        'Tuning': 'Стрій',
        'Guitar': 'Гітара',
        'Bass Guitar': 'Бас-гітара',
        'Ukulele': 'Укулеле',
        'Mandolin': 'Мандоліна',
        'Banjo': 'Банджо',
        'Standard': 'Стандартний',
        'Drop D': 'Дроп D',
        'Half-Step Down': 'На півтону нижче',
        'Full-Step Down': 'На тон нижче',
        'Drop C': 'Дроп C',
        'Standard (Re-entrant)': 'Стандартний (реентрантний)',
        'Low G': 'Низьке G',
        'Open G (5-string)': 'Відкритий G (5 струн)',
    },

    de: {
        'Online': 'Online',
        'How to use': 'Anleitung',
        'Allow microphone access': 'Mikrofonzugriff erlauben',
        'Play a single string': 'Spielen Sie eine einzelne Saite',
        'Tune until the indicator shows green and the note is stable in the center':
            'Stimmen Sie, bis die Anzeige grün wird und die Note in der Mitte stabil bleibt',
        '💡 Play any string to start tuning': '💡 Spielen Sie eine Saite, um mit dem Stimmen zu beginnen',
        'Tuning tips': 'Stimm-Tipps',
        'Pluck one string at a time': 'Zupfen Sie jeweils eine Saite',
        'Avoid background noise': 'Vermeiden Sie Hintergrundgeräusche',
        'Tune in a quiet environment': 'Stimmen Sie in einer ruhigen Umgebung',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Hz) Standardstimmung',
        '🔒 We do not store or record your audio': '🔒 Wir speichern oder zeichnen Ihr Audio nicht auf',
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Alle Rechte vorbehalten',
        'Privacy Policy': 'Datenschutzrichtlinie',
        'Terms of Use': 'Nutzungsbedingungen',
        'Contact': 'Kontakt',
        'Share': 'Teilen',
        'TOO LOW': 'ZU TIEF',
        'TOO HIGH': 'ZU HOCH',

        'Press start to tune': 'Start drücken zum Stimmen',
        'Microphone is active': 'Mikrofon ist aktiv',
        'listening...': 'höre zu...',
        'no signal': 'kein Signal',
        'web audio not supported': 'Web Audio wird nicht unterstützt',
        'mic access denied': 'Mikrofonzugriff verweigert',
        'no mic found': 'kein Mikrofon gefunden',
        'Mic error': 'Mikrofonfehler',

        'IN TUNE!': 'GESTIMMT!',
        'TUNE SHARP!': 'ZU HOCH GESTIMMT!',
        'TUNE FLAT!': 'ZU TIEF GESTIMMT!',

        'Tuning': 'Stimmung',
        'Guitar': 'Gitarre',
        'Bass Guitar': 'Bassgitarre',
        'Ukulele': 'Ukulele',
        'Mandolin': 'Mandoline',
        'Banjo': 'Banjo',
        'Standard': 'Standard',
        'Drop D': 'Drop D',
        'Half-Step Down': 'Halbton tiefer',
        'Full-Step Down': 'Ganzton tiefer',
        'Drop C': 'Drop C',
        'Standard (Re-entrant)': 'Standard (re-entrant)',
        'Low G': 'Tiefes G',
        'Open G (5-string)': 'Offenes G (5 Saiten)',
    },

    fr: {
        'Online': 'En ligne',
        'How to use': "Mode d'emploi",
        'Allow microphone access': "Autoriser l'accès au microphone",
        'Play a single string': 'Jouez une seule corde',
        'Tune until the indicator shows green and the note is stable in the center':
            "Accordez jusqu'à ce que l'indicateur soit vert et que la note soit stable au centre",
        '💡 Play any string to start tuning': "💡 Jouez une corde pour commencer l'accordage",
        'Tuning tips': "Conseils d'accordage",
        'Pluck one string at a time': 'Pincez une corde à la fois',
        'Avoid background noise': 'Évitez le bruit de fond',
        'Tune in a quiet environment': 'Accordez dans un environnement calme',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Hz) diapason standard',
        '🔒 We do not store or record your audio': "🔒 Nous ne stockons ni n'enregistrons votre audio",
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Tous droits réservés',
        'Privacy Policy': 'Politique de confidentialité',
        'Terms of Use': "Conditions d'utilisation",
        'Contact': 'Contact',
        'Share': 'Partager',
        'TOO LOW': 'TROP BAS',
        'TOO HIGH': 'TROP HAUT',

        'Press start to tune': 'Appuyez sur démarrer pour accorder',
        'Microphone is active': 'Le microphone est actif',
        'listening...': 'écoute...',
        'no signal': 'aucun signal',
        'web audio not supported': 'Web Audio non pris en charge',
        'mic access denied': 'accès au microphone refusé',
        'no mic found': 'aucun microphone trouvé',
        'Mic error': 'Erreur du microphone',

        'IN TUNE!': 'ACCORDÉ !',
        'TUNE SHARP!': 'TROP HAUT !',
        'TUNE FLAT!': 'TROP BAS !',

        'Tuning': 'Accordage',
        'Guitar': 'Guitare',
        'Bass Guitar': 'Guitare basse',
        'Ukulele': 'Ukulélé',
        'Mandolin': 'Mandoline',
        'Banjo': 'Banjo',
        'Standard': 'Standard',
        'Drop D': 'Drop D',
        'Half-Step Down': 'Un demi-ton plus bas',
        'Full-Step Down': 'Un ton plus bas',
        'Drop C': 'Drop C',
        'Standard (Re-entrant)': 'Standard (réentrant)',
        'Low G': 'Sol grave',
        'Open G (5-string)': 'Sol ouvert (5 cordes)',
    },

    pl: {
        'Online': 'Online',
        'How to use': 'Jak korzystać',
        'Allow microphone access': 'Zezwól na dostęp do mikrofonu',
        'Play a single string': 'Zagraj pojedynczą strunę',
        'Tune until the indicator shows green and the note is stable in the center':
            'Strój, aż wskaźnik będzie zielony, a nuta stabilna pośrodku',
        '💡 Play any string to start tuning': '💡 Zagraj dowolną strunę, aby rozpocząć strojenie',
        'Tuning tips': 'Wskazówki dotyczące strojenia',
        'Pluck one string at a time': 'Szarp po jednej strunie',
        'Avoid background noise': 'Unikaj hałasu w tle',
        'Tune in a quiet environment': 'Strój w cichym otoczeniu',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Hz) strój standardowy',
        '🔒 We do not store or record your audio': '🔒 Nie przechowujemy ani nie nagrywamy Twojego dźwięku',
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Wszelkie prawa zastrzeżone',
        'Privacy Policy': 'Polityka prywatności',
        'Terms of Use': 'Warunki użytkowania',
        'Contact': 'Kontakt',
        'Share': 'Udostępnij',
        'TOO LOW': 'ZA NISKO',
        'TOO HIGH': 'ZA WYSOKO',

        'Press start to tune': 'Naciśnij start, aby stroić',
        'Microphone is active': 'Mikrofon jest aktywny',
        'listening...': 'nasłuchiwanie...',
        'no signal': 'brak sygnału',
        'web audio not supported': 'Web Audio nieobsługiwane',
        'mic access denied': 'odmowa dostępu do mikrofonu',
        'no mic found': 'nie znaleziono mikrofonu',
        'Mic error': 'Błąd mikrofonu',

        'IN TUNE!': 'NASTROJONE!',
        'TUNE SHARP!': 'ZA WYSOKO!',
        'TUNE FLAT!': 'ZA NISKO!',

        'Tuning': 'Strój',
        'Guitar': 'Gitara',
        'Bass Guitar': 'Gitara basowa',
        'Ukulele': 'Ukulele',
        'Mandolin': 'Mandolina',
        'Banjo': 'Banjo',
        'Standard': 'Standardowy',
        'Drop D': 'Drop D',
        'Half-Step Down': 'Pół tonu niżej',
        'Full-Step Down': 'Cały ton niżej',
        'Drop C': 'Drop C',
        'Standard (Re-entrant)': 'Standardowy (reentrant)',
        'Low G': 'Niskie G',
        'Open G (5-string)': 'Otwarte G (5 strun)',
    },

    es: {
        'Online': 'En línea',
        'How to use': 'Cómo usar',
        'Allow microphone access': 'Permitir acceso al micrófono',
        'Play a single string': 'Toca una sola cuerda',
        'Tune until the indicator shows green and the note is stable in the center':
            'Afina hasta que el indicador esté verde y la nota sea estable en el centro',
        '💡 Play any string to start tuning': '💡 Toca cualquier cuerda para empezar a afinar',
        'Tuning tips': 'Consejos de afinación',
        'Pluck one string at a time': 'Pulsa una cuerda a la vez',
        'Avoid background noise': 'Evita el ruido de fondo',
        'Tune in a quiet environment': 'Afina en un entorno silencioso',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Hz) afinación estándar',
        '🔒 We do not store or record your audio': '🔒 No almacenamos ni grabamos tu audio',
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Todos los derechos reservados',
        'Privacy Policy': 'Política de privacidad',
        'Terms of Use': 'Términos de uso',
        'Contact': 'Contacto',
        'Share': 'Compartir',
        'TOO LOW': 'DEMASIADO BAJO',
        'TOO HIGH': 'DEMASIADO ALTO',

        'Press start to tune': 'Pulsa iniciar para afinar',
        'Microphone is active': 'El micrófono está activo',
        'listening...': 'escuchando...',
        'no signal': 'sin señal',
        'web audio not supported': 'Web Audio no compatible',
        'mic access denied': 'acceso al micrófono denegado',
        'no mic found': 'no se encontró micrófono',
        'Mic error': 'Error del micrófono',

        'IN TUNE!': '¡AFINADO!',
        'TUNE SHARP!': '¡MUY ALTO!',
        'TUNE FLAT!': '¡MUY BAJO!',

        'Tuning': 'Afinación',
        'Guitar': 'Guitarra',
        'Bass Guitar': 'Bajo',
        'Ukulele': 'Ukelele',
        'Mandolin': 'Mandolina',
        'Banjo': 'Banjo',
        'Standard': 'Estándar',
        'Drop D': 'Drop D',
        'Half-Step Down': 'Medio tono más bajo',
        'Full-Step Down': 'Un tono más bajo',
        'Drop C': 'Drop C',
        'Standard (Re-entrant)': 'Estándar (reentrante)',
        'Low G': 'Sol grave',
        'Open G (5-string)': 'Sol abierto (5 cuerdas)',
    },

    it: {
        'Online': 'Online',
        'How to use': 'Come usare',
        'Allow microphone access': "Consenti l'accesso al microfono",
        'Play a single string': 'Suona una singola corda',
        'Tune until the indicator shows green and the note is stable in the center':
            "Accorda finché l'indicatore diventa verde e la nota è stabile al centro",
        '💡 Play any string to start tuning': '💡 Suona una corda per iniziare ad accordare',
        'Tuning tips': "Consigli per l'accordatura",
        'Pluck one string at a time': 'Pizzica una corda alla volta',
        'Avoid background noise': 'Evita i rumori di fondo',
        'Tune in a quiet environment': 'Accorda in un ambiente silenzioso',
        '♫ A4 (440 Hz) standard pitch': '♫ A4 (440 Hz) accordatura standard',
        '🔒 We do not store or record your audio': '🔒 Non memorizziamo né registriamo il tuo audio',
        '© 2026 Guitar Tuner Online. All rights reserved': '© 2026 Guitar Tuner Online. Tutti i diritti riservati',
        'Privacy Policy': 'Informativa sulla privacy',
        'Terms of Use': 'Termini di utilizzo',
        'Contact': 'Contatti',
        'Share': 'Condividi',
        'TOO LOW': 'TROPPO BASSO',
        'TOO HIGH': 'TROPPO ALTO',

        'Press start to tune': 'Premi avvio per accordare',
        'Microphone is active': 'Il microfono è attivo',
        'listening...': 'in ascolto...',
        'no signal': 'nessun segnale',
        'web audio not supported': 'Web Audio non supportato',
        'mic access denied': 'accesso al microfono negato',
        'no mic found': 'nessun microfono trovato',
        'Mic error': 'Errore del microfono',

        'IN TUNE!': 'ACCORDATO!',
        'TUNE SHARP!': 'TROPPO ALTO!',
        'TUNE FLAT!': 'TROPPO BASSO!',

        'Tuning': 'Accordatura',
        'Guitar': 'Chitarra',
        'Bass Guitar': 'Basso',
        'Ukulele': 'Ukulele',
        'Mandolin': 'Mandolino',
        'Banjo': 'Banjo',
        'Standard': 'Standard',
        'Drop D': 'Drop D',
        'Half-Step Down': 'Mezzo tono più basso',
        'Full-Step Down': 'Un tono più basso',
        'Drop C': 'Drop C',
        'Standard (Re-entrant)': 'Standard (rientrante)',
        'Low G': 'Sol basso',
        'Open G (5-string)': 'Sol aperto (5 corde)',
    },
};

let lang = localStorage.getItem('lang') || 'en';
function t(str) {
    return (I18N[lang] && I18N[lang][str]) || str;
}

function applyLanguage(newLang) {
    lang = newLang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    setStatus(currentStatusKey);
    if (currentTuneKey) setTuneStatus(currentTuneKey);
    renderTuningOptions();
}


// state
let A4 = 440
let isRunning = false
let needleVel = 0
let currentCents = 0
let smoothFreq = 0
let displayFreq  = 0;
let displayCents = 0;
let demoRaf
let pendingNote  = null; // "note+octave" candidate awaiting confirmation
let pendingCount = 0;
const NOTE_STABLE_TICKS = 8; // ~400ms at 20fps before switching displayed note
let lastRms = 0; // previous tick's rms, used to spot a sudden new pluck




// // spectrum analyzer
// const specCanvas = document.getElementById('spectrum');
// const specCtx    = specCanvas.getContext('2d');
// const specBuf    = new Uint8Array(2048); // allocate once, match fftSize

// const FREQ_MIN = 60;
// const FREQ_MAX = 1400;
// const AXIS_LABELS = [82,110,147,196,247,330,440,659,1319];

// document.getElementById('spectrumAxis').innerHTML =
//   AXIS_LABELS.map(f => `<span>${f} Hz</span>`).join('');

// function resizeSpectrum() {
//   specCanvas.width  = specCanvas.offsetWidth  * devicePixelRatio;
//   specCanvas.height = specCanvas.offsetHeight * devicePixelRatio;
// }
// resizeSpectrum();
// window.addEventListener('resize', resizeSpectrum);

// function drawSpectrum() {
//   analyser.getByteFrequencyData(specBuf);

//   const w  = specCanvas.width;
//   const h  = specCanvas.height;
//   const sr = audioCtx.sampleRate;
//   const binHz  = sr / (analyser.fftSize);
//   const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
//   const NUM_BARS = 80;
//   const gap  = Math.max(1, Math.round(1.5 * devicePixelRatio));
//   const barW = (w / NUM_BARS) - gap;

//   specCtx.clearRect(0, 0, w, h);

//   // grid
//   specCtx.strokeStyle = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
//   specCtx.lineWidth = 1;
//   for (let lvl = 0.25; lvl < 1; lvl += 0.25) {
//     specCtx.beginPath();
//     specCtx.moveTo(0, h - lvl * h);
//     specCtx.lineTo(w, h - lvl * h);
//     specCtx.stroke();
//   }

//   const logMin = Math.log2(FREQ_MIN);
//   const logMax = Math.log2(FREQ_MAX);

//   for (let i = 0; i < NUM_BARS; i++) {
//     // map bar index → frequency (log scale)
//     const freq    = Math.pow(2, logMin + (i / NUM_BARS) * (logMax - logMin));
//     const bin     = Math.round(freq / binHz);
//     const value   = (specBuf[bin] ?? 0) / 255;

//     const x  = (w / NUM_BARS) * i;
//     const bh = Math.max(2, value * (h - 4));

//     // highlight the detected fundamental
//     const isFundamental = smoothFreq > 0 &&
//       Math.abs(freq - smoothFreq) < (FREQ_MAX - FREQ_MIN) / NUM_BARS;

//     specCtx.fillStyle    = isDark ? '#5DCAA5' : '#0F6E56';
//     specCtx.globalAlpha  = isFundamental ? 1 : 0.65;
//     specCtx.fillRect(x, h - bh, barW, bh);
//   }
//   specCtx.globalAlpha = 1;
// }


// voice activity
const vaCanvas = document.getElementById('voiceActivity');
const vaCtx    = vaCanvas.getContext('2d');
const VA_COLS  = 40;
const vaAmps   = new Float32Array(VA_COLS);

function resizeVA() {
    vaCanvas.width  = vaCanvas.offsetWidth  * devicePixelRatio;
    vaCanvas.height = vaCanvas.offsetHeight * devicePixelRatio;
}
resizeVA();
window.addEventListener('resize', resizeVA);

function drawVoiceActivity(rms) {
    // shift bars left, add new value on right
    vaAmps.copyWithin(0, 1);
    vaAmps[VA_COLS - 1] = rms;

    const w = vaCanvas.width, h = vaCanvas.height;
    const isDark = matchMedia('(prefers-color-scheme: dark)').matches;
    vaCtx.clearRect(0, 0, w, h);

    const colW = w / VA_COLS;
    const gap  = Math.max(1, colW * 0.25);
    const barW = colW - gap;
    const cx   = h / 2;

    for (let i = 0; i < VA_COLS; i++) {
        const half  = Math.max(2 * devicePixelRatio, vaAmps[i] * cx * 0.92);
        const x     = i * colW;
        const alpha = 0.3 + (i / VA_COLS) * 0.7;
        vaCtx.fillStyle   = isDark ? '#5DCAA5' : '#0F6E56';
        vaCtx.globalAlpha = alpha;
        vaCtx.beginPath();
        vaCtx.roundRect(x + gap / 2, cx - half, barW, half * 2, barW / 2);
        vaCtx.fill();
    }
    vaCtx.globalAlpha = 1;
}




// DOM refs
const micBtn = document.getElementById('micBtn')
const dispNote = document.getElementById('dispNote');
const dispOctave = document.getElementById('dispOctave');
const dispFreq = document.getElementById('dispFreq');
const tuneStatus = document.getElementById('tune-status');

// tracks which (untranslated) status string is currently shown, so a
// language switch can re-render it in the new language immediately
let currentStatusKey = 'Press start to tune';
let currentTuneKey   = null;
function setStatus(key) {
    currentStatusKey = key;
    statusTxt.textContent = t(key);
}
function setTuneStatus(key) {
    currentTuneKey = key;
    tuneStatus.textContent = t(key);
}

// ── pitch helpers ──────────────────────────────────────────────────────────
function freqToMidi(freq) {
  return 12 * Math.log2(freq / A4) + 69;
}

function midiToInfo(midi, exactMidi) {
  const note   = NOTE_NAMES[((midi % 12) + 12) % 12];
  const octave = Math.floor(midi / 12) - 1;
  const cents  = Math.round((exactMidi - midi) * 100);
  return { note, octave, cents };
}


// ── displays ───────────────────────────────────────────────────────────────
function updateDisplays(freq, cents) {
    const exactMidi = freqToMidi(freq);
    const midi      = Math.round(exactMidi);
    const info      = midiToInfo(midi, exactMidi);

    // hysteresis: only switch the displayed note letter/octave once the
    // candidate note has been consistent for several ticks in a row, to
    // avoid flicker while smoothFreq/displayFreq are still converging
    const candidate = `${info.note}${info.octave}`;
    if (candidate === pendingNote) {
        pendingCount++;
    } else {
        pendingNote  = candidate;
        pendingCount = 1;
    }
    if (pendingCount >= NOTE_STABLE_TICKS) {
        dispNote.textContent   = info.note;
        dispOctave.textContent = info.octave;
    }
    dispFreq.textContent  = freq.toFixed(1) + ' Hz';

    const c = Math.round(cents);
    // dispCents.textContent = (c > 0 ? '+' : '') + c;
    // dispCents.className   = 'display-value';
    if (pendingCount < NOTE_STABLE_TICKS) return;
    if (Math.abs(c) <= 10) {
        setTuneStatus('IN TUNE!');
        tuneStatus.classList.add('in-tune');
        tuneStatus.classList.remove('tune-flat');
        tuneStatus.classList.remove('tune-sharp');
        tuneStatus.classList.remove('tune-initial');
        let note = `${info.note}${info.octave}`
        document.querySelectorAll('.string-btn').forEach( btn => {
            if (btn.dataset.note === note) {
                btn.classList.add('string-btn-active');
            }
        });
    } else if (c > 0) {
        setTuneStatus('TUNE SHARP!');
        tuneStatus.classList.add('tune-sharp');
        tuneStatus.classList.remove('tune-flat');
        tuneStatus.classList.remove('in-tune');
        tuneStatus.classList.remove('tune-initial');
        document.querySelectorAll('.string-btn').forEach(b => b.classList.remove('string-btn-active'));
    } else {
        setTuneStatus('TUNE FLAT!');
        tuneStatus.classList.add('tune-flat');
        tuneStatus.classList.remove('tune-sharp');
        tuneStatus.classList.remove('in-tune');
        tuneStatus.classList.remove('tune-initial');
        document.querySelectorAll('.string-btn').forEach(b => b.classList.remove('string-btn-active'));
    }
}

function resetDisplays() {
    dispNote.textContent  = '—';
    dispFreq.textContent  = '— Hz';
    dispOctave.textContent = '';
    pendingNote  = null;
    pendingCount = 0;
    // dispCents.textContent = '—';
    // dispCents.className   = 'display-value';
}


// ── demo animation (while mic is off) ────────────────────────────────────
function startDemo() {
    (function loop() {
        if (isRunning) return;
        const start = Date.now()
        const t    = start / 1000;
        targetCents = Math.sin(t * 0.7) * 18 + Math.sin(t * 1.3) * 6;
        const spring  = 0.04;
        const damping = 0.62;
        needleVel    += spring * (targetCents - currentCents);
        needleVel    *= damping;
        currentCents += needleVel;
        setValue(currentCents);

        const elapsed = Date.now() - start;
        demoRaf = setTimeout(loop, Math.max(0, 33 - elapsed)); // 30fps
    })();
}


// ── YIN pitch detection (de Cheveigné & Kawahara, 2002) ─────────────────────
// expectedFreq > 0 means we've already locked onto this note (see tick()) —
// the search window narrows to around that frequency and the confidence
// threshold relaxes, so tracking survives further into the note's natural
// decay/sustain.
const YIN_THRESHOLD = 0.15; // CMNDF "aperiodicity" cutoff — lower = stricter

function yinDetect(buf, sampleRate, expectedFreq = 0) {
    const SIZE   = buf.length;
    const maxLag = Math.floor(SIZE / 2);
    const locked = expectedFreq > 0;

    // RMS gate — ignore silence (lower floor once locked, to follow the decay)
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < (locked ? 0.00008 : 0.001)) return -1;

    // reject strong transients (pluck attack phase) — RMS spikes hard then,
    // and the period estimate is unreliable during it
    if (rms > 0.15) return -1;

    // apply a Hann window before the difference function — the analysis
    // buffer rarely lines up with a whole number of periods, and windowing
    // tapers the edges so that mismatch doesn't destabilize the estimate.
    // (the RMS gates above intentionally use the raw signal, since windowing
    // would attenuate edge samples and skew those amplitude thresholds)
    const windowed = new Float32Array(SIZE);
    for (let i = 0; i < SIZE; i++) windowed[i] = buf[i] * HANN_WINDOW[i];

    // difference function d(τ) = Σ (x[i] - x[i+τ])²
    const d = new Float32Array(maxLag + 1);
    for (let tau = 1; tau <= maxLag; tau++) {
        let sum = 0;
        for (let i = 0; i < SIZE - maxLag; i++) {
            const diff = windowed[i] - windowed[i + tau];
            sum += diff * diff;
        }
        d[tau] = sum;
    }

    // cumulative mean normalized difference function (CMNDF) — this is
    // YIN's built-in confidence measure, replacing the old ad-hoc
    // "peak vs zero-lag" ratio check
    const cmndf = new Float32Array(maxLag + 1);
    cmndf[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau <= maxLag; tau++) {
        runningSum += d[tau];
        cmndf[tau] = d[tau] * tau / runningSum;
    }

    // while locked, only trust a period close to the note we already know
    // is playing — narrower and safer than searching the whole range, and
    // lets a weak/noisy decaying signal still be accepted with confidence
    let searchMin = 2;
    let searchMax = maxLag;
    if (locked) {
        const expectedLag = sampleRate / expectedFreq;
        searchMin = Math.max(2, Math.floor(expectedLag * 0.85));
        searchMax = Math.min(maxLag, Math.ceil(expectedLag * 1.15));
    }
    const threshold = locked ? 0.25 : YIN_THRESHOLD;

    // absolute threshold: first local minimum of CMNDF below the threshold
    let tauEstimate = -1;
    for (let tau = searchMin; tau <= searchMax; tau++) {
        if (cmndf[tau] < threshold) {
            while (tau + 1 <= searchMax && cmndf[tau + 1] < cmndf[tau]) tau++;
            tauEstimate = tau;
            break;
        }
    }
    if (tauEstimate === -1) return -1; // no confident period found

    // parabolic interpolation for sub-sample accuracy
    let T0 = tauEstimate;
    if (T0 > 1 && T0 < maxLag) {
        const x1 = cmndf[T0 - 1], x2 = cmndf[T0], x3 = cmndf[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2;
        const b = (x3 - x1) / 2;
        if (a) T0 = T0 - b / (2 * a);
    }

    const freq = sampleRate / T0;

    // octave-error safety net when not locked (locked mode is already
    // constrained to the expected frequency's neighborhood above)
    if (!locked && smoothFreq > 0) {
        const ratio = freq / smoothFreq;
        if ((ratio > 1.92 && ratio < 2.08) || (ratio > 2.92 && ratio < 3.08)) {
            return -1;
        }
    }

    return freq;
}


// ── audio loop ─────────────────────────────────────────────────────────────
let lastSignalTime = 0;
const NO_SIGNAL_TIMEOUT = 1500; // ms before displays clear and needle centres

const tickBuf = new Float32Array(4096)

// precomputed Hann window for yinDetect() — reduces edge discontinuities/
// spectral leakage in the difference function, since the analysis buffer
// rarely lines up with a whole number of periods
const HANN_WINDOW = new Float32Array(tickBuf.length);
for (let i = 0; i < HANN_WINDOW.length; i++) {
    HANN_WINDOW[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (HANN_WINDOW.length - 1));
}

function tick() {
    if (!isRunning) return;
    // rafId = requestAnimationFrame(tick);
    rafId = setTimeout(tick, 50); // ~20fps

    analyser.getFloatTimeDomainData(tickBuf);
    // draw voice activity
    let rms = 0;
    for (let i = 0; i < tickBuf.length; i++) rms += tickBuf[i] * tickBuf[i];
    rms = Math.sqrt(rms / tickBuf.length);
    const normalized = Math.min(1, Math.log1p(rms*400)/Math.log1p(400))
    drawVoiceActivity(normalized); // *8 підсилює для кращої видимості

    // a sudden loudness jump (relative, not absolute) means a new pluck
    // happened — even if the previous note was locked-in, drop everything
    // and start over strict, since this is a different note now
    if (lastRms > 0 && rms > lastRms * 2.2 && rms > 0.01) {
        smoothFreq   = 0;
        displayFreq  = 0;
        pendingNote  = null;
        pendingCount = 0;
    }
    lastRms = rms;

    // once we've confidently locked onto a note (hysteresis satisfied),
    // relax the detection gates around that known frequency so tracking
    // survives further into the note's natural decay/sustain
    const locked = pendingCount >= NOTE_STABLE_TICKS && smoothFreq > 0;
    const freq = yinDetect(tickBuf, audioCtx.sampleRate, locked ? smoothFreq : 0);
    const now  = performance.now();

    if (freq > 30 && freq < 1400) {
        lastSignalTime = now;
        // a jump of more than ~1.5 semitones means a genuinely new note
        // (different string, big bend) — snap instantly instead of
        // crossfading through whatever notes lie between old and new pitch
        const isNewNote = smoothFreq > 0 && Math.abs(12 * Math.log2(freq / smoothFreq)) > 1.5;
        if (isNewNote) {
            smoothFreq  = freq;
            displayFreq = freq;
        } else {
            smoothFreq = smoothFreq ? smoothFreq * 0.6 + freq * 0.4 : freq;
            if (!displayFreq) { displayFreq = smoothFreq; }
        }
        const exactMidi   = freqToMidi(smoothFreq);
        const midi        = Math.round(exactMidi);
        const cents       = (exactMidi - midi) * 100;
        targetCents       = cents;
        setStatus('listening...');
    } else {
        const silence = now - lastSignalTime;
        if (silence > NO_SIGNAL_TIMEOUT) {
            // no signal long enough — centre needle and clear displays
            targetCents  = 0;
            smoothFreq   = 0;
            displayFreq  = 0;
            displayCents = 0;
            lastRms      = 0;
            resetDisplays();
            setStatus('no signal');
        }
    }

    // needle easing — plain critically-damped approach, no springy overshoot
    // (targetCents can now jump instantly on a new note, and the old
    // spring/damping simulation would visibly ring/oscillate on such jumps)
    currentCents += (targetCents - currentCents) * 0.15;
    setValue(currentCents);

    
    // drawSpectrum()

    // smooth display values — update only when mic is active and has signal
    if (smoothFreq > 0) {
        displayFreq  += (smoothFreq - displayFreq)   * 0.08;
        displayCents += (currentCents - displayCents) * 0.15;
        updateDisplays(displayFreq, displayCents);
    }
}


// mic control
async function startMic() {
    try {
        // Firefox does not support webkitAudioContext, Chrome supports both
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
            setStatus('web audio not supported');
            return;
        }

        // getUserMedia constraints — Firefox ignores unknown constraints so safe to pass all
        const constraints = { audio: true };
        try {
            // try ideal constraints first
            await navigator.mediaDevices.getUserMedia({
                audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
            }).then(s => { micStream = s; });
        } catch (e) {
            // fallback: plain audio:true (Firefox sometimes needs this)
            micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        }

        audioCtx = new AudioCtx();

        // Firefox requires AudioContext to be resumed after user gesture
        if (audioCtx.state === 'suspended') {
            await audioCtx.resume();
        }

        const src = audioCtx.createMediaStreamSource(micStream);
        analyser  = audioCtx.createAnalyser();
        analyser.fftSize               = 4096;
        analyser.smoothingTimeConstant = 0;
        src.connect(analyser);

        isRunning            = true;
        lastSignalTime       = performance.now();
        //micBtn.textContent   = '⏹ STOP MIC';
        setStatus('Microphone is active');
        micBtn.classList.add('active');
        clearTimeout(demoRaf);
        tick();
    } catch (e) {
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
            setStatus('mic access denied');
        } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
            setStatus('no mic found');
        } else {
            setStatus('Mic error'); statusTxt.textContent += ': ' + e.name;
        }
        console.error(e);
    }
}

function stopMic() {
    isRunning = false;
    clearTimeout(rafId)
    if (micStream) micStream.getTracks().forEach(t => t.stop());
    if (audioCtx)  audioCtx.close();

    //micBtn.textContent = '🎙 START MIC';
    micBtn.classList.remove('active');
    setStatus('Press start to tune');
    targetCents  = 0;
    smoothFreq   = 0;
    needleVel    = 0;
    lastRms      = 0;
    displayFreq  = 0;
    displayCents = 0;
    resetDisplays();

    vaAmps.fill(0);
    drawVoiceActivity(0);

    startDemo();
}


// ── reference tone synthesis ───────────────────────────────────────────────
let refToneCtx  = null;
let refToneNode = null;  // currently playing tone (to stop on next press)

function playReferenceTone(freq) {
    // stop previous tone if playing
    if (refToneNode) {
        refToneNode.forEach(n => { try { n.stop(); } catch(e){} });
        refToneNode = null;
    }

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();

    const now      = ctx.currentTime;
    const duration = 12.0;   // seconds the note rings
    const nodes    = [];

    // guitar string = fundamental + harmonics with different amplitudes & decay rates
    const harmonics = [
        { mult: 1,   amp: 0.5,  decay: 2.8 },
        { mult: 2,   amp: 0.25, decay: 2.0 },
        { mult: 3,   amp: 0.15, decay: 1.4 },
        { mult: 4,   amp: 0.08, decay: 1.0 },
        { mult: 5,   amp: 0.04, decay: 0.7 },
        { mult: 6,   amp: 0.02, decay: 0.5 },
    ];

    const master = ctx.createGain();
    master.gain.setValueAtTime(1, now);
    master.gain.exponentialRampToValueAtTime(0.001, now + duration);
    master.connect(ctx.destination);

    harmonics.forEach(({ mult, amp, decay }) => {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type      = 'sine';
        osc.frequency.setValueAtTime(freq * mult, now);

        // pluck attack + exponential decay per harmonic
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(amp, now + 0.005);  // sharp attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        osc.connect(gain);
        gain.connect(master);
        osc.start(now);
        osc.stop(now + duration);
        nodes.push(osc);
    });

    // slight noise burst at attack (pick noise)
    const bufSize   = ctx.sampleRate * 0.04;
    const noiseBuf  = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const noiseData = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) noiseData[i] = (Math.random() * 2 - 1);
    const noiseNode  = ctx.createBufferSource();
    noiseNode.buffer = noiseBuf;
    const noiseGain  = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    noiseNode.connect(noiseGain);
    noiseGain.connect(master);
    noiseNode.start(now);
    nodes.push(noiseNode);

    refToneNode = nodes;
    // auto-close context after tone finishes
    setTimeout(() => {
        try {
            document.querySelectorAll('.string-btn').forEach(b => b.classList.remove('string-btn-active'));
            ctx.close();
        } catch(e) {}
    }, (duration + 0.1) * 1000);
}


// ── event listeners ────────────────────────────────────────────────────────
micBtn.addEventListener('click', () => {
    isRunning ? stopMic() : startMic();
});

const calibSlider = document.getElementById('calibSlider');
const calibVal     = document.getElementById('calibVal');
calibSlider.addEventListener('input', () => {
    A4                  = parseInt(calibSlider.value, 10);
    calibVal.textContent = A4;
    renderTuning(tuningSelect.value); // string frequencies depend on A4
});


document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearTimeout(demoRaf);
    } else if (!isRunning) {
        startDemo();
    }
});


document.getElementById('stringsRow').addEventListener('click', e => {
    const btn = e.target.closest('.string-btn');
    if (!btn) return;
    document.querySelectorAll('.string-btn').forEach(b => b.classList.remove('string-btn-active'));
    btn.classList.add('string-btn-active');
    playReferenceTone(parseFloat(btn.dataset.freq));
});

// window.addEventListener('resize', resizeCanvas);


// ── tuning preset rendering ──────────────────────────────────────────────
const SUBSCRIPT_DIGITS = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
function toSubscript(str) {
    return str.replace(/[0-9]/g, d => SUBSCRIPT_DIGITS[d]);
}

// "D#2" -> frequency in Hz, using the current A4 reference
function noteFreq(fullNote) {
    const [, name, octave] = fullNote.match(/^([A-G]#?)(\d)$/);
    const idx  = NOTE_NAMES.indexOf(name);
    const midi = (parseInt(octave, 10) + 1) * 12 + idx;
    return A4 * Math.pow(2, (midi - 69) / 12);
}

function tuningLabel(preset) {
    const notes = preset.strings.map(s => s.slice(0, -1).replace('#', '♯'));
    return `${t(preset.instrument)} ${t(preset.name)} ${t('Tuning')} ${notes.join(' ')}`;
}

function renderTuning(key) {
    const preset = TUNING_PRESETS[key];

    const row = document.getElementById('stringsRow');
    row.innerHTML = '';
    preset.strings.forEach(fullNote => {
        const freq = noteFreq(fullNote);
        const div = document.createElement('div');
        div.className = 'stack string-btn';
        div.dataset.note = fullNote;
        div.dataset.freq = freq.toFixed(2);
        div.innerHTML =
            `<span style="font-size: 28px;">${toSubscript(fullNote)}</span>` +
            `<span style="font-size: 10px; color: #bbbbbc;">${freq.toFixed(2)} Hz</span>`;
        row.appendChild(div);
    });
}

const tuningSelect = document.getElementById('tuningSelect');

function renderTuningOptions() {
    const selected = tuningSelect.value || 'guitarStandard';
    tuningSelect.innerHTML = '';
    const tuningGroups = new Map(); // translated instrument name -> <optgroup>
    Object.entries(TUNING_PRESETS).forEach(([key, preset]) => {
        const instrumentLabel = t(preset.instrument);
        let group = tuningGroups.get(instrumentLabel);
        if (!group) {
            group = document.createElement('optgroup');
            group.label = instrumentLabel;
            tuningGroups.set(instrumentLabel, group);
            tuningSelect.appendChild(group);
        }
        const opt = document.createElement('option');
        opt.value = key;
        opt.textContent = tuningLabel(preset);
        group.appendChild(opt);
    });
    tuningSelect.value = selected;
}

tuningSelect.addEventListener('change', () => renderTuning(tuningSelect.value));
renderTuningOptions();
renderTuning('guitarStandard');

const langSelect = document.getElementById('langSelect');
langSelect.value = lang;
langSelect.addEventListener('change', () => applyLanguage(langSelect.value));
applyLanguage(lang);


startDemo()
