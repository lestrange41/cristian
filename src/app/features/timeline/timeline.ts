import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { ModalService, Photo } from '../../shared/modal/modal.service';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
  emoji: string;
  color: 'signal' | 'gold' | 'clip';
  photos: Photo[];
  audioUrl?: string;
  videoUrl?: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgClass],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css']
})
export class TimelineComponent {
  private modalService = inject(ModalService);

  cdOpened = signal(false);

  playCd() {
    this.playScratch();
    setTimeout(() => this.cdOpened.set(true), 700);
  }

  private playScratch() {
    try {
      const ctx = new AudioContext();
      const t = ctx.currentTime;
      const burst = (start: number, dur: number, rate: number, vol: number, freq: number) => {
        const len = Math.floor(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
        const filt = ctx.createBiquadFilter(); filt.type = 'bandpass'; filt.frequency.value = freq; filt.Q.value = 1.8;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, start); gain.gain.linearRampToValueAtTime(vol, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);
        src.connect(filt); filt.connect(gain); gain.connect(ctx.destination); src.start(start);
      };
      burst(t, 0.13, 1.8, 0.7, 2200);
      burst(t + 0.15, 0.07, 2.3, 0.5, 3200);
      burst(t + 0.25, 0.14, 1.5, 0.8, 1800);
      burst(t + 0.41, 0.07, 2.6, 0.6, 3600);
      burst(t + 0.50, 0.16, 2.0, 0.75, 2600);
      setTimeout(() => ctx.close(), 1200);
    } catch (_) { /* AudioContext no disponible */ }
  }

  events: TimelineEvent[] = [
    {
      year: 'El Primer Soroll',
      title: 'El Primer Soroll feat Ade | Quico | Sisters',
      description: 'En Cristian va arribar al món sense fade-in. Directe al màxim. Els metges van dir que tenia un volum inusual per a la seva mida.',
      tag: '▶ SENYAL DETECTADA',
      emoji: '👶',
      color: 'signal',
      photos: [
        { id: '1986-s15', url: '/photos/1986/Escaneado_20260317-1757-15.jpg', caption: '' },
        { id: '1986-s06', url: '/photos/1986/Escaneado_20260317-1757-06.jpg', caption: '' },
        { id: '1986-s07', url: '/photos/1986/Escaneado_20260317-1757-07.jpg', caption: '' },
        { id: '1986-s08', url: '/photos/1986/Escaneado_20260317-1757-08.jpg', caption: '' },
        { id: '1986-s09', url: '/photos/1986/Escaneado_20260317-1757-09.jpg', caption: '' },
        { id: '1986-s10', url: '/photos/1986/Escaneado_20260317-1757-10.jpg', caption: '' },
        { id: '1986-s11', url: '/photos/1986/Escaneado_20260317-1757-11.jpg', caption: '' },
        { id: '1986-s12', url: '/photos/1986/Escaneado_20260317-1757-12.jpg', caption: '' },
        { id: '1986-s16', url: '/photos/1986/Escaneado_20260317-1757-16.jpg', caption: '' },
        { id: '1986-s17', url: '/photos/1986/Escaneado_20260317-1757-17.jpg', caption: '' },
        { id: '1986-s18', url: '/photos/1986/Escaneado_20260317-1757-18.jpg', caption: '' },
        { id: '1986-s19', url: '/photos/1986/Escaneado_20260317-1757-19.jpg', caption: '' },
        { id: '1986-s20', url: '/photos/1986/Escaneado_20260317-1757-20.jpg', caption: '' },
        { id: '1986-s21', url: '/photos/1986/Escaneado_20260317-1757-21.jpg', caption: '' },
        { id: '1986-s22', url: '/photos/1986/Escaneado_20260317-1757-22.jpg', caption: '' },
        { id: '1986-s23', url: '/photos/1986/Escaneado_20260317-1757-23.jpg', caption: '' },
        { id: '1986-s24', url: '/photos/1986/Escaneado_20260317-1757-24.jpg', caption: '' },
        { id: '1986-s25', url: '/photos/1986/Escaneado_20260317-1757-25.jpg', caption: '' },
        { id: '1986-s26', url: '/photos/1986/Escaneado_20260317-1757-26.jpg', caption: '' },
        { id: '1986-s27', url: '/photos/1986/Escaneado_20260317-1757-27.jpg', caption: '' },
        { id: '1986-s28', url: '/photos/1986/Escaneado_20260317-1757-28.jpg', caption: '' },
        { id: '1986-s29', url: '/photos/1986/Escaneado_20260317-1757-29.jpg', caption: '' },
        { id: '1986-s30', url: '/photos/1986/Escaneado_20260317-1757-30.jpg', caption: '' },
        { id: '1986-s32', url: '/photos/1986/Escaneado_20260317-1757-32.jpg', caption: '' },
        { id: '1986-s33', url: '/photos/1986/Escaneado_20260317-1757-33.jpg', caption: '' },
        { id: '1986-s34', url: '/photos/1986/Escaneado_20260317-1757-34.jpg', caption: '' },
        { id: '1986-s35', url: '/photos/1986/Escaneado_20260317-1757-35.jpg', caption: '' },
        { id: '1986-s36', url: '/photos/1986/Escaneado_20260317-1757-36.jpg', caption: '' },
        { id: '1986-s37', url: '/photos/1986/Escaneado_20260317-1757-37.jpg', caption: '' },
        { id: '1986-s38', url: '/photos/1986/Escaneado_20260317-1757-38.jpg', caption: '' },
        { id: '1986-s39', url: '/photos/1986/Escaneado_20260317-1757-39.jpg', caption: '' },
      ],
      audioUrl: '/audio/inthenight.mp3'
    },
    {
      year: 'La joventut feat Cristian\'s Events',
      title: 'La joventut feat Cristian\'s Events',
      description: 'L\'adolescència: l\'únic període on el clipping era completament acceptable. Els seus pares ho confirmen.',
      tag: '⚡ NON STOP',
      emoji: '🎸',
      color: 'clip',
      photos: [
        { id: '90s-1', url: '/photos/90s/dj.jpg', caption: '' },
        { id: '90s-2', url: '/photos/90s/dj2.jpg', caption: '' },
        { id: '90s-3', url: '/photos/90s/ei.jpg', caption: '' },
        { id: '90s-4', url: '/photos/90s/esquiada.jpg', caption: '' },
        { id: '90s-5', url: '/photos/90s/festa.jpg', caption: '' },
        { id: '90s-6', url: '/photos/90s/nens.jpg', caption: '' },
        { id: '90s-7', url: '/photos/90s/pastis.jpg', caption: '' },
        { id: '90s-8', url: '/photos/90s/riu.jpg', caption: '' },
        { id: '90s-9', url: '/photos/90s/malote.jpg', caption: '' },
        { id: '90s-10', url: '/photos/90s/nene.jpg', caption: '' },
        { id: '90s-11', url: '/photos/90s/pelos.jpg', caption: '' },
        { id: '90s-12', url: '/photos/90s/amics.jpg', caption: '' },
        { id: '90s-13', url: '/photos/90s/mes amics.jpg', caption: '' }
      ],
      audioUrl: '/audio/infinity.mp3'
    },
    {
      year: 'Amics, Feina i Rock\'n\'Roll',
      title: 'Amics, Feina i Rock\'n\'Roll',
      description: 'Quan la música, la feina i els amics es barregen al mateix canal. Sessions, concerts, feina i moments que deixen empremta.',
      tag: '🎨 EN DIRECTE',
      emoji: '🎭',
      color: 'clip',
      photos: [
        { id: 'amics-1', url: '/photos/feina/ulleres.jpg', caption: '' },
        { id: 'amics-2', url: '/photos/feina/disc.jpg', caption: '' },
        { id: 'amics-3', url: '/photos/feina/pere.jpg', caption: '' },
        { id: 'amics-4', url: '/photos/feina/tropparty.jpg', caption: '' },
        { id: 'amics-5', url: '/photos/feina/acus tic.jpg', caption: '' },
        { id: 'amics-6', url: '/photos/feina/turdi2.jpg', caption: '' },
        { id: 'amics-7', url: '/photos/feina/turdi3.jpg', caption: '' },
        { id: 'amics-8', url: '/photos/feina/gay.jpg', caption: '' },
        { id: 'amics-9', url: '/photos/feina/discooo.jpg', caption: '' },
        { id: 'amics-10', url: '/photos/feina/MOM_0569.JPG', caption: '' },
        { id: 'amics-11', url: '/photos/feina/MOM_0663.JPG', caption: '' },
        { id: 'amics-12', url: '/photos/feina/MOM_0664.JPG', caption: '' },
        { id: 'amics-13', url: '/photos/feina/MOM_0734.JPG', caption: '' },
        { id: 'amics-14', url: '/photos/feina/MOM_9848.JPG', caption: '' },
        { id: 'amics-15', url: '/photos/feina/MOM_9853.JPG', caption: '' },
        { id: 'amics-16', url: '/photos/feina/IMG_20201216_144308.jpg', caption: '' },
        { id: 'amics-17', url: '/photos/feina/IMG_20201222_092838.jpg', caption: '' },
        { id: 'amics-18', url: '/photos/feina/IMG_4050.JPG', caption: '' },
        { id: 'amics-19', url: '/photos/feina/MOM_8958.jpg', caption: '' },
        { id: 'amics-20', url: '/photos/feina/MOM_8967.jpg', caption: '' },
        { id: 'amics-21', url: '/photos/feina/MOM_8977.jpg', caption: '' },
        { id: 'amics-22', url: '/photos/feina/carnavalvila.jpg', caption: '' },
        { id: 'amics-23', url: '/photos/feina/cristiandj.jpg', caption: '' },
        { id: 'amics-24', url: '/photos/feina/vic.jpg', caption: '' },
        { id: 'amics-25', url: '/photos/feina/vic2.jpg', caption: '' },
        { id: 'amics-26', url: '/photos/feina/cristians.jpg', caption: '' },
        { id: 'amics-27', url: '/photos/feina/cris.jpg', caption: '' },
        { id: 'amics-28', url: '/photos/feina/tecnics.jpeg', caption: '' },
        { id: 'amics-29', url: '/photos/feina/WhatsApp Image 2026-03-06 at 17.08.42.jpeg', caption: '' },
        { id: 'amics-30', url: '/photos/feina/WhatsApp Image 2026-03-06 at 17.08.56.jpeg', caption: '' },
        { id: 'amics-31', url: '/photos/feina/WhatsApp Image 2026-03-06 at 17.10.08.jpeg', caption: '' },
        { id: 'amics-32', url: '/photos/feina/WhatsApp Image 2026-03-06 at 17.13.15.jpeg', caption: '' },
        { id: 'amics-33', url: '/photos/feina/WhatsApp Image 2026-03-06 at 17.23.49.jpeg', caption: '' },
        { id: 'amics-34', url: '/photos/feina/WhatsApp Image 2026-03-06 at 18.14.20.jpeg', caption: '' },
        { id: 'amics-35', url: '/photos/arts/WhatsApp Image 2026-03-06 at 16.43.36.jpeg', caption: '' },
        { id: 'amics-36', url: '/photos/arts/WhatsApp Image 2026-03-06 at 16.52.19.jpeg', caption: '' },
        { id: 'amics-37', url: '/photos/arts/WhatsApp Image 2026-03-06 at 16.56.08.jpeg', caption: '' },
        { id: 'amics-38', url: '/photos/arts/WhatsApp Image 2026-03-06 at 17.22.31.jpeg', caption: '' },
        { id: 'amics-39', url: '/photos/arts/WhatsApp Image 2026-03-06 at 17.24.27.jpeg', caption: '' },
        { id: 'amics-40', url: '/photos/arts/WhatsApp Image 2026-03-06 at 18.14.19.jpeg', caption: '' },
      ],
      audioUrl: '/audio/FigaFlawas.mp3'
    },
    {
      year: 'L\'Harmonia Familiar',
      title: 'Mudançes feat La familia',
      description: 'Quan la millor producció va ser la família. Tots els canals sincronitzats. El mix perfecte de veus i rialles.',
      tag: '👨‍👩‍👧‍👦 FAMÍLIA ON AIR',
      emoji: '❤️',
      color: 'signal',
      photos: [
        { id: 'family-1', url: '/photos/family/family.jpg', caption: '' },
        { id: 'family-2', url: '/photos/family/family2.jpeg', caption: '' },
        { id: 'family-3', url: '/photos/family/familky3.jpeg', caption: '' },
        { id: 'family-4', url: '/photos/family/familyyy.jpeg', caption: '' },
        { id: 'family-5', url: '/photos/family/germans.jpg', caption: '' },
        { id: 'family-6', url: '/photos/family/cumple30.jpg', caption: '' },
        { id: 'family-7', url: '/photos/family/nadal.jpg', caption: '' },
        { id: 'family-8', url: '/photos/family/nadal2.jpg', caption: '' },
        { id: 'family-9', url: '/photos/family/carnaval.jpg', caption: '' },
        { id: 'family-10', url: '/photos/family/cristina.jpg', caption: '' },
        { id: 'family-11', url: '/photos/family/furgo.jpg', caption: '' },
        { id: 'family-12', url: '/photos/family/cotxe.jpg', caption: '' },
        { id: 'family-13', url: '/photos/family/wake.jpg', caption: '' },
        { id: 'family-14', url: '/photos/family/dj.jpg', caption: '' },
        { id: 'family-15', url: '/photos/family/3.jpg', caption: '' },
        { id: 'family-16', url: '/photos/family/4.jpg', caption: '' },
        { id: 'family-17', url: '/photos/family/quico.jpg', caption: '' },
        { id: 'family-18', url: '/photos/family/familyainhoa.jpg', caption: '' },
        { id: 'family-19', url: '/photos/family/MOM_8858.jpg', caption: '' },
        { id: 'family-20', url: '/photos/family/MOM_8875.jpg', caption: '' },
        { id: 'family-21', url: '/photos/family/MOM_8901.jpg', caption: '' },
        { id: 'family-22', url: '/photos/family/MOM_8917.jpg', caption: '' },
        { id: 'family-23', url: '/photos/family/MOM_8939.jpg', caption: '' },
        { id: 'family-24', url: '/photos/family/MOM_0182.JPG', caption: '' },
        { id: 'family-25', url: '/photos/family/MOM_0201.JPG', caption: '' },
        { id: 'family-26', url: '/photos/family/MOM_0824.JPG', caption: '' },
        { id: 'family-27', url: '/photos/family/MOM_0874.JPG', caption: '' },
        { id: 'family-28', url: '/photos/family/MOM_0889.JPG', caption: '' },
        { id: 'family-29', url: '/photos/family/MOM_9345.JPG', caption: '' },
        { id: 'family-30', url: '/photos/family/MOM_9607.JPG', caption: '' },
        { id: 'family-31', url: '/photos/family/MOM_9628.JPG', caption: '' },
        { id: 'family-32', url: '/photos/family/MOM_9659.JPG', caption: '' },
        { id: 'family-33', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.38.02.jpeg', caption: '' },
        { id: 'family-34', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.38.45.jpeg', caption: '' },
        { id: 'family-35', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.40.36.JPG', caption: '' },
        { id: 'family-36', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.42.03.jpeg', caption: '' },
        { id: 'family-37', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.43.05.JPG', caption: '' },
        { id: 'family-38', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.45.44.jpeg', caption: '' },
        { id: 'family-39', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.46.03.jpeg', caption: '' },
        { id: 'family-40', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.47.00.jpeg', caption: '' },
        { id: 'family-41', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.47.15.jpeg', caption: '' },
        { id: 'family-42', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.47.57.jpeg', caption: '' },
        { id: 'family-43', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.48.50.jpeg', caption: '' },
        { id: 'family-44', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.50.16.jpeg', caption: '' },
        { id: 'family-45', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.55.35.jpeg', caption: '' },
        { id: 'family-46', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.00.57.jpeg', caption: '' },
        { id: 'family-47', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.01.31.jpeg', caption: '' },
        { id: 'family-48', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.12.21.jpeg', caption: '' },
        { id: 'family-49', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.18.32.jpeg', caption: '' },
        { id: 'family-50', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.19.30.jpeg', caption: '' },
        { id: 'family-51', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.20.14.jpeg', caption: '' },
        { id: 'family-52', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.20.39.jpeg', caption: '' },
        { id: 'family-53', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.22.48.jpeg', caption: '' },
        { id: 'family-54', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.23.28.jpeg', caption: '' },
        { id: 'family-55', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.27.42.jpeg', caption: '' },
        { id: 'family-56', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.28.11.jpeg', caption: '' },
        { id: 'family-57', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.34.59.jpeg', caption: '' },
        { id: 'family-58', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.35.00.jpeg', caption: '' },
        { id: 'family-59', url: '/photos/family/WhatsApp Image 2026-03-06 at 17.44.45.jpeg', caption: '' },
        { id: 'family-60', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.03.jpeg', caption: '' },
        { id: 'family-61', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.05.jpeg', caption: '' },
        { id: 'family-62', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.06.jpeg', caption: '' },
        { id: 'family-63', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.11.jpeg', caption: '' },
        { id: 'family-64', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.13.jpeg', caption: '' },
        { id: 'family-65', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.14.jpeg', caption: '' },
        { id: 'family-66', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.17.jpeg', caption: '' },
        { id: 'family-67', url: '/photos/family/WhatsApp Image 2026-03-06 at 18.14.20dd.jpeg', caption: '' },
        { id: 'family-68', url: '/photos/family/cris.jpg', caption: '' },
        { id: 'family-69', url: '/photos/family/WhatsApp Image 2026-03-06 at 16.49.26.JPG', caption: '' },
      ],
      audioUrl: '/audio/estimo.mp3'
    },
    {
      year: '2015',
      title: 'El Duet Perfecte feat Ainhoa',
      description: 'La boda: quan dos tracks es van fusionar en una sola cançó. Harmonia total. Mix matrimonial masteritzat.',
      tag: '💍 CASATS & FELIÇOS',
      emoji: '💑',
      color: 'gold',
      photos: [
        { id: 'boda-1', url: '/photos/boda/0MM01651.JPG', caption: '' },
        { id: 'boda-2', url: '/photos/boda/0MM01682.JPG', caption: '' },
        { id: 'boda-3', url: '/photos/boda/MOM_9773.jpg', caption: '' },
        { id: 'boda-4', url: '/photos/boda/MOM_9872.jpg', caption: '' },
        { id: 'boda-5', url: '/photos/boda/MOM_9909.jpg', caption: '' },
        { id: 'boda-6', url: '/photos/boda/1.jpg', caption: '' },
        { id: 'boda-7', url: '/photos/boda/foto cotxe.jpg', caption: '' },
        { id: 'boda-8', url: '/photos/boda/neu.jpg', caption: '' },
        { id: 'boda-9', url: '/photos/boda/vietnam.jpg', caption: '' },
        { id: 'boda-10', url: '/photos/boda/aicri.jpeg', caption: '' },
        { id: 'boda-11', url: '/photos/boda/aicri2.jpeg', caption: '' },
        { id: 'boda-12', url: '/photos/boda/aicri3.jpeg', caption: '' },
        { id: 'boda-13', url: '/photos/boda/MOM_0584.JPG', caption: '' },
        { id: 'boda-14', url: '/photos/boda/MOM_0340.jpg', caption: '' },
        { id: 'boda-15', url: '/photos/boda/MOM_9052.jpg', caption: '' },
        { id: 'boda-16', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.41.15.jpeg', caption: '' },
        { id: 'boda-17', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.42.49.jpeg', caption: '' },
        { id: 'boda-18', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.44.21.jpeg', caption: '' },
        { id: 'boda-19', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.44.51.jpeg', caption: '' },
        { id: 'boda-20', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.45.16.jpeg', caption: '' },
        { id: 'boda-21', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.46.27.jpeg', caption: '' },
        { id: 'boda-22', url: '/photos/boda/WhatsApp Image 2026-03-06 at 16.46.45.jpeg', caption: '' },
        { id: 'boda-23', url: '/photos/boda/WhatsApp Image 2026-03-06 at 17.12.35.jpeg', caption: '' },
        { id: 'boda-24', url: '/photos/boda/WhatsApp Image 2026-03-06 at 17.15.03.jpeg', caption: '' },
        { id: 'boda-25', url: '/photos/boda/WhatsApp Image 2026-03-06 at 17.34.58.jpeg', caption: '' },
        { id: 'boda-26', url: '/photos/boda/WhatsApp Image 2026-03-06 at 18.14.00.jpeg', caption: '' },
        { id: 'boda-27', url: '/photos/boda/WhatsApp Image 2026-03-06 at 18.14.04.jpeg', caption: '' },
      ],
      audioUrl: '/audio/sortdetu.mp3'
    },
    {
      year: '2026',
      title: 'La Nova Melodia feat Aran',
      description: 'El millor remix de la vida. L\'Aran va arribar amb la seva pròpia freqüència. Volum d\'amor al màxim.',
      tag: '👶 NOVA ESTRELLA',
      emoji: '🌟',
      color: 'signal',
      photos: [
        { id: 'aran-4', url: '/photos/aran/panxa.jpg', caption: '' },
        {
          id: 'aran-1', url: '/photos/aran/DSC_0298.JPG', caption: ''
        },
        { id: 'aran-2', url: '/photos/aran/DSC_0309.JPG', caption: '' },
        { id: 'aran-3', url: '/photos/aran/1-DSC_0315.jpg', caption: '' },
        { id: 'aran-5', url: '/photos/aran/WhatsApp Image 2026-02-15 at 10.29.28.jpeg', caption: '' },
        { id: 'aran-6', url: '/photos/aran/WhatsApp Image 2026-03-04 at 20.24.00.jpeg', caption: '' },
        { id: 'aran-7', url: '/photos/aran/WhatsApp Image 2026-03-05 at 20.02.25.jpeg', caption: '' },
        { id: 'aran-8', url: '/photos/aran/WhatsApp Image 2026-03-10 at 21.50.09.jpeg', caption: '' },
        { id: 'aran-9', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.28.27.jpeg', caption: '' },
        { id: 'aran-11', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.28.54.jpeg', caption: '' },
        { id: 'aran-12', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.31.09.jpeg', caption: '' },
        { id: 'aran-13', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.34.04.jpeg', caption: '' },
        { id: 'aran-14', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.34.31.jpeg', caption: '' },
        { id: 'aran-15', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.34.33.jpeg', caption: '' },
        { id: 'aran-16', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.34.34dd.jpeg', caption: '' },
        { id: 'aran-17', url: '/photos/aran/WhatsApp Image 2026-03-20 at 00.34.53.jpeg', caption: '' },
        { id: 'aran-18', url: '/photos/aran/2.jpeg', caption: '' },
        { id: 'aran-19', url: '/photos/aran/333.jpeg', caption: '' },
      ],
      audioUrl: '/audio/tarzan.mp3'
    },
    {
      year: 'BONUS TRACK',
      title: 'BONUS TRACK: "Ya no puedo más"',
      description: 'El número extra que ningú esperava. El directe definitiu. Puja el volum!',
      tag: '🎤 BONUS TRACK',
      emoji: '🎤',
      color: 'gold',
      photos: [],
      videoUrl: '/photos/video karaoke.mp4'
    },
  ];

  toggle(event: TimelineEvent) {
    this.modalService.open({
      eventYear: event.year,
      eventTitle: event.title,
      eventColor: event.color,
      photos: event.photos,
      audioUrl: event.audioUrl,
      videoUrl: event.videoUrl
    });
  }
}
