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
