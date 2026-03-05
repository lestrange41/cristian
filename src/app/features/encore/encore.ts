import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { WaveformComponent } from '../../shared/waveform/waveform';
import { ToastService } from '../../shared/toast';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-encore',
  standalone: true,
  imports: [WaveformComponent],
  templateUrl: './encore.html',
  styleUrls: ['./encore.css']
})
export class EncoreComponent implements OnInit {
  private toast = inject(ToastService);

  ngOnInit() {
    // Fire confetti when section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => this.fireConfetti(), 600);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    const el = document.getElementById('encore');
    if (el) observer.observe(el);
  }

  fireConfetti() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    };
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00ff88', '#ff9900', '#fff'] });
    fire(0.2, { spread: 60, colors: ['#ff9900', '#00ff88'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#00ff88', '#fff', '#ff9900'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#fff'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff9900'] });

    const audio = new Audio('/audio/Confetti.mp3');
    audio.play().catch(() => {});

    this.toast.show('🎉 Feliç aniversari, Cristian! 🎛️🔊🎤');
  }

  onEncore() {
    this.toast.show('🔁 Rebobinant... Tornant al principi de la cinta.');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  }
}
