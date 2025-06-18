declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el: HTMLElement | null
    smooth?: boolean
    direction?: 'vertical' | 'horizontal'
    multiplier?: number
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions)
    start(): void
    stop(): void
    update(): void
    destroy(): void
    scrollTo(
      target: string | number | HTMLElement,
      options?: {
        offset?: number
        duration?: number
        easing?: [number, number, number, number]
        disableLerp?: boolean
        callback?: () => void
      }
    ): void
    on(event: string, callback: (args: unknown) => void): void
    off(event: string, callback: (args: unknown) => void): void
  }
}
