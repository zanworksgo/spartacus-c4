import { ClipboardCheck, ClipboardList, Trophy, Users, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { TimelineStep } from '../data/siteContent'
import { site } from '../data/siteContent'
import { viewportOnce } from '../lib/motion'

const iconMap: Record<TimelineStep['icon'], LucideIcon> = {
  ClipboardList,
  Users,
  ClipboardCheck,
  Trophy,
}

const markerStyles: Record<TimelineStep['status'], string> = {
  done: 'bg-green-600 text-cream border-green-600',
  active: 'bg-green-900 text-cream border-green-900',
  upcoming: 'bg-white text-green-600 border-border-soft',
}

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 220, damping: 22 },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
}

export default function Timeline() {
  const reduce = useReducedMotion()
  const steps = site.timeline

  return (
    <section id="timeline" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          className="inline-flex items-center gap-2 rounded-full bg-pink/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-green-900"
        >
          Roadmap Kegiatan
        </motion.span>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.05 }}
          className="mt-3 text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl"
        >
          Timeline SPARTACUS Chapter 4
        </motion.h2>
      </div>

      <motion.ol
        variants={reduce ? undefined : containerVariants}
        initial={reduce ? false : 'hidden'}
        whileInView="visible"
        viewport={viewportOnce}
        className="relative grid gap-8 md:grid-cols-4 md:gap-4"
      >
        {/* Mobile vertical track */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-7 top-7 bottom-7 w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-border-soft md:hidden"
        >
          <motion.div
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: 'top' }}
            className="h-full w-full bg-gradient-to-b from-green-900 via-green-600 to-pink"
          />
        </div>

        {/* Desktop horizontal track */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 -translate-y-1/2 overflow-hidden rounded-full bg-border-soft md:block"
        >
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            style={{ transformOrigin: 'left' }}
            className="h-full w-full bg-gradient-to-r from-green-900 via-green-600 to-pink"
          />
        </div>

        {steps.map((step) => {
          const Icon = iconMap[step.icon]
          return (
            <motion.li
              key={step.title}
              variants={reduce ? undefined : stepVariants}
              className="relative flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              {/* Marker */}
              <div className="relative z-10 flex-none md:mb-5">
                <span
                  className={`relative flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-soft ${markerStyles[step.status]}`}
                >
                  <Icon size={24} strokeWidth={2.2} />
                </span>
              </div>

              {/* Card */}
              <div className="min-w-0 flex-1 pt-2 md:w-full md:pt-0">
                <h3 className="text-base font-extrabold text-green-900 sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm font-semibold text-ink/80">{step.date}</p>
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </section>
  )
}
