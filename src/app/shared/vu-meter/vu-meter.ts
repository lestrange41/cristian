import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vu-meter',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './vu-meter.html',
  styleUrls: ['./vu-meter.css']
})
export class VuMeterComponent implements OnInit, OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  @Input() barCount = 12;
  @Input() mode: 'bars' | 'db-meter' = 'bars';
  bars: { height: number; color: string }[] = [];
  dbSegments: { active: boolean; color: string; db: string }[] = [];
  private interval: ReturnType<typeof setInterval> | null = null;
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  currentLevel = 0;

  ngOnInit() {
    if (this.mode === 'db-meter') {
      this.initDbSegments();
      this.interval = setInterval(() => this.animateDb(), 100);
    } else {
      this.initBars();
      this.interval = setInterval(() => this.animate(), 80);
    }
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  initBars() {
    this.bars = Array.from({ length: this.barCount }, (_, i) => ({
      height: Math.random() * 60 + 20,
      color: this.colorForIndex(i)
    }));
  }

  animate() {
    this.bars = this.bars.map((bar, i) => {
      const newHeight = Math.max(5, Math.min(100, bar.height + (Math.random() - 0.5) * 40));
      return { height: newHeight, color: this.colorForHeight(newHeight) };
    });
    this.cdr.detectChanges();
  }

  colorForIndex(i: number): string {
    const ratio = i / this.barCount;
    if (ratio > 0.85) return 'red';
    if (ratio > 0.65) return 'yellow';
    return 'green';
  }

  colorForHeight(h: number): string {
    if (h > 85) return 'red';
    if (h > 65) return 'yellow';
    return 'green';
  }

  initDbSegments() {
    const dbLevels = ['-48', '-36', '-24', '-18', '-12', '-9', '-6', '-3', '0', '+3', '+6'];
    this.dbSegments = dbLevels.map((db, i) => {
      const ratio = i / (dbLevels.length - 1);
      let color = 'green';
      if (ratio > 0.75) color = 'red';
      else if (ratio > 0.6) color = 'yellow';
      return { active: false, color, db };
    });
    this.currentLevel = Math.random() * 50 + 20;
  }

  animateDb() {
    this.currentLevel = Math.max(0, Math.min(100, this.currentLevel + (Math.random() - 0.5) * 35));
    this.dbSegments = this.dbSegments.map((seg, i) => {
      const threshold = (i / (this.dbSegments.length - 1)) * 100;
      return { ...seg, active: this.currentLevel >= threshold };
    });
    this.cdr.detectChanges();
  }
}
