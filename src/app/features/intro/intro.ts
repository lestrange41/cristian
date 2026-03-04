import { Component, inject, signal } from '@angular/core';
import { ConfettiService } from '../../shared/confetti.service';

type IntroState = 'idle' | 'on-countdown' | 'off-clip' | 'off-countdown' | 'done';

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
    this.state.set('on-countdown');
    this.runCountdown(() => {
      this.confetti.trigger();
      setTimeout(() => this.state.set('done'), 600);
    });
  }

  onOff() {
    if (this.state() !== 'idle') return;
    this.state.set('off-clip');
    setTimeout(() => {
      this.state.set('off-countdown');
      this.runCountdown(() => this.state.set('done'));
    }, 1400);
  }

  private runCountdown(cb: () => void) {
    this.countdown.set(3);
    const t = setInterval(() => {
      const next = this.countdown() - 1;
      this.countdown.set(next);
      if (next === 0) {
        clearInterval(t);
        cb();
      }
    }, 1000);
  }
}
