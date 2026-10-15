import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { site } from '../data/siteContent'

function Wordmark() {
  const [logoOk, setLogoOk] = useState(Boolean(site.assets.logo))
  if (site.assets.logo && logoOk) {
    return (
      <img
        src={site.assets.logo}
        alt={`${site.identity.name} ${site.identity.chapter}`}
        width={48}
        height={48}
        className="h-11 w-auto sm:h-12"
        onError={() => setLogoOk(false)}
      />
    )
  }
  return (
    <span className="font-extrabold tracking-tight text-green-900">
      <span className="text-xl sm:text-2xl">{site.identity.name}</span>
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route/hash change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  // Close on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return location.pathname === '/' && location.hash === href.slice(1)
    }
    if (href === '/') {
      return location.pathname === '/' && location.hash === ''
    }
    return location.pathname === href
  }

  const handleNav = (href: string) => {
    setOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for home to mount, then scroll to the anchor.
        window.setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 60)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        history.replaceState(null, '', href)
      }
    }
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-border-soft bg-cream/90 shadow-soft backdrop-blur'
          : 'border-b border-transparent bg-cream/0'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" aria-label={`${site.identity.name} ${site.identity.chapter} — Beranda`}>
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const active = isActive(item.href)
            const content = (
              <span className="relative">
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-green-900"
                  />
                )}
              </span>
            )
            return (
              <li key={item.href}>
                {item.href.startsWith('/#') ? (
                  <button
                    type="button"
                    onClick={() => handleNav(item.href)}
                    className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active ? 'text-green-900' : 'text-ink/70 hover:text-green-900'
                    }`}
                  >
                    {content}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className={`inline-block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active ? 'text-green-900' : 'text-ink/70 hover:text-green-900'
                    }`}
                  >
                    {content}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-soft bg-cream text-green-900 md:hidden"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 pb-4 sm:px-6">
              {site.nav.map((item) => {
                const active = isActive(item.href)
                const classes = `flex min-h-[44px] items-center rounded-xl px-4 text-base font-semibold transition-colors ${
                  active
                    ? 'bg-green-900 text-cream'
                    : 'text-ink/80 hover:bg-green-900/5 hover:text-green-900'
                }`
                return (
                  <li key={item.href}>
                    {item.href.startsWith('/#') ? (
                      <button type="button" className={`w-full text-left ${classes}`} onClick={() => handleNav(item.href)}>
                        {item.label}
                      </button>
                    ) : (
                      <Link to={item.href} className={classes} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
