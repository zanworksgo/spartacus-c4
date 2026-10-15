import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewportOnce } from '../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Render as a stagger container whose direct <Reveal> children animate in sequence. */
  stagger?: boolean
}

/** Fade-up reveal that plays once when it enters the viewport. */
export function Reveal({ children, className, stagger }: RevealProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

/** A child item for use inside a `stagger` Reveal container. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
