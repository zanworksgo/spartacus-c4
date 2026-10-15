import { site } from '../data/siteContent'
import { Reveal, RevealItem } from '../components/Reveal'

export default function Profil() {
  const { profil } = site

  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:pt-36">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-600">
          {site.identity.name} {site.identity.chapter}
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-green-900 sm:text-5xl">
          {profil.title}
        </h1>
      </Reveal>

      <Reveal stagger className="mt-8 flex flex-col gap-5">
        {profil.description.map((paragraph) => (
          <RevealItem key={paragraph}>
            <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{paragraph}</p>
          </RevealItem>
        ))}
      </Reveal>
    </section>
  )
}
