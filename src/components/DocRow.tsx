import { ArrowUpRight, Download, FileText } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import type { DocItem } from '../data/siteContent'
import { useResolvedUrl } from '../lib/content'
import { useSafeLink } from '../lib/links'

/**
 * A clickable document row. Items with a single `url` open on row click.
 * Items with `word`/`pdf` formats show two download buttons instead.
 * Backend-managed uploads (via slot keys) override the static values.
 */
export default function DocRow({ item }: { item: DocItem }) {
  const openLink = useSafeLink()
  const reduce = useReducedMotion()
  const url = useResolvedUrl(item.key, item.url)
  const word = useResolvedUrl(item.wordKey, item.word)
  const pdf = useResolvedUrl(item.pdfKey, item.pdf)
  const hasFormats =
    item.wordKey !== undefined ||
    item.pdfKey !== undefined ||
    item.word !== undefined ||
    item.pdf !== undefined

  if (hasFormats) {
    const anyAvailable = Boolean(word) || Boolean(pdf)
    return (
      <div className="flex w-full flex-col gap-3 rounded-xl border border-border-soft bg-cream px-4 py-3 sm:min-h-[56px] sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-green-900/[0.07] text-green-900">
            <FileText size={20} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block break-words text-sm font-semibold leading-snug text-ink sm:text-base">
              {item.title}
            </span>
            {!anyAvailable && (
              <span className="mt-0.5 block text-xs font-medium text-ink/45">Segera tersedia</span>
            )}
          </span>
        </div>
        <span className="flex gap-2 sm:flex-none">
          <FormatButton label="Word" url={word} onOpen={openLink} />
          <FormatButton label="PDF" url={pdf} onOpen={openLink} />
        </span>
      </div>
    )
  }

  const available = Boolean(url)
  return (
    <motion.button
      type="button"
      onClick={() => openLink(url, 'Berkas belum tersedia')}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={{ scale: 0.99 }}
      className="group flex min-h-[56px] w-full items-center gap-3 rounded-xl border border-border-soft bg-cream px-4 py-3 text-left transition-colors hover:border-green-600/50 hover:bg-green-900/[0.03]"
    >
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-green-900/[0.07] text-green-900">
        <FileText size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block break-words text-sm font-semibold leading-snug text-ink sm:text-base">
          {item.title}
        </span>
        {!available && (
          <span className="mt-0.5 block text-xs font-medium text-ink/45">Segera tersedia</span>
        )}
      </span>
      <ArrowUpRight
        size={20}
        className="flex-none text-green-900/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </motion.button>
  )
}

function FormatButton({
  label,
  url,
  onOpen,
}: {
  label: string
  url: string | null
  onOpen: (url: string | null, message?: string) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(url, `Berkas ${label} belum tersedia`)}
      aria-label={`Unduh ${label}`}
      className="inline-flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-soft px-3 text-xs font-semibold text-green-900 transition-colors hover:border-green-600/60 hover:bg-green-900/[0.04] sm:flex-none sm:justify-start"
    >
      <Download size={15} />
      {label}
    </button>
  )
}
