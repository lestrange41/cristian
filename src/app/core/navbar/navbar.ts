import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import { ToastService } from '../../shared/toast';
import { VuMeterComponent } from '../../shared/vu-meter/vu-meter';

interface NavLink {
  label: string;
  anchor: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor, VuMeterComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements OnInit {
  private toast = inject(ToastService);
  isScrolled = signal(false);
  scrollProgress = signal(0);
  menuOpen = signal(false);
  private logoClickCount = 0;
  private logoClickTimer: ReturnType<typeof setTimeout> | null = null;

  links: NavLink[] = [
    { label: 'Inici', anchor: '#home', icon: '🎤' },
    { label: 'Cronologia', anchor: '#timeline', icon: '📼' },
    { label: 'M32', anchor: '#mixer', icon: '🎛️' },
    { label: 'Video', anchor: '#mensajes', icon: '📻' },
    { label: 'Fi de pista', anchor: '#encore', icon: '🔊' },
  ];

  ngOnInit() { }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    this.isScrolled.set(scrollY > 30);
    this.scrollProgress.set(docH > 0 ? (scrollY / docH) * 100 : 0);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }

  onLogoClick() {
    this.logoClickCount++;
    if (this.logoClickTimer) clearTimeout(this.logoClickTimer);
    this.logoClickTimer = setTimeout(() => { this.logoClickCount = 0; }, 1500);

    if (this.logoClickCount === 3) {
      this.toast.show('⚠️ Feedback detectat. Si us plau, allunyi el micròfon d\'en Cristian.');
      this.logoClickCount = 0;
    }
    if (this.logoClickCount === 5) {
      this.toast.show('🔓 Canal ocult desbloquejat. Aquí no hi ha res. O potser sí. 👀');
      this.logoClickCount = 0;
    }
  }
}
