import { Component, inject, effect, HostListener, viewChild, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { ModalService } from './modal.service';
import { AudioPlayerService } from '../audio-player.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass, CarouselComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  modalService = inject(ModalService);
  private audioService = inject(AudioPlayerService);
  private videoRef = viewChild<ElementRef<HTMLVideoElement>>('videoEl');

  constructor() {
    // Set video src imperatively, only once per URL (prevents restart on fullscreen)
    effect(() => {
      const el = this.videoRef()?.nativeElement;
      const data = this.modalService.currentData();
      if (el && data?.videoUrl && el.getAttribute('src') !== data.videoUrl) {
        el.setAttribute('src', data.videoUrl);
        el.load();
        el.play().catch(() => {});
        el.addEventListener('ended', () => {
          data.onVideoEnded?.();
          this.close();
        }, { once: true });
      }
    });

    // Play section audio (skip if modal has a video)
    effect(() => {
      const data = this.modalService.currentData();
      if (this.modalService.isOpen() && data?.audioUrl && !data?.videoUrl) {
        this.audioService.play(data.audioUrl);
      } else if (!this.modalService.isOpen()) {
        this.audioService.stop();
      }
    });
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.modalService.isOpen()) {
      this.close();
    }
  }

  close() {
    this.modalService.close();
  }

  onOverlayClick(event: MouseEvent) {
    // Cerrar solo si se hace click en el overlay, no en el contenido
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
