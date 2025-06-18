'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'

const logos = [
  '/clients/crusty.png',
  '/clients/panda.png',
  '/clients/lma3loma.png',
  '/clients/theview360.png',
  '/clients/fried.png',
]

gsap.registerPlugin(ScrollTrigger)

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
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tl,
        start: 'left center',
        end: 'right center',
        toggleClass: { targets: card, className: 'is-active' },
        immediateRender: index === 0, // 👈 active la 1ère carte dès le début
      })
    })

    // Optional: Refresh on resize
    const handleResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-white dark:bg-black overflow-hidden"
    >
      <div ref={trackRef}>
        <h2 className="text-4xl font-bold text-center text-black dark:text-white py-10">
          Nos Clients
        </h2>
        <div className="flex w-max h-[70vh] items-center gap-10 px-40">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="client-card min-w-[320px] h-[500px] bg-[#111] rounded-3xl px-10 py-14 shadow-xl flex items-center justify-center text-white text-xl font-semibold transition-all duration-500"
            >
              <Image
                src={logo}
                alt={`Logo ${index}`}
                width={320}
                height={500}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}

          <div className="client-card cta-card min-w-[320px] h-[500px] bg-[#111] rounded-3xl px-10 py-14 shadow-xl flex items-center justify-center text-white text-xl font-semibold transition-all duration-500 hover:bg-purple-500 group">
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
