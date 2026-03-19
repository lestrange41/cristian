import { Component, inject, signal } from '@angular/core';
import { VideoModalService } from '../../shared/video-modal.service';
import { ModalService } from '../../shared/modal/modal.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css']
})
export class MensajesComponent {
  private videoModal = inject(VideoModalService);
  private modalService = inject(ModalService);
  giftWatched = signal(false);

  private fireConfetti() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * ratio) });
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#00ff88', '#ff9900', '#fff'] });
    fire(0.2, { spread: 60, colors: ['#ff9900', '#00ff88'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#00ff88', '#fff', '#ff9900'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#fff'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff9900'] });
    new Audio('/audio/Confetti.mp3').play().catch(() => { });
  }

  openCongrats() {
    this.fireConfetti();
    setTimeout(() => {
      this.videoModal.open({
        title: '🎉 Felicitacions per al Cristian! 🎉',
        youtubeId: 'sUWlSRgN3cE'
      });
    }, 500);
  }

  openGift() {
    this.fireConfetti();
    setTimeout(() => {
      this.modalService.open({
        eventYear: '🎁🎁🎁🎁SORPRESA🎁🎁🎁🎁',
        eventTitle: 'El regal que tu volies🎁',
        eventColor: 'gold',
        photos: [],
        videoUrl: '/photos/video moi.mp4',
        onVideoEnded: () => {
          new Audio('/audio/regalo.m4a').play().catch(() => {});
          setTimeout(() => this.giftWatched.set(true), 400);
        }
      });
    }, 500);
  }
}