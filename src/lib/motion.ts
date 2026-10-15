import type { Variants } from 'motion/react'

/** Fade + small upward slide for section reveals (runs once on view). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Container that staggers its children's entrance. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

/** Shared viewport config so section animations only play once. */
export const viewportOnce = { once: true, amount: 0.2 } as const
