import { ClipboardList, ExternalLink, FileText, GraduationCap, Mail, MessageCircle } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import DocRow from '../components/DocRow'
import HeroSection from '../components/HeroSection'
import { Reveal, RevealItem } from '../components/Reveal'
import { site } from '../data/siteContent'
import { useContent } from '../lib/content'
import { useSafeLink, waLink } from '../lib/links'

const panelIconBg = ['bg-pink/30', 'bg-green-300/40']
const submissionIcons = [Mail, ClipboardList]

export default function Home() {
  const openLink = useSafeLink()
  const reduce = useReducedMotion()
  const { map } = useContent()

  return (
    <>
      {/* A. Hero */}
      <HeroSection />

      {/* B. Pengajuan Sekolah */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl">
            Pengajuan & Pendaftaran Sekolah
          </h2>
        </Reveal>
        <Reveal stagger className="grid gap-5 sm:grid-cols-2">
          {site.submissions.map((sub, idx) => {
            const Icon = submissionIcons[idx % submissionIcons.length]
            const formUrl = (sub.key && map[sub.key]?.url) || sub.url
            return (
              <RevealItem
                key={sub.title}
                className="flex h-full flex-col gap-5 rounded-2xl border border-border-soft bg-white p-6 shadow-soft"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl text-green-900 ${panelIconBg[idx % panelIconBg.length]}`}
                  >
                    <Icon size={24} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-green-900">{sub.title}</h3>
                    <p className="text-sm text-ink/60">{sub.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openLink(formUrl, 'Tautan formulir belum tersedia')}
                  className="group mt-auto inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-green-900 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-green-900/90 active:scale-[0.98]"
                >
                  Buka Formulir
                  <ExternalLink size={18} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </RevealItem>
            )
          })}
        </Reveal>
      </section>

      {/* C. Informasi & Berkas */}
      <section id="informasi" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl">
            Informasi &amp; Berkas
          </h2>
        </Reveal>
        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          {[site.info.kegiatan, site.info.panduan].map((panel, idx) => (
            <RevealItem
              key={panel.title}
              className="min-w-0 rounded-2xl border border-border-soft bg-white p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-green-900 ${panelIconBg[idx]}`}
                >
                  <FileText size={20} />
                </span>
                <h3 className="text-lg font-bold text-green-900">{panel.title}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {panel.items.map((item) => (
                  <DocRow key={item.title} item={item} />
                ))}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* D. Format Penilaian */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl">
            Format Penilaian
          </h2>
        </Reveal>
        <Reveal stagger className="grid gap-6 md:grid-cols-2">
          {site.scoring.map((level, idx) => (
            <RevealItem
              key={level.level}
              className="min-w-0 rounded-2xl border border-border-soft bg-white p-5 shadow-soft sm:p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-green-900 ${panelIconBg[idx % panelIconBg.length]}`}
                >
                  <GraduationCap size={20} />
                </span>
                <h3 className="text-lg font-bold text-green-900">{level.level}</h3>
              </div>
              <div className="flex flex-col gap-3">
                {level.items.map((item) => (
                  <DocRow key={item.title} item={item} />
                ))}
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      {/* E. Kontak Panitia */}
      <section id="kontak" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Reveal className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-green-900 sm:text-3xl">
            Kontak Panitia
          </h2>
        </Reveal>
        <Reveal stagger className={`grid gap-5 ${site.contacts.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {site.contacts.map((contact) => (
            <RevealItem key={contact.label}>
              <motion.button
                type="button"
                onClick={() => openLink(waLink(contact.whatsapp, contact.message), 'Kontak belum tersedia')}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={{ scale: 0.99 }}
                className="group flex min-h-[64px] w-full items-center gap-4 rounded-2xl border border-border-soft bg-white px-6 py-4 text-left shadow-soft transition-colors hover:border-green-600/50"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-border-soft bg-white text-green-600">
                  <MessageCircle size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-bold text-green-900">{contact.label}</span>
                  <span className="block text-sm text-ink/60">
                    {contact.whatsapp ? 'Hubungi via WhatsApp' : 'Segera tersedia'}
                  </span>
                </span>
                <ExternalLink
                  size={18}
                  className="flex-none text-green-900/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.button>
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </>
  )
}
