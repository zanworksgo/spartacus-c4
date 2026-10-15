import { Calendar, ImageOff, Trophy, Flag } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal, RevealItem } from '../components/Reveal'
import type { ChapterItem } from '../data/siteContent'
import { site } from '../data/siteContent'
import { useResolvedUrl } from '../lib/content'

const medalColor = ['bg-[#F4C752] text-green-900', 'bg-[#CBD3CE] text-green-900', 'bg-[#CFA06A] text-cream']

function ChapterCard({ ch, reduce }: { ch: ChapterItem; reduce: boolean | null }) {
  const pamphlet = useResolvedUrl(ch.pamphletKey, ch.pamphlet)
  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -2 }}
      className="overflow-hidden rounded-2xl border border-border-soft bg-white shadow-soft transition-colors"
    >
      <div className="grid sm:grid-cols-[minmax(0,180px)_1fr]">
        {/* Pamphlet */}
        {pamphlet ? (
          <img
            src={pamphlet}
            alt={`Pamflet ${ch.label}`}
            loading="lazy"
            className="aspect-[3/4] h-full w-full object-cover sm:aspect-auto"
          />
        ) : (
          <div className="flex min-h-[180px] flex-col items-center justify-center gap-2 border-b border-border-soft bg-cream text-center sm:border-b-0 sm:border-r">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-900/[0.06] text-green-900/50">
              <ImageOff size={22} />
            </span>
            <span className="px-4 text-xs font-medium text-ink/45">Pamflet segera tersedia</span>
          </div>
        )}

        {/* Details */}
        <div className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-green-900">{ch.label}</h2>
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-green-900/[0.06] px-3 py-1 text-xs font-semibold text-green-900">
            <Calendar size={14} aria-hidden="true" />
            {ch.date ?? 'Tanggal segera diumumkan'}
          </span>

          <div className="mt-4">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-ink/50">
              <Trophy size={14} aria-hidden="true" /> Juara Umum
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {(ch.champions ?? []).map((c, i) => (
                <li key={c.rank} className="flex items-center gap-2.5 text-sm text-ink/75">
                  <span
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold ${medalColor[i % medalColor.length]}`}
                  >
                    {c.rank}
                  </span>
                  <span className="font-medium">{c.name ?? 'Segera diumumkan'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function TeaserCard({ ch }: { ch: ChapterItem }) {
  return (
    <article className="rounded-2xl border-2 border-pink/60 bg-pink/10 px-6 py-10 text-center shadow-soft sm:px-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">{ch.label}</p>
      <h2 className="mt-3">
        <span className="inline-block rounded-xl bg-pink px-4 py-1.5 text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl">
          {ch.teaserText}
        </span>
      </h2>
      {ch.teaserSubtitle && (
        <p className="mx-auto mt-5 max-w-md text-sm text-ink/70 sm:text-base">{ch.teaserSubtitle}</p>
      )}
    </article>
  )
}

export default function Sejarah() {
  const { sejarah } = site
  const reduce = useReducedMotion()

  return (
    <section className="mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
          {site.identity.name} {site.identity.chapter}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl">
          {sejarah.title}
        </h1>
        <p className="mt-3 text-sm text-ink/60 sm:text-base">Alur perjalanan SPARTACUS dari masa ke masa.</p>
      </Reveal>

      {/* Roadmap: connecting flow line with alternating chapter nodes */}
      <Reveal stagger className="relative mt-12">
        {/* Flow line (left rail on mobile, center on desktop) */}
        <span
          className="absolute left-6 top-1 bottom-1 w-0.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-green-300 via-green-600 to-pink md:left-1/2"
          aria-hidden="true"
        />

        <ol className="flex flex-col gap-10 md:gap-14">
          {sejarah.chapters.map((ch, idx) => {
            const alignRight = idx % 2 === 1
            return (
              <RevealItem key={ch.chapter}>
                <li className="relative pl-16 md:grid md:grid-cols-2 md:gap-x-12 md:pl-0">
                  {/* Node marker */}
                  <span
                    className={`absolute left-6 top-6 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-cream text-sm font-extrabold shadow-soft md:left-1/2 ${
                      ch.highlight ? 'bg-pink text-green-900' : 'bg-green-900 text-cream'
                    }`}
                  >
                    {ch.teaser ? <Flag size={18} aria-hidden="true" /> : ch.chapter.replace('Chapter ', 'C')}
                  </span>

                  {/* Connector nub (desktop) */}
                  <span
                    className={`absolute top-11 hidden h-0.5 w-6 bg-border-soft md:block ${
                      alignRight ? 'left-1/2' : 'right-1/2'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Card on alternating side */}
                  <div className={alignRight ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}>
                    {ch.teaser ? <TeaserCard ch={ch} /> : <ChapterCard ch={ch} reduce={reduce} />}
                  </div>
                </li>
              </RevealItem>
            )
          })}
        </ol>
      </Reveal>
    </section>
  )
}
