import { Component, inject, HostListener } from '@angular/core';
import { VideoModalService } from '../video-modal.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-modal',
  standalone: true,
  imports: [],
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent {
  videoModalService = inject(VideoModalService);
  private sanitizer = inject(DomSanitizer);

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.videoModalService.isOpen()) {
      this.close();
    }
  }

  close() {
    this.videoModalService.close();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  getYoutubeUrl(): SafeResourceUrl | null {
    const data = this.videoModalService.currentData();
    if (!data) return null;
    const url = `https://www.youtube.com/embed/${data.youtubeId}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
