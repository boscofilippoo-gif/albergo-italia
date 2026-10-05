import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
const EASE = 'expo.out';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

// Ancore nella stessa pagina: scorrimento morbido
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if (!a) return;
  const target = $(a.getAttribute('href')!);
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { duration: 1.6 });
  else target.scrollIntoView();
});

/* ---------- Intro (solo alla prima visita) + apertura pagina ---------- */
function heroIn() {
  const tl = gsap.timeline({ defaults: { ease: EASE } });
  if ($('.hero-img')) tl.fromTo('.hero-img', { scale: 1.25 }, { scale: 1, duration: 2.8 }, 0);
  if ($('.hero-word')) tl.from('.hero-word', { yPercent: 110, duration: 1.6, stagger: 0.12 }, 0.2);
  const fades = $$('.hero-kicker, .hero-side, .hero-bar');
  if (fades.length) tl.from(fades, { y: 30, autoAlpha: 0, duration: 1.4, stagger: 0.12 }, 0.6);
  return tl;
}

function intro() {
  const el = $('#intro');
  const seen = document.documentElement.classList.contains('intro-seen');
  if (!el || seen) {
    el?.remove();
    heroIn();
    return;
  }
  lenis?.stop();
  gsap
    .timeline({
      defaults: { ease: EASE },
      onComplete: () => {
        el.remove();
        lenis?.start();
      },
    })
    .to('.intro-oval', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
    .to('.intro-mono', { opacity: 1, duration: 1 }, 0.5)
    .to('.intro-line', { opacity: 1, duration: 1 }, 0.8)
    .to(el, { yPercent: -100, duration: 1.3, ease: 'expo.inOut' }, '+=0.25')
    .add(heroIn(), '-=0.75');
}

/* ---------- Animazioni generiche ---------- */
function common() {
  // Apertura: l'immagine scivola e si scurisce mentre si scende
  if ($('.hero')) {
    gsap
      .timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('.hero-media', { yPercent: 22, ease: 'none' }, 0)
      .to('.hero-veil', { opacity: 0.7, ease: 'none' }, 0)
      .to('.hero-title', { yPercent: -30, ease: 'none' }, 0);
  }

  // Titoli divisi in righe
  $$('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: 1.5,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
    });
  });

  // Frase di benvenuto: le parole si accendono leggendo
  const manifesto = $('.manifesto');
  if (manifesto) {
    const split = SplitText.create(manifesto, { type: 'words' });
    gsap.fromTo(split.words, { opacity: 0.14 }, {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: { trigger: manifesto, start: 'top 75%', end: 'bottom 50%', scrub: true },
    });
  }

  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, { y: 40, autoAlpha: 0, duration: 1.4, ease: EASE, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // Immagini che si aprono come una tenda
  $$('[data-clip-reveal]').forEach((el) => {
    const img = $('img', el);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 2.2, ease: EASE }, 0);
  });

  $$('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 10;
    gsap.fromTo(el, { yPercent: amount }, { yPercent: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  $$('[data-inner-zoom]').forEach((img) => {
    gsap.fromTo(img, { scale: 1.2 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Numeri che contano
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = obj.v.toLocaleString('it-IT', { minimumFractionDigits: 1, maximumFractionDigits: 1 })),
    });
  });

  // Nastri di parole, accelerano con lo scroll
  const marquees = $$('.marquee').map((row) => {
    const dir = Number(row.dataset.direction);
    return gsap.fromTo(row, { xPercent: dir < 0 ? 0 : -33.333 }, { xPercent: dir < 0 ? -33.333 : 0, duration: 40, ease: 'none', repeat: -1 });
  });
  if (lenis && marquees.length) {
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      const boost = 1 + Math.min(Math.abs(velocity) / 8, 4);
      marquees.forEach((m) => gsap.to(m, { timeScale: boost, duration: 0.3, overwrite: true }));
    });
  }

  // Gallerie orizzontali su desktop
  const mm = gsap.matchMedia();
  mm.add('(min-width: 768px)', () => {
    $$('[data-hscroll]').forEach((section) => {
      const pin = $('.hscroll-pin', section)!;
      const track = $('.hscroll-track', section)!;
      const distance = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: pin, start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 1, invalidateOnRefresh: true },
      });
    });
  });

  // Carte sovrapposte (Varallo): quella sotto si allontana
  const cards = $$('.stack-card');
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to($('.stack-inner', card), {
      scale: 0.9,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
    });
  });

  // Firma nel footer
  if ($('.footer-word')) {
    gsap.from('.footer-word', { yPercent: 60, ease: 'none', scrollTrigger: { trigger: '#contatti', start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

  // Barra prenotazione mobile: compare dopo l'apertura, sparisce sul footer
  const bar = $('#mobile-bar');
  if (bar && $('.hero')) {
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 60%',
      endTrigger: '#contatti',
      end: 'top bottom',
      onToggle: (s) => (bar.style.transform = s.isActive ? 'translateY(0)' : ''),
    });
  }
}

/* ---------- Home: "Entriamo insieme" ---------- */
function journey() {
  const pin = $('.journey-pin');
  if (!pin) return;
  const imgs = $$('.journey-img', pin);
  const texts = $$('.journey-text', pin);
  const dots = $$('.journey-dot > span', pin);
  const count = $('.journey-count', pin);
  const n = imgs.length;

  gsap.set(dots[0], { scaleX: 1 });
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: pin,
      start: 'top top',
      end: () => '+=' + window.innerHeight * (n - 1) * 0.9,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
        if (count) count.textContent = String(i + 1).padStart(2, '0');
      },
    },
  });

  tl.fromTo($('img', imgs[0])!, { scale: 1.15 }, { scale: 1, duration: 1 }, 0);
  for (let i = 1; i < n; i++) {
    const at = i - 1;
    tl.fromTo(imgs[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.inOut' }, at)
      .fromTo($('img', imgs[i])!, { scale: 1.35 }, { scale: 1, duration: 1.4 }, at)
      .to(imgs[i - 1], { yPercent: -12, duration: 1, ease: 'power2.inOut' }, at)
      .to(texts[i - 1], { autoAlpha: 0, y: -50, duration: 0.45, ease: 'power2.in' }, at)
      .fromTo(texts[i], { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.45);
    if (dots[i]) tl.to(dots[i], { scaleX: 1, duration: 1 }, at);
  }
}

/* ---------- La targa del 1856 che si incide ---------- */
function targa() {
  $$('.targa-scene').forEach((scene) => {
    const pin = $('.targa-pin', scene)!;
    const lines = $$('.targa-line', scene);
    const chars = lines.map((l) => SplitText.create(l, { type: 'chars' }).chars);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: pin, start: 'top top', end: '+=230%', pin: true, scrub: 0.8 },
    });

    tl.fromTo($('.targa-plate', scene), { scale: 1.06 }, { scale: 1, duration: 10 }, 0)
      .fromTo($('.targa-ring-1', scene), { '--p': '0%' }, { '--p': '100%', duration: 2.2, ease: 'power1.inOut' }, 0)
      .fromTo($('.targa-ring-2', scene), { '--p': '0%' }, { '--p': '100%', duration: 2.2, ease: 'power1.inOut' }, 0.4)
      .fromTo($('.targa-fill', scene), { opacity: 0 }, { opacity: 1, duration: 1.6 }, 1);

    // Ogni riga si incide lettera per lettera
    chars.forEach((c, i) => {
      tl.fromTo(
        c,
        { opacity: 0, filter: 'blur(6px)', yPercent: 30 },
        { opacity: 1, filter: 'blur(0px)', yPercent: 0, duration: 0.25, stagger: 0.035, ease: 'power2.out' },
        2.2 + i * 0.95,
      );
    });

    const caption = $('.targa-caption', scene);
    if (caption) tl.fromTo(caption, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 1 }, 8.6);
  });
}

/* ---------- Avvio ---------- */
if (reduced) {
  $('#intro')?.remove();
} else {
  intro();
  common();
  journey();
  targa();
  // Le sezioni fissate vanno calcolate nell'ordine in cui compaiono nella pagina
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
