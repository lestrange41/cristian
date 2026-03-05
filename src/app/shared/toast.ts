import { ApplicationRef, Injectable, inject, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private appRef = inject(ApplicationRef);
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, duration = 4000): void {
    const id = this.nextId++;
    this.toasts.update(t => [...t, { id, message }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number): void {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
    this.appRef.tick();
  }
}
