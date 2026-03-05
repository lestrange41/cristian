import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { WaveformComponent } from '../../shared/waveform/waveform';
import { VuMeterComponent } from '../../shared/vu-meter/vu-meter';
import { ToastService } from '../../shared/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VuMeterComponent, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private toast = inject(ToastService);
  gagVisible = false;
  vuMeters = ['Veu', 'Potència', 'Therian', 'Humor'];

  onPlay() {
    setTimeout(() => {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
    this.toast.show('▶ Reproduint el millor del Cristian... 40 anys de contingut.');
  }

  onMute() {
    this.gagVisible = true;
    this.toast.show('🔇 Error: silenci no trobat. Canal "Cristian" és imposible de mutejar.');
    setTimeout(() => { this.gagVisible = false; }, 10000);
    new Audio('/audio/WindowsSound.mp3').play().catch(() => {});
  }
}
