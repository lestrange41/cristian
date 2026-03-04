import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { Photo } from '../modal/modal.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input() photos: Photo[] = [];
  @Input() autoplayInterval = 6000; // 6 segundos
  @Input() color: 'signal' | 'gold' | 'clip' = 'signal';

  currentIndex = signal<number>(0);
  isPlaying = signal<boolean>(true);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    if (this.photos.length > 1) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  next() {
    const newIndex = (this.currentIndex() + 1) % this.photos.length;
    this.currentIndex.set(newIndex);
    this.resetAutoplay(); // Reiniciar el timer al cambiar manualmente
  }

  prev() {
    const newIndex = this.currentIndex() === 0
      ? this.photos.length - 1
      : this.currentIndex() - 1;
    this.currentIndex.set(newIndex);
    this.resetAutoplay();
  }

  goTo(index: number) {
    this.currentIndex.set(index);
    this.resetAutoplay();
  }

  toggleAutoplay() {
    if (this.isPlaying()) {
      this.stopAutoplay();
    } else {
      this.startAutoplay();
    }
    this.isPlaying.set(!this.isPlaying());
  }

  private startAutoplay() {
    this.stopAutoplay(); // Limpiar anterior
    this.intervalId = setInterval(() => this.next(), this.autoplayInterval);
  }

  private stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoplay() {
    if (this.isPlaying()) {
      this.startAutoplay();
    }
  }
}
