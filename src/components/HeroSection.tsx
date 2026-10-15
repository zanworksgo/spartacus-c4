import { ArrowDown } from 'lucide-react'
import type { Variants } from 'motion/react'
import { motion, useReducedMotion } from 'motion/react'
import { site } from '../data/siteContent'
import HeroArtwork from './HeroArtwork'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function HeroText() {
  const reduce = useReducedMotion()

  const scrollToInfo = () => {
    document.getElementById('informasi')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <motion.div variants={container} initial={reduce ? false : 'hidden'} animate="visible">
      <motion.p
        variants={item}
        className="text-xs font-bold uppercase tracking-[0.16em] text-green-600 sm:text-sm"
      >
        {site.identity.unitLabel}
      </motion.p>
      <motion.h1
        variants={item}
        className="mt-3 font-extrabold tracking-tight text-green-900"
        style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05 }}
      >
        {site.identity.name}
      </motion.h1>
      <motion.div variants={item} className="mt-2">
        <span
          className="inline-block rounded-lg bg-pink px-3 py-1 font-extrabold tracking-tight text-green-900"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', lineHeight: 1.05 }}
        >
          {site.identity.chapter}
        </span>
      </motion.div>
      <motion.p variants={item} className="mt-5 max-w-md text-base text-ink/75 sm:text-lg">
        {site.identity.tagline}
      </motion.p>
      <motion.div variants={item} className="mt-7">
        <button
          type="button"
          onClick={scrollToInfo}
          className="group inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-green-900 px-6 py-3 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-green-900/90 active:scale-[0.98]"
        >
          Informasi Peserta
          <ArrowDown size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
        </button>
      </motion.div>
    </motion.div>
  )
}

/**
 * Hero: text on the left over the asset's empty space, full-width illustration
 * on the right (desktop). On mobile the text stacks above a right-focused crop
 * of the illustration. The navbar floats separately above.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-cream">
      {/* Desktop (lg+): illustration as a full-width layer with text overlaid left */}
      <div className="mx-auto hidden w-full max-w-[1280px] px-4 sm:px-6 lg:block lg:px-8">
        <div className="relative pt-24">
          <HeroArtwork variant="full" className="w-full" />
          <div className="absolute inset-x-0 bottom-0 top-24 z-10 flex items-center">
            <div className="w-[43%] min-w-[300px] max-w-[560px]">
              <HeroText />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & tablet (below lg): text on top, cropped illustration below */}
      <div className="lg:hidden">
        <div className="mx-auto w-full max-w-[1280px] px-4 pb-8 pt-28 sm:px-6">
          <HeroText />
        </div>
        <HeroArtwork variant="crop" className="w-full" />
      </div>
    </section>
  )
}
