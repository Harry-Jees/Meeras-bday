import { StrictMode, useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate as motionAnimate } from 'motion';
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
      const enter = (target: gsap.TweenTarget, trigger: string | Element, vars: gsap.TweenVars = {}) => gsap.from(target, {
        autoAlpha: 0,
        duration: .85,
        ease: 'power3.out',
        ...vars,
        scrollTrigger: { trigger, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
      enter('.first-photo', '.first', { clipPath: 'inset(12% 48% 12% 48%)', scale: .86 });
      enter('.years-big', '.years', { scale: .48 });
      gsap.utils.toArray<HTMLElement>('.journey .photo').forEach((el, i) => enter(el, el, { y: 70, rotate: i % 2 ? 7 : -7, delay: i * .06 }));
      enter('.booth-strip', '.booth', { y: 80, rotateY: -12, scale: .86 });
      gsap.to('.booth-strip', { yPercent: -14, rotateY: -20, rotateZ: 5, ease: 'none', scrollTrigger: { trigger: '.booth', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      gsap.utils.toArray<HTMLElement>('.diagonal .photo').forEach((el, i) => enter(el, '.diagonal', { x: i * -45, y: i * 35, rotateZ: -18, delay: i * .12 }));
      const cakeTimeline = gsap.timeline({ scrollTrigger: { trigger: '.cake-section', start: 'top 72%', toggleActions: 'play none none reverse' } });
      cakeTimeline.from('.cake', { y: 100, autoAlpha: 0, scale: .72, duration: .8, ease: 'back.out(1.5)' })
        .from('.candle', { scaleY: 0, transformOrigin: 'bottom', stagger: .08, duration: .35 }, '-=.35');
      gsap.from('.paper-note', { y: 55, autoAlpha: 0, scale: .96, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.message', start: 'top 72%', toggleActions: 'play none none reverse' } });
      gsap.from('.reveal > *', { y: 60, autoAlpha: 0, stagger: .14, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.reveal', start: 'top 72%', toggleActions: 'play none none reverse' } });
    }, root);
    const motionControls = [
      motionAnimate('.orb.b', { scale: [1, 1.06, 1], opacity: [.34, .48, .34] }, { duration: 7, repeat: Infinity, ease: 'easeInOut' }),
      motionAnimate('.float', { y: [0, -10, 0] }, { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }),
      motionAnimate('.fun-photo', { y: [0, -6, 0] }, { duration: 5, repeat: Infinity, ease: 'easeInOut' }),
    ];
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => { window.clearTimeout(refreshTimer); motionControls.forEach(control => control.stop()); ctx.revert(); };
  }, []);

  return <main ref={root}>
    <section className="opening panel"><div className="grain"/><div className="orb a"/><div className="orb b"/><div className="intro-copy"><p className="eyebrow hero-kicker">Ediyeeee</p><h1>Happy B’Day<br/><span>Meechu!!!</span></h1><p className="quiet">to my dear sweet seventeen</p><p className="from">made with an unreasonable amount of love, <b>Harry</b></p></div><div className="scroll-mark">↓</div></section>
    <section className="first panel"><div><h2>Some people<br/>become a whole<br/><em>place.</em></h2></div><Photo memory={memories[0]} className="first-photo" /></section>
    <section className="years panel"><p className="eyebrow">one friendship, approximately</p><div className="years-big">4 <span>years</span></div><p className="malayalam">ഇനിയും ഒരായിരം കഥകൾ കൂടെ എഴുതണം. ❤️</p><Photo memory={memories[1]} className="years-photo" /></section>
    <section className="journey panel"><div className="journey-head"><p className="eyebrow">the evidence</p><h2>Small frames.<br/>Very big <em>thing.</em></h2></div><div className="photo-scatter">{memories.slice(2, 6).map((m, i) => <Photo memory={m} key={m.label} className={`scatter s${i}`} />)}</div><p className="caption">To my true ബ്രാന്തി friend.</p></section>
    <section className="booth panel"><div className="booth-copy"><h2>Five frames,<br/>a million faces.</h2><p className="booth-message">നമ്മുടെ കഥയ്ക്ക് ഇനിയും chapters ഒരുപാട് ബാക്കി.</p></div><div className="booth-strip">{photoBooth.photos.map((photo, index) => <div className="booth-frame" key={photo.label}>{photo.src ? <img src={photo.src} alt={photo.label} loading={index > 0 ? 'lazy' : 'eager'} /> : <>your next<br/><i>frame 05</i></>}</div>)}</div></section>
    <section className="diagonal panel"><p className="eyebrow">a little dramatic. obviously.</p><div className="diagonal-stage">{[memories[0], memories[1], memories[7]].map((m, i) => <Photo memory={m} key={m.label} className={`d${i}`} />)}</div><span className="diagonal-word">Meera</span></section>
    <section className="fun panel"><div className="float heart">♥</div><div className="float star">✦</div><div className="float flower">✿</div><p className="eyebrow">official birthday notice</p><h2>17 ആയല്ലോ…</h2><p className="funline">നിന്റെ കല്യാണത്തിന് എന്നെ വിളിക്കണം കേട്ടോ!!!</p><Photo memory={memories[8]} className="fun-photo" /></section>
    <section className="cake-section panel"><p className="eyebrow"><span className="cake-malayalam">ഇനി</span> Cake.</p><div className="cake"><div className="flames"><i/><i/><i/><i/><i/></div><div className="candles">{[1,2,3,4,5].map(i=><i className="candle" key={i}/>)}</div><div className="icing"/><div className="cake-body"><span>17</span></div><div className="plate"/></div></section>
    <section className="reveal panel"><div className="confetti">✦　•　✦　♥　✦　•　✦</div><p className="eyebrow">today, entirely yours</p><div className="seventeen">17</div><h2>Aayi Meechu!!!</h2><p className="birthday">സന്തോഷ ജന്മദിനം കുട്ടിക്ക്!!! 🎂</p></section>
    <section className="message panel"><p className="eyebrow">one last thing</p><div className="paper-note"><blockquote className="message-copy">Meechu,<br/><br/>Four years of knowing you, and somehow there’s still no shortage of stories, laughter, gossip, and absolute chaos. 😂<br/><br/>One thing I genuinely love about you is how real you are. You have this naturally positive vibe that somehow makes even the most random moments feel special. And honestly, your particular brand of chaos makes everything ten times more fun.<br/><br/>From all the random conversations and stupid laughs to memories like our Lulu Mall trips with the Kirukku Buddies, there are so many little moments that I know I’ll look back on and smile about.<br/><br/>I hope 17 brings you more happiness, more adventures, more reasons to laugh, and obviously… more stories for us to gossip about. ❤️<br/><br/>Four years down, and I’m pretty sure we still have a thousand more stories to create.<br/><br/>Happy 17th, Meechu.<br/>Stay exactly as genuine, positive, and wonderfully chaotic as you are.<br/><br/><strong>Enne ini kore naal koode sahikkanam Ketta 😂❤️</strong><br/><br/>— Harry</blockquote></div></section>
    <section className="ending panel"><Photo memory={memories[6]} className="end-photo"/><div><h2>With lots of love.<br/><em>Harry Jees</em></h2><p>Pakal manyan</p></div></section>
  </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
