import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio: HTMLAudioElement | null = null;

  play(url: string): void {
    this.stop(); // Detener cualquier audio previo

    this.audio = new Audio(url);
    this.audio.loop = false;
    this.audio.volume = 0.6;

    // Intentar reproducir
    this.audio.play().catch(err => {
      console.warn('Audio autoplay bloqueado por el navegador:', err);
      // Los navegadores modernos requieren user interaction para autoplay
      // El click en el evento del timeline cuenta como interaction
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
  }

  pause(): void {
    this.audio?.pause();
  }

  resume(): void {
    this.audio?.play().catch(err => {
      console.warn('No se pudo reanudar el audio:', err);
    });
  }

  setVolume(volume: number): void {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}
