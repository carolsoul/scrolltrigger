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

  const configs = [
      { ref: card1, x: isMobile ? -500 : -2000, rotate: 45 }
    ];

  useEffect(() => {
    if (!imagemCarregada) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
    // MOBILE
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
            gsap.set(wrapperRef.current, {
              x: `${-100 * self.progress}vw`,
            });
          }
        }
      });
    });

    mm.add("(min-width: 769px)", () => {
    // DESKTOP
      gsap.to(card1.current, {
        xPercent: -15,
        rotation: 0,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=800vh",
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(wrapperRef.current, {
              x: `${-80 * self.progress}vw`,
            });
          }
        }
      });
    });

    return () => {
      mm.revert();
      gsap.killTweensOf(card1.current);
      gsap.killTweensOf(wrapperRef.current);
    }
  }, [imagemCarregada]);

  //section outro
  const Magnet = ({
    children,
    padding = 100,
    disabled = false,
    magnetStrength = 2,
    activeTransition = "transform 0.3s ease-out",
    inactiveTransition = "transform 0.5s ease-in-out",
    wrapperClassName = "",
    innerClassName = "",
    ...props
  }) => {
    const magnetRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
      if (disabled) return;

      const handleMouseMove = (e) => {
        const el = magnetRef.current;
        if (!el) return;

        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distX = Math.abs(e.clientX - centerX);
        const distY = Math.abs(e.clientY - centerY);

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
          setIsActive(true);
          setPosition({
            x: (e.clientX - centerX) / magnetStrength,
            y: (e.clientY - centerY) / magnetStrength,
          });
        } else {
          setIsActive(false);
          setPosition({ x: 0, y: 0 });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, [disabled, padding, magnetStrength]);

    const style = {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: isActive ? activeTransition : inactiveTransition,
    };

    return (
      <div className={`magnet-wrapper ${wrapperClassName}`} ref={magnetRef} {...props}>
        <div className={`magnet-inner ${innerClassName}`} style={style}>
          {children}
        </div>
      </div>
    );
  };

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
            alt="Foto de Carol Sousa"
            onLoad={() => setImagemCarregada(true)} // só inicia animação quando a imagem estiver carregada
          />
        </div>
      </section> 

      <section className="outro">
        <h1>
          vem dar uma olhada no que <br /> eu fiz recentemente!
        </h1>

        <div className="eyes-container">

          <div className="eye-1">
            <Magnet className="magnet" padding={500} magnetStrength={20}> 
                <div className="pupil">
                  <Magnet className="magnet" padding={500} magnetStrength={55}> 
                    <div className="bright"></div>
                  </Magnet>
                </div>
              </Magnet>
          </div>

          <div className="eye-2">
            <Magnet className="magnet" padding={500} magnetStrength={20}> 
                <div className="pupil">
                  <Magnet className="magnet" padding={500} magnetStrength={55}> 
                    <div className="bright"></div>
                  </Magnet>
                </div>
              </Magnet>
          </div>

        </div>

        
          <img src="./carolHalftoneEyes.svg" alt="Foto de Carol Sousa" className='carolEyes'/>
      </section>   
    </div>
  );
}

export default App;
