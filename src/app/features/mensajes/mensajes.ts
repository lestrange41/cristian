import { Component, inject } from '@angular/core';
import { ConfettiService } from '../../shared/confetti.service';
import { VideoModalService } from '../../shared/video-modal.service';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css']
})
export class MensajesComponent {
  private confetti = inject(ConfettiService);
  private videoModal = inject(VideoModalService);
  private modalService = inject(ModalService);

  openCongrats() {
    this.confetti.trigger();
    setTimeout(() => {
      this.videoModal.open({
        title: '🎉 Felicitacions per al Cristian! 🎉',
        youtubeId: 'sUWlSRgN3cE'
      });
    }, 500);
  }

  openGift() {
    this.confetti.trigger();
    setTimeout(() => {
      this.modalService.open({
        eventYear: '🎁 SORPRESA',
        eventTitle: 'Un regal especial per tu 🎁',
        eventColor: 'gold',
        photos: [],
        videoUrl: '/photos/video moi.mp4'
      });
    }, 500);
  }
}