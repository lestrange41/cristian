import { Component, inject, effect, HostListener } from '@angular/core';
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

  constructor() {
    // Reproducir audio cuando se abre la modal
    effect(() => {
      if (this.modalService.isOpen() && this.modalService.currentData()?.audioUrl) {
        this.audioService.play(this.modalService.currentData()!.audioUrl!);
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
