import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { WaveformComponent } from '../../shared/waveform/waveform';
import { VuMeterComponent } from '../../shared/vu-meter/vu-meter';
import { ToastService } from '../../shared/toast';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WaveformComponent, VuMeterComponent, NgFor, NgIf],
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
    this.toast.show('🔇 Error: silenci no trobat. Canal "Cristian" sempre actiu.');
    setTimeout(() => {
      this.gagVisible = false;
    }, 10000);
  }
}
