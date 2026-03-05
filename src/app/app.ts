import { Component, inject, OnInit } from '@angular/core';
import { WaveformComponent } from './shared/waveform/waveform';
import { NavbarComponent } from './core/navbar/navbar';
import { HomeComponent } from './features/home/home';
import { TimelineComponent } from './features/timeline/timeline';
import { MixerComponent } from './features/mixer/mixer';
import { MensajesComponent } from './features/mensajes/mensajes';
import { EncoreComponent } from './features/encore/encore';
import { IntroComponent } from './features/intro/intro';
import { ModalComponent } from './shared/modal/modal.component';
import { VideoModalComponent } from './shared/video-modal/video-modal.component';
import { NgFor } from '@angular/common';
import { ToastService, Toast } from './shared/toast';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IntroComponent,
    WaveformComponent,
    NavbarComponent,
    HomeComponent,
    TimelineComponent,
    MixerComponent,
    MensajesComponent,
    EncoreComponent,
    ModalComponent,
    VideoModalComponent,
    NgFor,
    FormsModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  toastService = inject(ToastService);

  onPanic() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    };
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00ff88', '#ff9900', '#fff'] });
    fire(0.2,  { spread: 60, colors: ['#ff9900', '#00ff88'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#00ff88', '#fff', '#ff9900'] });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#fff'] });
    fire(0.1,  { spread: 120, startVelocity: 45, colors: ['#ff9900'] });
    new Audio('/audio/Confetti.mp3').play().catch(() => {});
  }

  ngOnInit() {
    // Konami Code easter egg
    const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      if (e.key === code[pos]) {
        pos++;
        if (pos === code.length) {
          this.toastService.show('🔴 KONAMI AUDIO CHEAT: Mode Cristian ULTRA desbloquejat! +40 d\'experiència.');
          pos = 0;
        }
      } else {
        pos = 0;
      }
    });

    // Inactivity easter egg
    let inactiveTimer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(inactiveTimer);
      inactiveTimer = setTimeout(() => {
        this.toastService.show('💤 Sistema en standby. El Cristian no està mirant, oi?');
      }, 5 * 60 * 1000);
    };
    ['mousemove', 'keydown', 'scroll', 'click'].forEach(e => document.addEventListener(e, resetTimer));
    resetTimer();
  }
}
