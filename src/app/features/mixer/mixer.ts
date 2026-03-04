import { Component, inject, signal } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../shared/toast';
import { VuMeterComponent } from '../../shared/vu-meter/vu-meter';

interface Channel {
  id: string;
  label: string;
  emoji: string;
  value: number;
  msgLow: string;
  msgHigh: string;
  msgMid: string;
  hidden?: boolean;
}

@Component({
  selector: 'app-mixer',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, FormsModule, VuMeterComponent],
  templateUrl: './mixer.html',
  styleUrls: ['./mixer.css']
})
export class MixerComponent {
  private toast = inject(ToastService);
  currentMsg = signal('');
  secretUnlocked = signal(false);
  secretValue = 50;

  channels: Channel[] = [
    {
      id: 'voz', label: 'Veu', emoji: '🎙️', value: 75,
      msgLow: 'Ets aquí, Cristian? S\'ha tallat el senyal.',
      msgMid: 'Toca tant malament el bateria...',
      msgHigh: '⚠️Joel i Blanca podeu deixar de fumar???',
    },
    {
      id: 'potencia', label: 'Potència', emoji: '⚡', value: 80,
      msgLow: 'T\'he explicat mai el acudit del adivino?',
      msgMid: 'Roger, en algun moment faràs el pressupost que t\'he demanat 30 cops?',
      msgHigh: '⚠️ CLIPPING. Aleix tiu ets molt pesat.',
    },
    {
      id: 'flow', label: 'Flow', emoji: '🌊', value: 65,
      msgLow: 'Soroll de fons detectat. Revisar connexions.',
      msgMid: 'No tardo res, en 5 minuts arribo!!!',
      msgHigh: 'Un segon que m\'estan trucant',
    },
    {
      id: 'exp', label: 'Experiència', emoji: '🧠', value: 90,
      msgLow: 'Cristian quan deixarem de fer el freestyle?',
      msgMid: 'Escotxam!!!!!!!',
      msgHigh: '40 anys de sample rate. Resolució màxima.',
    },
    {
      id: 'feedback', label: 'Feedback', emoji: '❤️', value: 85,
      msgLow: 'Canal en silenci. Estrany. Estàs bé?',
      msgMid: 'Ainhoa, ja plego. Ja vaig cap a casa!!! 3h després...Esque volia escoltar com sonava el d&b.',
      msgHigh: 'Virginia aguanta el destornillador',
    },
  ];

  onSliderChange(ch: Channel) {
    let msg = '';
    if (ch.value <= 20) msg = ch.msgLow;
    else if (ch.value >= 80) msg = ch.msgHigh;
    else msg = ch.msgMid;
    this.currentMsg.set(msg);

    const allMax = this.channels.every(c => c.value >= 90);
    const allMin = this.channels.every(c => c.value <= 10);

    if (allMax) {
      this.toast.show('🔴 SATURACIÓ TOTAL. Cristian al 100% en tots els canals. L\'altaveu ha mort.');
    }
    if (allMin) {
      setTimeout(() => this.currentMsg.set('⬛ Error crític: Silenci no trobat. Reiniciant el Cristian...'), 200);
    }

    const totalAvg = this.channels.reduce((s, c) => s + c.value, 0) / this.channels.length;
    if (totalAvg > 85 && !this.secretUnlocked()) {
      this.secretUnlocked.set(true);
      this.toast.show('🔓 Canal secret desbloquejat: HUMOR. Usa\'l amb responsabilitat.');
    }
  }

  onSecretSlider() {
    if (this.secretValue >= 95) {
      this.toast.show('🎤🎤🎤🎤🎤🎤🎤🎤🎤🎤 HUMOR MÀXIM DETECTAT.');
    }
  }

  isOverload(): boolean { return this.channels.every(c => c.value >= 90); }
  isSilence(): boolean { return this.channels.every(c => c.value <= 10); }

  masterLevel(): number {
    return this.channels.reduce((s, c) => s + c.value, 0) / this.channels.length;
  }

  levelClass(val: number): string {
    if (val >= 80) return 'level-high';
    if (val >= 50) return 'level-mid';
    return 'level-low';
  }

  masterClass(): string { return this.levelClass(this.masterLevel()); }
}
