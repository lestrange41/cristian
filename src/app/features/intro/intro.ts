import { Component, inject, signal } from '@angular/core';
import { ConfettiService } from '../../shared/confetti.service';

type IntroState = 'idle' | 'on-power' | 'on-countdown' | 'off-clip' | 'off-countdown' | 'done';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.html',
  styleUrls: ['./intro.css']
})
export class IntroComponent {
  private confetti = inject(ConfettiService);

  state = signal<IntroState>('idle');
  countdown = signal(3);

  onOn() {
    if (this.state() !== 'idle') return;
    this.playPowerOnSound();
    this.state.set('on-power');
    setTimeout(() => {
      this.state.set('on-countdown');
      this.runCountdown(() => {
        this.confetti.trigger();
        setTimeout(() => this.state.set('done'), 600);
      });
    }, 1600);
  }

  onOff() {
    if (this.state() !== 'idle') return;
    this.playClipSound();
    this.state.set('off-clip');
    setTimeout(() => {
      this.state.set('off-countdown');
      this.runCountdown(() => this.state.set('done'));
    }, 1400);
  }

  private playPowerOnSound() {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      // Soroll blanc inicial (energia acumulant-se)
      const nBuf = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
      const nd = nBuf.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = nBuf;
      noise.start(t);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, t);
      noiseGain.gain.linearRampToValueAtTime(0, t + 0.35);

      // Rampa ascendent (serradents: 60 Hz → 900 Hz) — so d'encesa
      const sweep = ctx.createOscillator();
      sweep.type = 'sawtooth';
      sweep.frequency.setValueAtTime(60, t);
      sweep.frequency.exponentialRampToValueAtTime(900, t + 0.55);
      sweep.start(t);
      sweep.stop(t + 0.6);
      const sweepGain = ctx.createGain();
      sweepGain.gain.setValueAtTime(0, t);
      sweepGain.gain.linearRampToValueAtTime(0.35, t + 0.04);
      sweepGain.gain.linearRampToValueAtTime(0.25, t + 0.45);
      sweepGain.gain.linearRampToValueAtTime(0, t + 0.6);

      // Acord final brillant: fonamental + quinta + octava
      const freqs = [880, 1320, 1760];
      const vols  = [0.5,  0.3,   0.2];
      freqs.forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = freq;
        const g = ctx.createGain();
        const start = t + 0.5 + i * 0.04;
        g.gain.setValueAtTime(0, start);
        g.gain.linearRampToValueAtTime(vols[i], start + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, start + 1.2);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(start);
        o.stop(start + 1.3);
      });

      // Connexions
      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      sweep.connect(sweepGain);
      sweepGain.connect(ctx.destination);

      setTimeout(() => ctx.close(), 2500);
    } catch (_) { /* AudioContext no disponible */ }
  }

  private playClipSound() {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      // Oscil·lador quadrat (buzz elèctric) que baixa de to
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 1.0);
      osc.start(t);
      osc.stop(t + 1.1);

      // Distorsió hard-clip
      const dist = ctx.createWaveShaper();
      const n = 512;
      const curve = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = (i * 2) / n - 1;
        curve[i] = (Math.PI + 30) * x / (Math.PI + 30 * Math.abs(x));
      }
      dist.curve = curve;
      dist.oversample = '4x';

      // Soroll blanc (estàtic inicial)
      const nBuf = ctx.createBuffer(1, ctx.sampleRate * 1.1, ctx.sampleRate);
      const nd = nBuf.getChannelData(0);
      for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = nBuf;
      noise.start(t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.6, t);
      noiseGain.gain.linearRampToValueAtTime(0.1, t + 0.15);
      noiseGain.gain.linearRampToValueAtTime(0, t + 1.0);

      // Envoltant principal: atac ràpid → tall sobtat
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.65, t + 0.025);
      gain.gain.setValueAtTime(0.65, t + 0.85);
      gain.gain.linearRampToValueAtTime(0, t + 0.97); // tall abrupte

      osc.connect(dist);
      dist.connect(gain);
      noise.connect(noiseGain);
      noiseGain.connect(gain);
      gain.connect(ctx.destination);

      setTimeout(() => ctx.close(), 2500);
    } catch (_) { /* AudioContext no disponible */ }
  }

  private runCountdown(cb: () => void) {
    this.countdown.set(3);
    this.playBeep();
    const t = setInterval(() => {
      const next = this.countdown() - 1;
      this.countdown.set(next);
      if (next > 0) this.playBeep();
      if (next === 0) {
        clearInterval(t);
        this.playStartupSound(this.state() === 'on-countdown');
        cb();
      }
    }, 1000);
  }

  private playStartupSound(isOn: boolean) {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;

      // Arpegi ascendent ràpid (3 notes en 250ms)
      const arpNotes = isOn
        ? [523, 659, 784, 1047]   // Do-Mi-Sol-Do (major, brillant)
        : [440, 523, 659,  880];  // La-Do-Mi-La  (menys agut, diferent)

      arpNotes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = freq;
        const g = ctx.createGain();
        const s = t + i * 0.07;
        g.gain.setValueAtTime(0, s);
        g.gain.linearRampToValueAtTime(0.4, s + 0.01);
        g.gain.exponentialRampToValueAtTime(0.001, s + 0.18);
        o.connect(g); g.connect(ctx.destination);
        o.start(s); o.stop(s + 0.2);
      });

      // Acord final sostingut — totes les notes juntes
      const chordStart = t + 0.28;
      const chordNotes = isOn ? [523, 659, 784] : [440, 523, 659];
      chordNotes.forEach((freq, i) => {
        const o = ctx.createOscillator();
        o.type = 'sine';
        o.frequency.value = freq;
        const vol = [0.45, 0.3, 0.2][i];
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, chordStart);
        g.gain.linearRampToValueAtTime(vol, chordStart + 0.015);
        g.gain.setValueAtTime(vol, chordStart + 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, chordStart + 1.8);
        o.connect(g); g.connect(ctx.destination);
        o.start(chordStart); o.stop(chordStart + 2);
      });

      setTimeout(() => ctx.close(), 3000);
    } catch (_) { /* AudioContext no disponible */ }
  }

  private playBeep() {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      const isOn = this.state() === 'on-countdown';

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = isOn ? 880 : 660;

      // Segon oscil·lador: harmònic per donar cos al so
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.value = isOn ? 1760 : 1320;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.45, t + 0.008);   // atac ràpid
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22); // decay suau

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0, t);
      gain2.gain.linearRampToValueAtTime(0.15, t + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc.start(t);  osc.stop(t + 0.25);
      osc2.start(t); osc2.stop(t + 0.25);

      setTimeout(() => ctx.close(), 600);
    } catch (_) { /* AudioContext no disponible */ }
  }
}
