// Dati dell'albergo raccolti da Google, Booking.com e recensioni pubbliche.
// TODO: email, P.IVA, WhatsApp e booking engine da confermare con la struttura.
import type { ImageMetadata } from 'astro';

import singola from '../assets/img/camera-singola.jpg';
import singola2 from '../assets/img/camera-tv.jpg';
import matrimoniale from '../assets/img/camera-matrimoniale-2.jpg';
import matrimoniale2 from '../assets/img/camera-balcone.jpg';
import matrimoniale3 from '../assets/img/camera-matrimoniale.jpg';
import doppia from '../assets/img/camera-twin.jpg';
import doppia2 from '../assets/img/camera-doppia-giardino.jpg';
import doppia3 from '../assets/img/camera-scrivania.jpg';
import tripla from '../assets/img/camera-tripla.jpg';
import tripla2 from '../assets/img/camera-tripla-2.jpg';

export const hotel = {
  name: 'Albergo Italia',
  stars: 3,
  address: 'Corso Roma 6',
  cap: '13019',
  city: 'Varallo',
  province: 'VC',
  phone: '0163 51106',
  phoneHref: 'tel:+39016351106',
  cin: 'IT002156A19IAK9FTN',
  cir: '002156-ALB-00002',
  coords: { lat: 45.8155, lon: 8.2569 },
  checkIn: '14:00 – 21:30',
  checkOut: '07:30 – 10:00',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Albergo+Italia+Corso+Roma+6+Varallo',
};

export const nav = [
  { href: '/camere', label: 'Camere' },
  { href: '/storia', label: 'La storia' },
  { href: '/varallo', label: 'Varallo' },
  { href: '/contatti', label: 'Contatti' },
];

export const ratings = [
  { value: 9.5, max: 10, label: 'Posizione', source: 'Booking.com' },
  { value: 9.3, max: 10, label: 'Staff', source: 'Booking.com' },
  { value: 9.0, max: 10, label: 'Pulizia', source: 'Booking.com' },
  { value: 4.4, max: 5, label: '762 recensioni', source: 'Google' },
];

export type Room = {
  slug: string;
  name: string;
  beds: string;
  guests: string;
  short: string;
  text: string;
  images: { src: ImageMetadata; alt: string }[];
};

export const rooms: Room[] = [
  {
    slug: 'singola',
    name: 'Singola',
    beds: '1 letto alla francese',
    guests: '1 ospite',
    short: 'Per chi viaggia da solo.',
    text: 'Raccolta e silenziosa, con scrivania e letto alla francese. Pensata per chi è in valle per lavoro, per il Sacro Monte o per un giro in moto.',
    images: [
      { src: singola, alt: 'Camera singola con letto alla francese e scrivania' },
      { src: singola2, alt: 'Camera singola con scrittoio e televisore' },
    ],
  },
  {
    slug: 'matrimoniale',
    name: 'Matrimoniale',
    beds: '1 letto matrimoniale',
    guests: '2 ospiti',
    short: 'Alcune con il balcone sul corso.',
    text: 'Le camere più richieste dalle coppie. Alcune hanno il balconcino fiorito affacciato sul centro storico e sul Sacro Monte: chiedetecelo quando prenotate.',
    images: [
      { src: matrimoniale, alt: 'Camera matrimoniale con cuscini decorati e tende lunghe' },
      { src: matrimoniale2, alt: 'Camera matrimoniale con portafinestra aperta sul balcone' },
      { src: matrimoniale3, alt: 'Camera matrimoniale con testiera in legno' },
    ],
  },
  {
    slug: 'doppia',
    name: 'Doppia',
    beds: '2 letti singoli',
    guests: '2 ospiti',
    short: 'Due letti, la stessa luce.',
    text: 'Due letti separati e le grandi finestre del vecchio convento, con le persiane bianche che si aprono sul cortile o sul corso.',
    images: [
      { src: doppia, alt: 'Camera doppia con due letti singoli e portafinestra' },
      { src: doppia2, alt: 'Camera doppia con finestra sul verde' },
      { src: doppia3, alt: 'Camera doppia con scrivania e armadio' },
    ],
  },
  {
    slug: 'tripla',
    name: 'Tripla',
    beds: '3 letti singoli',
    guests: '3 ospiti',
    short: 'Per famiglie e amici.',
    text: 'Spazio per tre, per famiglie e gruppi di amici. Per i più piccoli la culla è gratuita, su richiesta.',
    images: [
      { src: tripla, alt: 'Camera tripla con tre letti singoli' },
      { src: tripla2, alt: 'Camera tripla con finestra e televisore' },
    ],
  },
];

export const roomAmenities = [
  'Wi-Fi gratuito',
  'TV a schermo piatto',
  'Scrivania e armadio',
  'Bagno privato con bidet',
  'Asciugacapelli e set di cortesia',
  'Camere non fumatori',
];

export const places = [
  { name: 'Fiume Sesia', note: 'Rafting, kayak e passeggiate lungo il fiume', distance: '4 min', mode: 'a piedi' },
  { name: 'Palazzo dei Musei', note: 'Pinacoteca e Museo di Storia Naturale', distance: '5 min', mode: 'a piedi' },
  { name: 'Sacro Monte di Varallo', note: 'Patrimonio UNESCO, 45 cappelle affrescate', distance: '9 min', mode: 'a piedi' },
  { name: 'Lago d’Orta', note: 'L’Isola di San Giulio e Orta San Giulio', distance: '35 km', mode: 'in auto' },
  { name: 'Alagna e il Monte Rosa', note: 'Sci, alpinismo ed escursioni d’alta quota', distance: '35 km', mode: 'in auto' },
  { name: 'Isole Borromee', note: 'Lago Maggiore', distance: '43 km', mode: 'in auto' },
  { name: 'Aeroporto di Malpensa', note: 'Il collegamento internazionale più vicino', distance: '71 km', mode: 'in auto' },
];

// Foto di Varallo e dintorni da Wikimedia Commons (licenze libere, attribuzione obbligatoria).
export const photoCredits = [
  { file: 'Sacro Monte (Varallo Sesia) 20.jpg', author: 'Carlo Dell’Orto', license: 'CC BY-SA 4.0' },
  { file: 'Varallo Sacro Monte di Varallo Cappelle 1.jpg', author: 'Zairon', license: 'CC BY-SA 4.0' },
  { file: 'Varallo Sacro Monte di Varallo Vista su la Collegiata di San Gaudenzio.jpg', author: 'Zairon', license: 'CC BY-SA 4.0' },
  { file: 'Varallo Sesia - veduta d’insieme con torrente Mastallone.jpg', author: 'Valerio Bozzolan', license: 'CC0' },
  { file: 'Varallo Sesia - collegiata di San Gaudenzio.jpg', author: 'Valerio Bozzolan', license: 'CC0' },
  { file: 'Discesa in gommone sul Sesia.jpg', author: 'Accadueo Feel River Valsesia ASD', license: 'CC BY-SA 4.0' },
  { file: 'Alagna Valsesia, Monte Rosa, Via dei Walser.jpg', author: 'Massimo Beltrame', license: 'CC BY-SA 4.0' },
  { file: 'OrtaSanGiulioAug132024 05.jpg', author: 'Hagai Agmon-Snir', license: 'CC BY-SA 4.0' },
];
