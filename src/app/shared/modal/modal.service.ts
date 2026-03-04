import { Injectable, signal } from '@angular/core';

export interface Photo {
  id: string;
  url?: string;         // Ruta de la imagen real (opcional)
  placeholder?: string; // Emoji grande o código de color (fallback)
  caption?: string;     // Descripción opcional
}

export interface ModalData {
  eventYear: string;
  eventTitle: string;
  eventColor: 'signal' | 'gold' | 'clip';
  photos: Photo[];
  audioUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  isOpen = signal<boolean>(false);
  currentData = signal<ModalData | null>(null);

  open(data: ModalData): void {
    this.currentData.set(data);
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    // Delay para que la animación de cierre termine
    setTimeout(() => this.currentData.set(null), 300);
  }
}
