import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { site } from '../data/siteContent'

interface HeroArtworkProps {
  /** 'full' shows the whole image (desktop layer); 'crop' focuses the right side (mobile). */
  variant?: 'full' | 'crop'
  className?: string
}

/**
 * Hero illustration. Uses the configured image asset (`site.assets.hero`) as a
 * single whole image — entrance animation and a very subtle vertical float live
 * on separate wrappers so transforms don't conflict. Falls back to a built-in
 * SVG board-game scene if no asset is set or the image fails to load.
 */
export default function HeroArtwork({ variant = 'full', className }: HeroArtworkProps) {
  const reduce = useReducedMotion()
  const [imgOk, setImgOk] = useState(Boolean(site.assets.hero))

  if (site.assets.hero && imgOk) {
    const floatInner = reduce
      ? {}
      : { animate: { y: [0, -4, 0] }, transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' as const } }
    return (
      <motion.div
        className={className}
        initial={reduce ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div {...floatInner}>
          <img
            src={site.assets.hero}
            alt=""
            aria-hidden="true"
            width={1536}
            height={768}
            loading="eager"
            decoding="async"
            draggable={false}
            onError={() => setImgOk(false)}
            className={
              variant === 'crop'
                ? 'h-[300px] w-full select-none object-cover object-right sm:h-[380px]'
                : 'pointer-events-none h-auto w-full select-none'
            }
          />
        </motion.div>
      </motion.div>
    )
  }

  const float = (delay: number, distance = 6, duration = 6) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration, repeat: Infinity, ease: 'easeInOut' as const, delay },
        }

  // Isometric checkerboard floor tiles.
  const tileW = 70
  const tileH = 36
  const cols = 5
  const rows = 5
  const originX = 300
  const originY = 248
  const tiles: { points: string; fill: string; key: string }[] = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = originX + (i - j) * (tileW / 2)
      const y = originY + (i + j) * (tileH / 2)
      const points = `${x},${y - tileH / 2} ${x + tileW / 2},${y} ${x},${y + tileH / 2} ${x - tileW / 2},${y}`
      const dark = (i + j) % 2 === 1
      let fill = '#F3EEE1'
      if (dark) fill = (i * 2 + j) % 3 === 0 ? '#F58DB8' : '#2E6B45'
      tiles.push({ points, fill, key: `${i}-${j}` })
    }
  }

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg
        viewBox="0 0 600 540"
        className="h-auto w-full"
        role="img"
        aria-label={`Ilustrasi papan permainan ${site.identity.name} ${site.identity.chapter}`}
      >
        <defs>
          <linearGradient id="pawnGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1C5A3A" />
            <stop offset="0.55" stopColor="#103F2D" />
            <stop offset="1" stopColor="#0A2A1D" />
          </linearGradient>
          <radialGradient id="pawnHead" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#2E7A4E" />
            <stop offset="0.6" stopColor="#103F2D" />
            <stop offset="1" stopColor="#0A2A1D" />
          </radialGradient>
          <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F8D873" />
            <stop offset="0.5" stopColor="#F0B73E" />
            <stop offset="1" stopColor="#D2962A" />
          </linearGradient>
          <linearGradient id="creamTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFDF8" />
            <stop offset="1" stopColor="#F1EADA" />
          </linearGradient>
          <linearGradient id="archPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F9B6D1" />
            <stop offset="1" stopColor="#F58DB8" />
          </linearGradient>
        </defs>

        {/* Background architecture */}
        <g>
          <g fill="#EFE8D8">
            <rect x="46" y="196" width="78" height="58" rx="6" />
            <rect x="60" y="150" width="60" height="50" rx="6" fill="#F4EEE0" />
            <rect x="74" y="112" width="44" height="42" rx="6" fill="#F8F3E8" />
          </g>
          <g>
            <path d="M402 250V150a66 66 0 01132 0v100z" fill="#F1EADA" />
            <path d="M420 250v-96a48 48 0 0196 0v96z" fill="url(#archPink)" />
            <path d="M352 250v-70a34 34 0 0168 0v70z" fill="#F4EEE0" />
            <path d="M364 250v-62a22 22 0 0144 0v62z" fill="#FBEFF4" />
          </g>
        </g>

        {/* Checkerboard floor */}
        <g>
          {tiles.map((t) => (
            <polygon key={t.key} points={t.points} fill={t.fill} stroke="#E7DFCD" strokeWidth="0.5" />
          ))}
        </g>

        {/* Gold trophy on stepped pedestal (right) */}
        <motion.g {...float(0.5, 7, 6.8)} style={{ transformOrigin: '472px 250px' }}>
          <g>
            <polygon points="472,300 520,324 472,348 424,324" fill="#F58DB8" />
            <polygon points="424,324 472,348 472,366 424,342" fill="#E06FA0" />
            <polygon points="520,324 472,348 472,366 520,342" fill="#D45E92" />
            <polygon points="472,276 512,296 472,316 432,296" fill="url(#creamTop)" />
            <polygon points="432,296 472,316 472,332 432,312" fill="#E7DFCD" />
            <polygon points="512,296 472,316 472,332 512,312" fill="#DBD2BC" />
          </g>
          <g>
            <ellipse cx="472" cy="292" rx="26" ry="7" fill="#0A2A1D" opacity="0.12" />
            <path d="M450 212h44v10a22 22 0 01-44 0z" fill="url(#goldGrad)" />
            <path d="M452 212h40l-4 20a16 16 0 01-32 0z" fill="url(#goldGrad)" />
            <path d="M448 214c-16 0-18-22-2-22h8v9h-6c-6 0-5 13 0 13z" fill="#E0A82E" />
            <path d="M496 214c16 0 18-22 2-22h-8v9h6c6 0 5 13 0 13z" fill="#E0A82E" />
            <rect x="466" y="250" width="12" height="16" fill="#D2962A" />
            <path d="M456 266h32l4 12h-40z" fill="#E0A82E" />
            <path d="M472 196l4.5 9 10 1.2-7.4 7 1.8 9.9L472 227l-8.9 5.1 1.8-9.9-7.4-7 10-1.2z" fill="#FFF6DC" opacity="0.9" />
          </g>
        </motion.g>

        {/* Cream dice (left front) */}
        <motion.g {...float(0.8, 8, 7)} style={{ transformOrigin: '168px 330px' }}>
          <g transform="rotate(-6 168 330)">
            <ellipse cx="168" cy="382" rx="44" ry="12" fill="#0A2A1D" opacity="0.1" />
            <polygon points="168,300 214,324 168,348 122,324" fill="#FFFDF8" />
            <polygon points="122,324 168,348 168,392 122,368" fill="#EDE6D5" />
            <polygon points="214,324 168,348 168,392 214,368" fill="#E2DAC6" />
            <ellipse cx="156" cy="322" rx="5" ry="3" fill="#103F2D" />
            <ellipse cx="180" cy="328" rx="5" ry="3" fill="#103F2D" />
            <circle cx="180" cy="340" r="4.5" fill="#487A49" />
            <circle cx="192" cy="356" r="4.5" fill="#487A49" />
            <circle cx="204" cy="372" r="4.5" fill="#487A49" />
            <circle cx="138" cy="344" r="4.5" fill="#103F2D" />
            <circle cx="150" cy="372" r="4.5" fill="#103F2D" />
          </g>
        </motion.g>

        {/* Pedestal + green pawn (center) */}
        <g>
          <ellipse cx="300" cy="372" rx="78" ry="22" fill="#0A2A1D" opacity="0.1" />
          <ellipse cx="300" cy="362" rx="72" ry="22" fill="#E2DAC6" />
          <rect x="228" y="330" width="144" height="32" fill="#EDE6D5" />
          <ellipse cx="300" cy="330" rx="72" ry="22" fill="url(#creamTop)" />
          <ellipse cx="300" cy="330" rx="56" ry="16" fill="none" stroke="#A8D66D" strokeWidth="4" opacity="0.8" />
        </g>

        <motion.g {...float(0.2, 5, 6.4)} style={{ transformOrigin: '300px 240px' }}>
          <ellipse cx="300" cy="322" rx="40" ry="11" fill="#0A2A1D" opacity="0.18" />
          <path d="M256 322c0-14 10-22 20-28 10-6 12-14 12-14h24s2 8 12 14c10 6 20 14 20 28z" fill="url(#pawnGrad)" />
          <ellipse cx="300" cy="246" rx="40" ry="46" fill="url(#pawnGrad)" />
          <ellipse cx="300" cy="196" rx="28" ry="10" fill="url(#pawnGrad)" />
          <ellipse cx="300" cy="190" rx="22" ry="8" fill="#0A2A1D" opacity="0.35" />
          <path d="M286 196c0 0 2-16 14-16s14 16 14 16z" fill="url(#pawnGrad)" />
          <circle cx="300" cy="158" r="32" fill="url(#pawnHead)" />
          <ellipse cx="288" cy="146" rx="10" ry="14" fill="#A8D66D" opacity="0.25" />
          <ellipse cx="286" cy="240" rx="9" ry="30" fill="#A8D66D" opacity="0.14" />
        </motion.g>

        {/* Pink puzzle piece (front) */}
        <motion.g {...float(1, 6, 6.6)} style={{ transformOrigin: '432px 430px' }}>
          <g transform="translate(386 388) scale(1 0.62) rotate(-18)">
            <ellipse cx="46" cy="118" rx="52" ry="22" fill="#0A2A1D" opacity="0.08" />
            <path d="M0 24h22a14 14 0 1128 0h22v22a14 14 0 110 28v22H62a14 14 0 11-28 0H12V74a14 14 0 110-28z" fill="#F58DB8" />
            <path d="M0 24h22a14 14 0 015 11H12v11a14 14 0 000 28v11h15a14 14 0 01-5 11H0V74a14 14 0 010-28z" fill="#F9B6D1" opacity="0.7" />
          </g>
        </motion.g>
      </svg>
    </div>
  )
}
