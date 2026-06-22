// constants
const NOTE_NAMES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

// state
let A4 = 440
let isRunning = false
let needleVel = 0
let currentCents = 0
let smoothFreq = 0
let displayFreq  = 0;
let displayCents = 0;
let demoRaf




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

    dispNote.textContent  = info.note;
    dispOctave.textContent  = info.octave;
    dispFreq.textContent  = freq.toFixed(1) + ' Hz';

    const c = Math.round(cents);
    // dispCents.textContent = (c > 0 ? '+' : '') + c;
    // dispCents.className   = 'display-value';
    if (Math.abs(c) <= 10) {
        tuneStatus.textContent = 'IN TUNE!';
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
        tuneStatus.textContent = 'TUNE SHARP!';
        tuneStatus.classList.add('tune-sharp');
        tuneStatus.classList.remove('tune-flat');
        tuneStatus.classList.remove('in-tune');
        tuneStatus.classList.remove('tune-initial');
        document.querySelectorAll('.string-btn').forEach(b => b.classList.remove('string-btn-active'));
    } else {
        tuneStatus.textContent = 'TUNE FLAT!';
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


// ── autocorrelation pitch detection ────────────────────────────────────────
function autoCorrelate(buf, sampleRate) {
    const SIZE        = buf.length;
    const MAX_SAMPLES = Math.floor(SIZE / 2);

    // RMS gate — ignore silence
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.001) return -1;

    // trim leading/trailing silence
    let r1 = 0, r2 = SIZE - 1;
    for (let i = 0; i < SIZE / 2; i++) { if (Math.abs(buf[i]) < 0.02) { r1 = i; break; } }
    for (let i = 1; i < SIZE / 2; i++) { if (Math.abs(buf[SIZE - i]) < 0.02) { r2 = SIZE - i; break; } }

    const buf2 = buf.slice(r1, r2 + 1);
    const len2 = buf2.length;

    // compute autocorrelation
    const c = new Float32Array(MAX_SAMPLES);
    for (let i = 0; i < MAX_SAMPLES; i++)
        for (let j = 0; j < len2 - i; j++)
            c[i] += buf2[j] * buf2[j + i];

    // find first valley then highest peak
    let d = 0;
    while (d + 1 < MAX_SAMPLES && c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < MAX_SAMPLES; i++) {
        if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    }

    // reject bogus result (too close to zero lag)
    if (maxpos < 2) return -1;

    // parabolic interpolation for sub-sample accuracy
    let T0  = maxpos;
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a  = (x1 + x3 - 2 * x2) / 2;
    const b  = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
}


// ── audio loop ─────────────────────────────────────────────────────────────
let lastSignalTime = 0;
const NO_SIGNAL_TIMEOUT = 1500; // ms before displays clear and needle centres

const tickBuf = new Float32Array(4096)

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

    
    const freq = autoCorrelate(tickBuf, audioCtx.sampleRate);
    const now  = performance.now();

    if (freq > 50 && freq < 1400) {
        lastSignalTime = now;
        smoothFreq = smoothFreq ? smoothFreq * 0.6 + freq * 0.4 : freq;
        if (!displayFreq) { displayFreq = smoothFreq; }
        const exactMidi   = freqToMidi(smoothFreq);
        const midi        = Math.round(exactMidi);
        const cents       = (exactMidi - midi) * 100;
        targetCents       = cents;
        statusTxt.textContent = 'listening...';
    } else {
        const silence = now - lastSignalTime;
        if (silence > NO_SIGNAL_TIMEOUT) {
            // no signal long enough — centre needle and clear displays
            targetCents  = 0;
            smoothFreq   = 0;
            displayFreq  = 0;
            displayCents = 0;
            resetDisplays();
            statusTxt.textContent = 'no signal';
        }
    }

    // physics needle
    const spring  = 0.04;
    const damping = 0.62;
    needleVel    += spring * (targetCents - currentCents);
    needleVel    *= damping;
    currentCents += needleVel;
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
            statusTxt.textContent = 'web audio not supported';
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
        statusTxt.textContent = 'Microphone is active';
        micBtn.classList.add('active');
        clearTimeout(demoRaf);
        tick();
    } catch (e) {
        if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
            statusTxt.textContent = 'mic access denied';
        } else if (e.name === 'NotFoundError' || e.name === 'DevicesNotFoundError') {
            statusTxt.textContent = 'no mic found';
        } else {
            statusTxt.textContent = 'mic error: ' + e.name;
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
    statusTxt.textContent = 'Press start to tune';
    targetCents  = 0;
    smoothFreq   = 0;
    needleVel    = 0;
    displayFreq  = 0;
    displayCents = 0;
    resetDisplays();
    // clear spectrum analyzer
    specCtx.clearRect(0, 0, specCanvas.width, specCanvas.height)
    resizeSpectrum()

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

// calibSlider.addEventListener('input', () => {
//   A4                  = parseInt(calibSlider.value);
//   calibVal.textContent = A4;
// });


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


startDemo()
