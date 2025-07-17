import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const card1 = useRef(null);
  const wrapperRef = useRef(null);
  const [imagemCarregada, setImagemCarregada] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!imagemCarregada) return;

    const configs = [
      { ref: card1, x: isMobile ? -500 : -2000, rotate: 45 }
    ];

    configs.forEach(({ ref, x, rotate }) => {
      gsap.to(card1.current, {
        xPercent: 0,
        rotation: 0,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=800vh",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const deslocamento = isMobile ? -100 : -80;
            gsap.set(wrapperRef.current, {
              x: `${deslocamento * self.progress}vw`,
            });
          }
        },
      });
    });

    ScrollTrigger.refresh();
  }, [imagemCarregada]);

  return (
    <div className="container">
      <nav><a href="#">carol <br /> Sousa</a></nav>  

      <section className="wrapper-404" ref={wrapperRef}>
        <div className="title-container">
          <h1 className='title-1'>dev <br /> front-end que transforma ideias em interfaces bonitas leves e funcionais</h1>
          <h1 className='title-2'>cursando ADS <br /> na Universidade Cruzeiro do Sul </h1>
        </div>

        <div className="card" id="card-1" ref={card1}>
          <img
            src="./carolHalftone.svg"
            alt="Imagem"
            onLoad={() => setImagemCarregada(true)} // só inicia animação quando a imagem estiver carregada
          />
        </div>
      </section> 

      <section className="outro">
        <h1>
          This page doesn't exist anymore... but that's okay. 
          <br />
          We'll get you right back on track!
        </h1>
      </section>   
    </div>
  );
}

export default App;
