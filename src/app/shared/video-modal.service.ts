import { Injectable, signal } from '@angular/core';

export interface VideoModalData {
  title: string;
  youtubeId: string;
}

@Injectable({ providedIn: 'root' })
export class VideoModalService {
  isOpen = signal<boolean>(false);
  currentData = signal<VideoModalData | null>(null);

  open(data: VideoModalData): void {
    this.currentData.set(data);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    setTimeout(() => this.currentData.set(null), 300);
  }
}
