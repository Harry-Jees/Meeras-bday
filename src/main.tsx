import { StrictMode, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { memories, photoBooth, type Memory } from './assets';
import './styles.css';
import './overrides.css';

gsap.registerPlugin(ScrollTrigger);

function Photo({ memory, className = '' }: { memory: Memory; className?: string }) {
  return <figure className={`photo ${memory.tone} ${memory.crop ?? ''} ${className}`}>
    {memory.src ? <img src={memory.src} alt={memory.label} loading="lazy" decoding="async" /> : <span>your photo<br/><i>{memory.label}</i></span>}
  </figure>;
}

function App() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) return;
      gsap.from('.intro-copy > *', { opacity: 0, y: 24, duration: 1, stagger: .16, ease: 'power3.out' });
      gsap.to('.orb.a', { yPercent: 35, xPercent: 18, scrollTrigger: { trigger: '.opening', scrub: 1 } });
      gsap.from('.first-photo', { clipPath: 'inset(12% 48% 12% 48%)', scale: .86, scrollTrigger: { trigger: '.first', start: 'top 80%', end: 'center center', scrub: 1 } });
      gsap.from('.years-big', { scale: .48, opacity: .1, scrollTrigger: { trigger: '.years', start: 'top 75%', end: 'center center', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.journey .photo').forEach((el, i) => gsap.from(el, { y: 90, rotate: i % 2 ? 7 : -7, opacity: 0, scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 58%', scrub: 1 } }));
      gsap.to('.booth-strip', { yPercent: -22, rotateY: -10, scrollTrigger: { trigger: '.booth', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.diagonal .photo').forEach((el, i) => gsap.from(el, { x: i * -70, y: i * 70, rotateZ: -18, opacity: 0, scrollTrigger: { trigger: '.diagonal', start: 'top 70%', end: 'center center', scrub: 1 } }));
      gsap.from('.cake', { y: 110, opacity: 0, scale: .72, scrollTrigger: { trigger: '.cake-section', start: 'top 70%', end: 'center center', scrub: 1 } });
      gsap.from('.candle', { scaleY: 0, transformOrigin: 'bottom', stagger: .1, scrollTrigger: { trigger: '.cake-section', start: 'center 70%', end: 'center 35%', scrub: 1 } });
      gsap.from('.reveal > *', { y: 60, opacity: 0, stagger: .18, scrollTrigger: { trigger: '.reveal', start: 'top 70%', end: 'center center', scrub: 1 } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <main ref={root}>
    <section className="opening panel"><div className="grain"/><div className="orb a"/><div className="orb b"/><div className="intro-copy"><p className="eyebrow hero-kicker">Ediyeeee</p><h1>Happy B’Day<br/><span>Meechu!!!</span></h1><p className="quiet">to my dear sweet seventeen</p><p className="from">made with an unreasonable amount of love, <b>Harry</b></p></div><div className="scroll-mark">↓</div></section>
    <section className="first panel"><div><p className="eyebrow">chapter one</p><h2>Some people<br/>become a whole<br/><em>place.</em></h2></div><Photo memory={memories[0]} className="first-photo" /></section>
    <section className="years panel"><p className="eyebrow">one friendship, approximately</p><div className="years-big">4 <span>years</span></div><p className="malayalam">ഇനിയും ഒരായിരം കഥകൾ കൂടെ എഴുതണം. ❤️</p><Photo memory={memories[1]} className="years-photo" /></section>
    <section className="journey panel"><div className="journey-head"><p className="eyebrow">the evidence</p><h2>Small frames.<br/>Very big <em>thing.</em></h2></div><div className="photo-scatter">{memories.slice(2, 6).map((m, i) => <Photo memory={m} key={m.label} className={`scatter s${i}`} />)}</div><p className="caption">To my true ബ്രാന്തി friend.</p></section>
    <section className="booth panel"><div className="booth-copy"><p className="eyebrow">do not delete this one</p><h2>Five frames,<br/>a million faces.</h2><p className="booth-message">നമ്മുടെ കഥയ്ക്ക് ഇനിയും chapters ഒരുപാട് ബാക്കി.</p></div><div className="booth-strip">{photoBooth.photos.map((photo, index) => <div className="booth-frame" key={photo.label}>{photo.src ? <img src={photo.src} alt={photo.label} loading={index > 0 ? 'lazy' : 'eager'} /> : <>your next<br/><i>frame 05</i></>}</div>)}</div></section>
    <section className="diagonal panel"><p className="eyebrow">a little dramatic. obviously.</p><div className="diagonal-stage">{[memories[0], memories[1], memories[7]].map((m, i) => <Photo memory={m} key={m.label} className={`d${i}`} />)}</div><span className="diagonal-word">Meera</span></section>
    <section className="fun panel"><div className="float heart">♥</div><div className="float star">✦</div><div className="float flower">✿</div><p className="eyebrow">official birthday notice</p><h2>17 ആയല്ലോ…</h2><p className="funline">നിന്റെ കല്യാണത്തിന് എന്നെ വിളിക്കണം കേട്ടോ!!!</p><Photo memory={memories[8]} className="fun-photo" /></section>
    <section className="cake-section panel"><p className="eyebrow">okay… ഇനി cake മുറിക്കാം.</p><div className="cake"><div className="flames"><i/><i/><i/><i/><i/></div><div className="candles">{[1,2,3,4,5].map(i=><i className="candle" key={i}/>)}</div><div className="icing"/><div className="cake-body"><span>17</span></div><div className="plate"/></div></section>
    <section className="reveal panel"><div className="confetti">✦　•　✦　♥　✦　•　✦</div><p className="eyebrow">today, entirely yours</p><div className="seventeen">17</div><h2>Meera</h2><p className="birthday">സന്തോഷ ജന്മദിനം കുട്ടിക്ക്!!! 🎂</p></section>
    <section className="message panel"><p className="eyebrow">one last thing</p><blockquote>Put your real personal message here.<br/><span>It deserves this quiet little space.</span></blockquote><p className="from">— Harry</p></section>
    <section className="ending panel"><Photo memory={memories[6]} className="end-photo"/><div><p className="eyebrow">end credits</p><h2>With lots of love.<br/><em>Harry Jees</em></h2><p>Pakal manyan</p></div></section>
  </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
