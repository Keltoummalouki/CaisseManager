'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const restaurants = [
  {
    image: '/clients/Crusty.png',
    nom: 'Crusty',
    ville: 'Rabat',
    adresse: 'Hay Riad Avenue Annakhil',
  },
  {
    image: '/clients/Panda.png',
    nom: 'Panda',
    ville: 'Rabat',
    adresse: 'Hay Riad Avenue Annakhil',
  },
  {
    image: '/clients/lma3loma.png',
    nom: 'Lma3loma',
    ville: 'Casablanca',
    adresse: 'Maarif, Bd Zerktouni',
  },
  {
    image: '/clients/TheView360.png',
    nom: 'The View 360',
    ville: 'Casablanca',
    adresse: 'ain sbaa, Bd Zerktouni',
  },
  {
    image: '/clients/fried.png',
    nom: 'Fried',
    ville: 'Casablanca',
    adresse: 'Maarif, Bd Zerktouni',
  }
]

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const cards = gsap.utils.toArray('.client-card') as HTMLElement[]

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${track.scrollWidth + window.innerWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    tl.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
    })

    cards.forEach((card, index) => {
      const info = card.querySelector('.client-info') as HTMLElement
      if (index !== 0) {
        gsap.set(card, {
          scale: 1,
          y: 0,
        })
        gsap.set(info, {
          opacity: 0,
          y: 30,
        })
      } 

      // if (index === 0){
      //   gsap.set(card, {
      //     scale: 1.1,
      //     y: -100,
      //   })
      //   gsap.set(info, {
      //     opacity: 1,
      //     y: 0,
      //   })
      // }

      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tl,
        start: 'left center',
        end: 'right center',
        onEnter: () => {
          gsap.to(card, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: 'power3.out',
          })
          
          gsap.fromTo(
            info,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.1,
            }
          )
        },
        onLeave: () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.in',
          })
          
          gsap.to(info, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power3.in',
          })
        },
        onEnterBack: () => {
          gsap.to(card, {
            scale: 1.1,
            y: -100,
            duration: 0.6,
            ease: 'power3.out',
          })
          
          gsap.to(info, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.1,
          })
        },
        onLeaveBack: () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.in',
          })
          
          gsap.to(info, {
            opacity: 0,
            y: 30,
            duration: 0.4,
            ease: 'power3.in',
          })
        },
      })
    })

    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen bg-white dark:bg-black overflow-hidden">
      <h2 className="text-6xl font-bold text-center text-black dark:text-white py-10 mb-20">
        Nos Clients
      </h2>
      <div ref={trackRef}>
        <div className="flex w-max h-[70vh] items-center gap-10 px-40">
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
                  <span className="tex-bold text-white tracking-tight leading-tight">{restau.ville}</span>, {restau.adresse}
                </p>
              </div>
            </div>
          ))}

          <div className="client-card cta-card min-w-[450px] h-[600px] bg-[#111] rounded-3xl px-12 py-20 shadow-2xl flex items-center justify-center text-white text-xl font-semibold transition-all duration-700 ease-in-out hover:bg-purple-500">
            <a
              href="/case-studies"
              className="flex items-center gap-4 text-white font-medium transform transition-transform duration-500 group-hover:scale-105"
            >
              <span className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-xl transition-all duration-500 group-hover:translate-x-1 group-hover:bg-white group-hover:text-purple-500">
                →
              </span>
              <span className="text-lg whitespace-nowrap transition-colors duration-500 group-hover:text-white">
                Voir tous nos clients
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}