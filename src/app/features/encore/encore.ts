import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { ToastService } from '../../shared/toast';
import confetti from 'canvas-confetti';

interface AliveTime { days: number; hours: number; minutes: number; seconds: number; }

@Component({
  selector: 'app-encore',
  standalone: true,
  imports: [],
  templateUrl: './encore.html',
  styleUrls: ['./encore.css']
})
export class EncoreComponent implements OnInit, OnDestroy {
  private toast = inject(ToastService);
  private ticker: ReturnType<typeof setInterval> | null = null;
  private readonly BIRTHDAY = new Date(1986, 2, 18, 6, 0, 0); // 18 de març de 1986 a les 6h

  aliveTime = signal<AliveTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  pad2(n: number): string { return n.toString().padStart(2, '0'); }

  private tick() {
    const diff = Date.now() - this.BIRTHDAY.getTime();
    const total = Math.floor(diff / 1000);
    this.aliveTime.set({
      days:    Math.floor(total / 86400),
      hours:   Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60,
    });
  }

  ngOnInit() {
    this.tick();
    this.ticker = setInterval(() => this.tick(), 1000);

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

  ngOnDestroy() {
    if (this.ticker) clearInterval(this.ticker);
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
