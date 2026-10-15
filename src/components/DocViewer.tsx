import { Download, ExternalLink, FileText, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export interface DocRef {
  title: string
  url: string
  filename?: string | null
}

interface DocViewerContextValue {
  view: (doc: DocRef) => void
}

const DocViewerContext = createContext<DocViewerContextValue>({ view: () => {} })

type Kind = 'pdf' | 'image' | 'office' | 'other'

function extensionOf(url: string, filename?: string | null): string {
  const src = filename || url
  const clean = src.split('?')[0].split('#')[0]
  const dot = clean.lastIndexOf('.')
  return dot >= 0 ? clean.slice(dot + 1).toLowerCase() : ''
}

function kindOf(ext: string): Kind {
  if (ext === 'pdf') return 'pdf'
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif', 'bmp'].includes(ext)) return 'image'
  if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(ext)) return 'office'
  return 'other'
}

/** Build a URL that forces download (Supabase honors the `download` param). */
function downloadHref(url: string, filename?: string | null): string {
  try {
    const u = new URL(url)
    u.searchParams.set('download', filename || '')
    return u.toString()
  } catch {
    return url
  }
}

/** Microsoft Office Online embed for Word/Excel/PowerPoint preview. */
function officeEmbed(url: string): string {
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
}

export function DocViewerProvider({ children }: { children: ReactNode }) {
  const [doc, setDoc] = useState<DocRef | null>(null)

  const view = useCallback((d: DocRef) => setDoc(d), [])
  const close = useCallback(() => setDoc(null), [])

  useEffect(() => {
    if (!doc) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [doc, close])

  const ext = doc ? extensionOf(doc.url, doc.filename) : ''
  const kind = kindOf(ext)

  return (
    <DocViewerContext.Provider value={{ view }}>
      {children}
      <AnimatePresence>
        {doc && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            role="dialog"
            aria-modal="true"
            aria-label={doc.title}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-soft-lg"
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-border-soft px-4 py-3">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-green-900/[0.07] text-green-900">
                  <FileText size={18} />
                </span>
                <h2 className="min-w-0 flex-1 truncate text-sm font-bold text-green-900 sm:text-base">
                  {doc.title}
                </h2>
                <a
                  href={downloadHref(doc.url, doc.filename)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-green-900 px-3.5 text-sm font-semibold text-cream transition-colors hover:bg-green-900/90"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Unduh</span>
                </a>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Buka di tab baru"
                  className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border-soft text-green-900 transition-colors hover:border-green-600/60"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Tutup"
                  className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-border-soft text-green-900 transition-colors hover:border-green-600/60"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-auto bg-cream">
                {kind === 'image' ? (
                  <img src={doc.url} alt={doc.title} className="mx-auto h-full w-auto object-contain" />
                ) : kind === 'pdf' ? (
                  <iframe src={doc.url} title={doc.title} className="h-full w-full border-0" />
                ) : kind === 'office' ? (
                  <iframe src={officeEmbed(doc.url)} title={doc.title} className="h-full w-full border-0" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                    <FileText size={40} className="text-green-900/40" />
                    <p className="text-sm text-ink/60">
                      Pratinjau tidak tersedia untuk tipe berkas ini. Silakan unduh berkasnya.
                    </p>
                    <a
                      href={downloadHref(doc.url, doc.filename)}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-green-900 px-5 text-sm font-semibold text-cream hover:bg-green-900/90"
                    >
                      <Download size={16} /> Unduh Berkas
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DocViewerContext.Provider>
  )
}

export function useDocViewer(): DocViewerContextValue {
  return useContext(DocViewerContext)
}
