import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ModalService, Photo } from '../../shared/modal/modal.service';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
  emoji: string;
  expanded?: boolean;
  color: 'signal' | 'gold' | 'clip';
  photos: Photo[];
  audioUrl?: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './timeline.html',
  styleUrls: ['./timeline.css']
})
export class TimelineComponent {
  private modalService = inject(ModalService);

  events: TimelineEvent[] = [
    {


      year: 'El Primer Soroll',
      title: 'El Primer Soroll feat Ade&Quico',
      description: 'En Cristian va arribar al món sense fade-in. Directe al màxim. Els metges van dir que tenia un volum inusual per a la seva mida.',
      tag: '▶ SENYAL DETECTADA',
      emoji: '👶',
      color: 'signal',
      expanded: false,
      photos: [
        { id: '1986-1', placeholder: '👶', caption: 'Arribada al món amb senyal fort' },
        { id: '1986-2', placeholder: '🍼', caption: 'Primeres gravacions' },
        { id: '1986-3', placeholder: '🎵', caption: 'Ja amb ritme des del primer dia' }
      ],
      audioUrl: '/audio/inthenight.mp3'
    },
    {
      year: 'La joventut feat Cristian\'s Events',
      title: 'La joventut feat Cristian\'s Events',
      description: 'L\'adolescència: l\'únic període on el clipping era completament acceptable. Els seus pares ho confirmen.',
      tag: '⚡ OVERDRIVE',
      emoji: '🎸',
      color: 'clip',
      expanded: false,
      photos: [
        { id: '90s-1', url: '/photos/90s/dj.jpg', caption: 'Sessions de DJ' },
        { id: '90s-2', url: '/photos/90s/dj2.jpg', caption: 'Mescles i beats' },
        { id: '90s-3', url: '/photos/90s/ei.jpg', caption: 'Moments únics' },
        { id: '90s-4', url: '/photos/90s/esquiada.jpg', caption: 'Aventures a la neu' },
        { id: '90s-5', url: '/photos/90s/festa.jpg', caption: 'Festes i celebracions' },
        { id: '90s-6', url: '/photos/90s/nens.jpg', caption: 'Amics i records' },
        { id: '90s-7', url: '/photos/90s/pastis.jpg', caption: 'Aniversaris especials' },
        { id: '90s-8', url: '/photos/90s/riu.jpg', caption: 'Estiu al riu' }
      ],
      audioUrl: '/audio/infinity.mp3'
    },
    {
      year: 'Els amics són la família que un escull',
      title: 'Els amics de les arts',
      description: 'Quan la música, la cultura i els amics es barregen al mateix canal. Sessions, concerts i moments que deixen empremta.',
      tag: '🎨 EN DIRECTE',
      emoji: '🎭',
      color: 'clip',
      expanded: false,
      photos: [
        { id: 'arts-1', url: '/photos/arts/MOM_0569.JPG', caption: 'Moments artístics' },
        { id: 'arts-2', url: '/photos/arts/MOM_0663.JPG', caption: 'Cultura i amistat' },
        { id: 'arts-3', url: '/photos/arts/MOM_0664.JPG', caption: 'Sessions en directe' },
        { id: 'arts-4', url: '/photos/arts/MOM_0734.JPG', caption: 'L\'art en viu' },
        { id: 'arts-5', url: '/photos/arts/MOM_9848.JPG', caption: 'Escenaris i emocions' },
        { id: 'arts-6', url: '/photos/arts/MOM_9853.JPG', caption: 'Energia creativa' }
      ],
      audioUrl: '/audio/FigaFlawas.mp3'
    },
    {
      year: 'El So de la Feina',
      title: 'El So de la Feina feat Avenpro',
      description: 'Quan treballar es va convertir en art. La feina: més que un ofici, una passió. Cada projecte, una nova cançó. La vocació al màxim volum.',
      tag: '💼 WORKING HARD',
      emoji: '🎯',
      color: 'gold',
      expanded: false,
      photos: [
        { id: 'feina-1', url: '/photos/feina/IMG_20201216_144308.jpg', caption: 'Dia a dia a la feina' },
        { id: 'feina-2', url: '/photos/feina/IMG_20201222_092838.jpg', caption: 'Treballant amb passió' },
        { id: 'feina-3', url: '/photos/feina/IMG_4050.JPG', caption: 'Projectes en marxa' },
        { id: 'feina-4', url: '/photos/feina/MOM_8958.jpg', caption: 'Moments a l\'oficina' },
        { id: 'feina-5', url: '/photos/feina/MOM_8967.jpg', caption: 'L\'equip en acció' },
        { id: 'feina-6', url: '/photos/feina/MOM_8977.jpg', caption: 'Vocació al màxim' }
      ],
      audioUrl: '/audio/AtlantisJoel.mp3'
    },
    {
      year: 'L\'Harmonia Familiar',
      title: 'Mudançes feat La familia',
      description: 'Quan la millor producció va ser la família. Tots els canals sincronitzats. El mix perfecte de veus i rialles.',
      tag: '👨‍👩‍👧‍👦 FAMÍLIA ON AIR',
      emoji: '❤️',
      color: 'signal',
      expanded: false,
      photos: [
        { id: 'family-1', url: '/photos/family/family.jpg', caption: 'La família al complet' },
        { id: 'family-2', url: '/photos/family/germans.jpg', caption: 'Germans units' },
        { id: 'family-3', url: '/photos/family/cumple30.jpg', caption: 'Celebrant els 30' },
        { id: 'family-4', url: '/photos/family/nadal.jpg', caption: 'Nadal en família' },
        { id: 'family-5', url: '/photos/family/carnaval.jpg', caption: 'Carnaval i diversió' },
        { id: 'family-6', url: '/photos/family/cristina.jpg', caption: 'Moments especials' },
        { id: 'family-7', url: '/photos/family/cris.jpg', caption: 'Recordant moments' },
        { id: 'family-8', url: '/photos/family/furgo.jpg', caption: 'Aventures en furgoneta' },
        { id: 'family-9', url: '/photos/family/cotxe.jpg', caption: 'De ruta' },
        { id: 'family-10', url: '/photos/family/wake.jpg', caption: 'Esport i adrenalina' },
        { id: 'family-11', url: '/photos/family/dj.jpg', caption: 'Mescles familiars' },
        { id: 'family-12', url: '/photos/family/3.jpg', caption: 'Instants captats' },
        { id: 'family-13', url: '/photos/family/4.jpg', caption: 'Més records' },
        { id: 'family-14', url: '/photos/family/MOM_8858.jpg', caption: 'Moments inolvidables' },
        { id: 'family-15', url: '/photos/family/MOM_8875.jpg', caption: 'Junts sempre' },
        { id: 'family-16', url: '/photos/family/MOM_8901.jpg', caption: 'Harmonia perfecta' },
        { id: 'family-17', url: '/photos/family/MOM_8917.jpg', caption: 'Amor familiar' },
        { id: 'family-18', url: '/photos/family/MOM_8939.jpg', caption: 'El millor equip' },
        { id: 'family-19', url: '/photos/family/quico.jpg', caption: 'Amb el patriarca' },
        { id: 'family-20', url: '/photos/family/familyainhoa.jpg', caption: 'Família i Ainhoa' },
        { id: 'family-21', url: '/photos/family/nadal2.jpg', caption: 'Més Nadals junts' },
        { id: 'family-22', url: '/photos/family/MOM_0182.JPG', caption: 'Instants en família' },
        { id: 'family-23', url: '/photos/family/MOM_0201.JPG', caption: 'Moments compartits' },
        { id: 'family-24', url: '/photos/family/MOM_0824.JPG', caption: 'Plegats sempre' },
        { id: 'family-25', url: '/photos/family/MOM_0874.JPG', caption: 'Records especials' },
        { id: 'family-26', url: '/photos/family/MOM_0889.JPG', caption: 'Alegria familiar' },
        { id: 'family-27', url: '/photos/family/MOM_9345.JPG', caption: 'El millor grup' },
        { id: 'family-28', url: '/photos/family/MOM_9607.JPG', caption: 'Units per sempre' },
        { id: 'family-29', url: '/photos/family/MOM_9628.JPG', caption: 'Rialles i amor' },
        { id: 'family-30', url: '/photos/family/MOM_9659.JPG', caption: 'Junts ho som tot' }
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
      expanded: false,
      photos: [
        { id: 'boda-2', url: '/photos/boda/0MM01651.JPG', caption: 'Units per sempre' },
        { id: 'boda-3', url: '/photos/boda/0MM01682.JPG', caption: 'Moments màgics' },
        { id: 'boda-4', url: '/photos/boda/MOM_9773.jpg', caption: 'Amor etern' },
        { id: 'boda-5', url: '/photos/boda/MOM_9872.jpg', caption: 'Celebració perfecta' },
        { id: 'boda-6', url: '/photos/boda/MOM_9909.jpg', caption: 'Felicitat absoluta' },
        { id: 'boda-7', url: '/photos/boda/1.jpg', caption: 'Records inesborables' },
        { id: 'boda-8', url: '/photos/boda/foto cotxe.jpg', caption: 'Cap a la nova vida' },
        { id: 'boda-9', url: '/photos/boda/neu.jpg', caption: 'Escapada a la neu' },
        { id: 'boda-10', url: '/photos/boda/vietnam.jpg', caption: 'Aventura a Vietnam' },
        { id: 'boda-11', url: '/photos/boda/aicri.jpeg', caption: 'Ainhoa i Cristian' },
        { id: 'boda-12', url: '/photos/boda/aicri2.jpeg', caption: 'Moments de parella' },
        { id: 'boda-13', url: '/photos/boda/aicri3.jpeg', caption: 'Sempre junts' },
        { id: 'boda-14', url: '/photos/boda/MOM_0584.JPG', caption: 'Records del gran dia' },
        { id: 'boda-15', url: '/photos/boda/MOM_0340.jpg', caption: 'Un moment especial' }
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
      expanded: false,
      photos: [
        { id: 'aran-4', url: '/photos/aran/panxa.jpg', caption: 'La panxa creixent' },
        { id: 'aran-1', url: '/photos/aran/DSC_0298.JPG', caption: 'L\'Aran: la nostra estrella' },
        { id: 'aran-2', url: '/photos/aran/DSC_0309.JPG', caption: 'Somriures i alegria' },
        { id: 'aran-3', url: '/photos/aran/1-DSC_0315.jpg', caption: 'Creixent amb amor' },

      ],
      audioUrl: '/audio/tarzan.mp3'
    },
  ];

  toggle(event: TimelineEvent) {
    // Abrir modal en lugar de expandir inline
    this.modalService.open({
      eventYear: event.year,
      eventTitle: event.title,
      eventColor: event.color,
      photos: event.photos,
      audioUrl: event.audioUrl
    });
  }
}
