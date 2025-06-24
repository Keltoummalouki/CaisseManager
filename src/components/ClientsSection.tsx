"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const restaurants = [
  {
    image: "/clients/Crusty.png",
    nom: "Crusty",
    ville: "Rabat",
    adresse: "Hay Riad Avenue Annakhil",
  },
  {
    image: "/clients/Panda.png",
    nom: "Panda",
    ville: "Rabat",
    adresse: "Hay Riad Avenue Annakhil",
  },
  {
    image: "/clients/lma3loma.png",
    nom: "Lma3loma",
    ville: "Casablanca",
    adresse: "Maarif, Bd Zerktouni",
  },
  {
    image: "/clients/TheView360.png",
    nom: "The View 360",
    ville: "Casablanca",
    adresse: "ain sbaa, Bd Zerktouni",
  },
  {
    image: "/clients/fried.png",
    nom: "Fried",
    ville: "Casablanca",
    adresse: "Maarif, Bd Zerktouni",
  },
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = gsap.utils.toArray(".client-card") as HTMLElement[];
    const ctaCard = document.querySelector(".cta-card") as HTMLElement;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${section.scrollWidth + window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(track, {
      x: () => {
        const padding = window.innerWidth;
        return -(section.scrollWidth - window.innerWidth - padding);
      },
      ease: "none",
    });

    cards.forEach((card, index) => {
      if (card.classList.contains("cta-card")) return; 
      
      const info = card.querySelector(".client-info") as HTMLElement;
      if (index !== 0) {
        gsap.set(card, {
          scale: 1,
          y: 0,
        });
        gsap.set(info, {
          opacity: 0,
          y: 30,
        });
      }

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          gsap.to(card, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.fromTo(
            info,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.1,
            }
          );
        },
        onLeave: () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.in",
          });

          gsap.to(info, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: "power3.in",
          });
        },
        onEnterBack: () => {
          gsap.to(card, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: "power3.out",
          });

          gsap.to(info, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.in",
          });

          gsap.to(info, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: "power3.in",
          });
        },
      });
    });

    if (ctaCard) {
      gsap.set(ctaCard, {
        scale: 1,
        y: 0,
      });

      ScrollTrigger.create({
        trigger: ctaCard,
        containerAnimation: tl,
        start: "left center",
        end: "right center",
        onEnter: () => {
          gsap.to(ctaCard, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeave: () => {
          gsap.to(ctaCard, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.in",
          });
        },
        onEnterBack: () => {
          gsap.to(ctaCard, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(ctaCard, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.in",
          });
        },
      });
    }

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white dark:bg-black overflow-hidden"
    >
      <h2 className="text-6xl font-bold text-center text-black dark:text-white py-10 mb-28">
        Nos Clients
      </h2>
      <div ref={trackRef} className="flex w-max items-center gap-15 px-40">
        <div className="shrink-0" style={{ width: "20vw" }}></div>
        
        {restaurants.map((restau, index) => (
          <div
            key={index}
            className="client-card min-w-[450px] h-[600px] px-12 py-20 bg-[#111] rounded-3xl shadow-2xl flex flex-col items-center justify-between text-white text-xl font-semibold gap-10"
          >
            <Image
              src={restau.image}
              alt={`Logo ${restau.nom}`}
              width={320}
              height={500}
              className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
            <div className="client-info mt-5 text-center">
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight leading-tight">
                {restau.nom}
              </h3>
              <p className="text-lg text-gray-300 font-medium mb-1">
                <span className="tex-bold text-white tracking-tight leading-tight">
                  {restau.ville}
                </span>
                , {restau.adresse}
              </p>
            </div>
          </div>
        ))}

        <div className="client-card cta-card min-w-[450px] h-[600px] bg-[#111] dark:bg-[#111] rounded-3xl shadow-2xl cursor-pointer group overflow-hidden relative transition-colors duration-500 ease-in-out hover:bg-white dark:hover:bg-white">
          <div className="h-full flex items-center justify-center px-12 py-20">
            <a
              href="/case-studies"
              className="flex items-center gap-6 text-white font-medium transform transition-all duration-500 group-hover:text-black"
            >
            <div className="relative w-14 h-14 transition-all duration-700 group-hover:scale-150">
              <div className="absolute inset-0 rounded-full bg-red-500 flex items-center justify-center transition-all duration-700 group-hover:scale-1500" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold pointer-events-none">
                →
              </span>
            </div>
            <span className="relative text-white text-xl font-semibold z-10 transition-all duration-500">
              Voir tous nos clients
            </span>
            </a>

          </div>
        </div>

        <div className="shrink-0" style={{ width: "120vw" }}></div>
      </div>
    </section>
  );
}